<?php

namespace App\Responses;

use App\Responses\BaseResponse;


class OutgoingFriendRequest extends BaseResponse{

    public function __construct($friend_ship_requests_list) {
      foreach ($friend_ship_requests_list as $request) {
          $this->pushToResponse($this->createFriendRequest($request));
      }
    }

    private function createFriendRequest($request){
        return [
            'request_id' => $request->id,
            'to' => $request->to()->get(['id','first_name','last_name','photo']),
            'timestamp'=>strtotime($request->created_at)
        ];
    }
}