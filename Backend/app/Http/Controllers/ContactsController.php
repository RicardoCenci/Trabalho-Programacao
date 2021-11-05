<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Mensagem;
use App\Models\Attachment;
use App\Models\BlockedUser;
use App\Models\Conversa;
use App\Models\FriendShipRequest;
use App\Responses\UserProfile as UserProfileResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
class ContactsController extends Controller
{
    public function sendMessage(Request $request, $id){
        if (!auth()->check()) {
            // Just in case, vai que o cara chega ate aqui sem estar autenticado
            return $this->notAuthenticated();
        }
        $validator = Validator::make($request->all(),[
            "attachment" => 'required_without:text',
            "text" => "required_without:attachment"
        ]);
        if ($validator->fails()) {
            return $this->badRequest($validator->getMessageBag());
        }

        $fields = $validator->validated();
        $sender = auth()->user();
        if ($sender->id == $id) {
            return $this->badRequest('Sender cannot send messages to itself');
        }
        $recipient = User::find($id);
        if (!$recipient) {
            return $this->notFound('User not found');
        }
        

        try{
        
            DB::beginTransaction();
            $conversa = $recipient->conversa($id);

            if (!$conversa) {
                $conversa = Conversa::createBetween($sender, $recipient);
            }

            if (array_key_exists('attachment', $fields)) {
                try{
                    $attachment = Attachment::store($fields['attachment']);
                    if (!$attachment) {
                        return $this->unknownError();
                    }
                }catch(\Exception $e){
                    return $this->badRequest($e->getMessage());
                }
            }
            $message = Mensagem::create([
                'attachment_id'=> $attachment->id ?? null,
                'sender_id'=>$sender->id,
                'text'=>$fields['text'] ?? null,
                'conversation_id' => $conversa->id
            ]);
            DB::commit();

            event(new \App\Events\Message($sender, $recipient, $message));

            return $message;
        }catch(\Exception $e){
            DB::rollBack();
            return $this->handleError($e);
        }
    }

    public function sendFriendRequest($id){
        try {
            $user = User::find($id);
            if (!$user) {
                return $this->notFound();
            }
            $existingFriendRequest = FriendShipRequest::where('recipient_id', auth()->user()->id)
                                ->orWhere('recipient_id',auth()->user()->id)
                                ->where('sender_id',$id)
                                ->where('recipient_id',$id)
                                ->first();
            if ($existingFriendRequest) {
                if ($existingFriendRequest->recipient_id == auth()->user()->id) {
                    $existingFriendRequest->accept();
                    return $this->message('Friend request accepted'. 201);
                }
                return $this->badRequest('You already send an friend request to that person');

            }

            FriendShipRequest::create([
                'sender_id' => auth()->user()->id,
                'recipient_id' => $id,
                'status' => 0
            ]);

            event(new \App\Events\FriendRequestEvent(auth()->user(), $id));
            return $this->message('Friend request successfully send'. 201);
            
        } catch (\Throwable $th) {
            return $this->handleError($th);
        }
    }
    public function blockUser($id){

        $existingBlock = BlockedUser::where('blocked_id', $id)
                                        ->where('user_id', auth()->user()->id)
                                        ->first();
        $user = User::find($id);
        if (!$user) {
            return $this->notFound('User not found');
        }
        if ($existingBlock) {
            return $this->message('This user is already blocked');
        }
        try {
            BlockedUser::create([
                'user_id'=> auth()->user()->id,
                'blocked_id' => $user->id
            ]);
            return $this->message($user->fullName().' has successfully blocked', 201);

        } catch (\Throwable $th) {
            return $this->handleError($th);
        }   
    }
    
    public function unblockUser($id){
        try {
            $existingBlock = BlockedUser::where('blocked_id', $id)
                                        ->where('user_id', auth()->user()->id)
                                        ->first();
                                
            if (!$existingBlock) {
                return $this->notFound('User is not blocked');
            }
            $existingBlock->delete();

            return $this->message('User successfully blocked');

        } catch (\Throwable $th) {
            return $this->handleError($th);
        }

    }
    public function getProfile($id){
        $user = User::find($id);
        if (!$user) {
            return $this->notFound("User not found");
        }

        return response(new UserProfileResponse($user), 200);
    }

}
