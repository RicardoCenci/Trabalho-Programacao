<?php

namespace App\Responses;

use App\Responses\BaseResponse;


class BlockedUsers extends BaseResponse{

    public function __construct($blocked_users_list) {
        foreach ($blocked_users_list as $user) {
            $this->pushToResponse($this->createBlockedUser($user));
        }
      }
  
      private function createBlockedUser($blocked_user){
          return [
              'user' => $blocked_user->blockedUser()->first(['id','first_name','last_name','photo']),
              'blocked_at' => strtotime($blocked_user->created_at)
          ];
      }
}