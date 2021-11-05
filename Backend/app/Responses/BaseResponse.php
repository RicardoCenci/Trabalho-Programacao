<?php
namespace App\Responses;

use JsonSerializable;

class BaseResponse implements JsonSerializable{

    public $root_response = [];

    public function jsonSerialize(){
        $data = get_object_vars($this);
        foreach ($data as $key => $value) {
            if ($key == 'root_response') {
                continue;
            }
            $this->root_response[$key] = $value;
        }
        return $this->root_response;
    }

    protected function pushToResponse($value){
        array_push($this->root_response, $value);
    }
    protected function setOnResponse($key, $value){
        $this->root_response[$key] = $value;
    }
}