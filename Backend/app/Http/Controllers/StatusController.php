<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatusController extends Controller
{
    public function index(Request $request){
        $user = user();
        $status_list = $user->contactsStatus()->with(['content', 'owner'])->get();

        $response = [];

        foreach ($status_list as $status) {
            $response[] = [
                'user' => [
                    'id' => $status->owner->id,
                    'first_name' => $status->owner->first_name,
                    'last_name'  => $status->owner->last_name,
                    'photo' => $status->owner->photo
                ],
                'last_status' => [
                    'id' => $status->id,
                    'description' => $status->description,
                    'content' => [
                        'id' => $status->content->id,
                        'url'  => $status->content->url,
                        'name' =>  $status->content->file_name,
                        'extension'=>  $status->content->extension,
                        'timestamp' => $status->content->timestamp,
                        'size' =>  $status->content->size,
                    ],
                    'timestamp' => $status->timestamp,
                ],
                'status_count' => $status->status_count,
                'unseen_status' => 0
            ];
        }

        return response($response);
    }
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            "content" => 'required',
        ]);
        if ($validator->fails()) {
            return $this->badRequest($validator->getMessageBag());
        }

        $status = Status::create($request->description, $request->content);

        return response($status, 201);
    }
    public function getByID(Request $request, $id){
        $user = User::findOrFail($id);
        $status_list = $user->status()->latest()->with('content')->get();
        $response = [];

        foreach ($status_list as $status) {
            $response[] = [
                'id' => $status->id,
                'description' => $status->description,
                'content' => [
                    'id' => $status->content->id,
                    'url'  => $status->content->url,
                    'name' =>  $status->content->file_name,
                    'extension'=>  $status->content->extension,
                    'timestamp' => $status->content->timestamp,
                    'size' =>  $status->content->size,
                ],
                'timestamp' => $status->timestamp,
            ];
        }
        return response($response);

    }
    public function delete(Request $request){
        return response('Ops. Voce tentou acessar uma rota ainda não implementada', 501);
    }
    public function update(Request $request){
        return response('Ops. Voce tentou acessar uma rota ainda não implementada', 501);
    }
}
