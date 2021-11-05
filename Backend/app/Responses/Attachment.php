<?php
namespace App\Responses;


class Attachment extends BaseResponse{

    public function __construct($attachment) {
        if (!$attachment) {
            $this->root_response = null;
            return;
        }
        $this->url = $attachment->url;
        $this->url = $attachment->name;
        $this->url = $attachment->extension;
        $this->url = $attachment->size;
    }
}