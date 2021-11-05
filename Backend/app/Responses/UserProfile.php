<?php

namespace App\Responses;

use App\Responses\BaseResponse;


class UserProfile extends BaseResponse{

    public function __construct($user) {
        $this->id = $user->id;
        $this->first_name = $user->first_name;
        $this->last_name = $user->last_name;
        $this->photo = $user->photo;
        $this->created_at = strtotime($user->created_at);
    }
}