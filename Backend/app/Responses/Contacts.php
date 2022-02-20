<?php
namespace App\Responses;

use App\Responses\Attachment as AttachmentResponse;
use App\Responses\BaseResponse;

class Contacts extends BaseResponse{

    public $root_response  = [];

    public function __construct($contactList, $other_users) {
        $other_users = $other_users->keyBy('id');
        foreach ($contactList as $contact) {
            array_push($this->root_response, $this->createContact($contact, $other_users[$contact->contact_id]));
        }

    }

    private function createContact($contact, $user){
        return [
            'user' => $user,
            'messages'=>[
                'items' => [
                    $contact->id => [
                        'send_by' => auth()->user()->id == $user->id ? 'user' : 'contact',
                        'timestamp' => $contact->timestamp,
                        'attachment' =>  new AttachmentResponse($contact->attachment()->first()),
                        'message_type' => $contact->getMessageType(),
                        'text'=> $contact->text
                    ]
                ],
                'allIds' => [$contact->id],
               
            ],
            'unread_messages' => 0
        ];
    }
}