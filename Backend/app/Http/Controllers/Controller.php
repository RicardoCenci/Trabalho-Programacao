<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected function handleError($e){
        $message = [
            'message'=> $e->getMessage()
        ];
        if (config('app.debug')) {
            $message['debug'] = [
                'in'=>$e->getFile(),
                'code'=>$e->getCode(),
                'line'=>$e->getLine(),
                'trace'=>$e->getTrace()
            ];
        }
        return response($message);
    }
    protected function notAuthenticated(){
        return response(['message'=>'Not Authenticated']);
    }
    protected function badRequest($validatorBag = null ,string $message = "Validation Error"){
        if (gettype($validatorBag) === 'string') {
            $message = $validatorBag;
            $validatorBag = null;
        }
        $response = [
            'message'=> $message
        ];
        if ($validatorBag) {
            $response['errors'] = $validatorBag;
        }
        return response($response, 400);
    }
    protected function notFound(string $message = 'Register not Found'){
        return response(['message'=>$message],404);
    }
    protected function unknownError($e = null){
        $message = ['message'=> 'An unknown error occurred!'];
        if (config('app.debug')) {
            $message['debug'] = $e;
        }
        return response($message, 500);
    }

    protected function message($message, $status = 200){
        return response(['message'=>$message], $status);
    }
}
