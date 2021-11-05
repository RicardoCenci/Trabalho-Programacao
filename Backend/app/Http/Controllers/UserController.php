<?php

namespace App\Http\Controllers;

use App\Models\FriendShipRequest;
use App\Models\User;
use App\Responses\BlockedUsers as BlockedUsersResponse;
use App\Responses\Contacts as ContactsResponse;
use App\Responses\IncomingFriendRequest;
use App\Responses\OutgoingFriendRequest;
use Illuminate\Http\Request;


class UserController extends Controller{
   

     public function getContacts(Request $request){
          try {
               $user = auth()->user();
               $contacts = $user->contacts()->with('attachment')->get();

               $contacts_users = $contacts->pluck('contact_id');
               
               $other_users = User::select('id', 'first_name','last_name','photo')
                                   ->whereIn('id',$contacts_users)
                                   ->get();

               return new ContactsResponse($contacts, $other_users);

          } catch (\Throwable $th) {
               return $this->handleError($th);
          }
         

    }

    public function getIncomingFriendShipRequest(){
          try {
               $friend_ship_requests = auth()->user()->incomingFriendRequests()->with('from')->get();
               return new IncomingFriendRequest($friend_ship_requests);    
          } catch (\Throwable $th) {
               return $this->handleError($th);
          }

    }

    public function getOutgoingFriendShipRequest(){
          try {
               $friend_ship_requests = auth()->user()->outgoingFriendRequests()->with('to')->get();
               return new OutgoingFriendRequest($friend_ship_requests);    
          } catch (\Throwable $th) {
               return $this->handleError($th);
          }
    }

    public function respondFriendRequest(Request $request, $id){
     
     $request = FriendShipRequest::where('recipient_id',auth()->user()->id)
                                   ->where('sender_id', $id)
                                   ->first();
     if (!$request) {
          return $this->notFound('Friend request not found');
     }
     $request->accept();

     return response('Friend request successfully accepted', 200);
     }


    public function getBlockedUser(){
         $blockedUsers = auth()->user()->blockedUsers()->get();
         return new BlockedUsersResponse($blockedUsers);
    }

    public function getQrcode(Request $request){
         return response('Ops. Voce tentou acessar uma rota ainda não implementada', 501);
    }

    public function getProfile(Request $request){
         return response('Ops. Voce tentou acessar uma rota ainda não implementada', 501);
    }

    public function editProfile(Request $request){
         return response('Ops. Voce tentou acessar uma rota ainda não implementada', 501);
    }

    public function getPreferences(Request $request){
         return response('Ops. Voce tentou acessar uma rota ainda não implementada', 501);
    }

    public function editPreference(Request $request){
         return response('Ops. Voce tentou acessar uma rota ainda não implementada', 501);
    }


}


