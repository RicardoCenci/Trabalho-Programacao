<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'string',
            'email'=> 'required|string|unique:users,email',
            'password'=>'required|string|confirmed'
        ]);
        if($validator->fails()){
            return response([
                "error_message" => "Validator Error",
                "messages"=>$validator->getMessageBag()
            ], 400);
        }
        $fields = $validator->validated();

        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'] ?? null,
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);


        $access_token = $user->createToken('access_token')->plainTextToken;

        return response([
            'user'=> $user,
            'token'=> $access_token
        ], 201);
    }
    function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        if($validator->fails()){
            return response([
                "message" => "Validation Error",
                "data"=>$validator->getMessageBag()
            ], 400);
        }
        $fields = $validator->validated();
        
        $user = User::where('email',$fields['email'])->get()->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Incorrect email or password'
            ], 401);
        }

        $token = $user->createToken('access_token')->plainTextToken;
        return response([
            'user'=> $user,
            'channel'=>sha1('user.'.$user->id),
            'access_token' => $token
        ], 200);
    }
    function logout(Request $response){
        auth()->user()->tokens()->delete();
        
        return [
            'message' => 'Successfuly logout'
        ];
    }

    public function verifyToken(Request $request){
        $user = auth()->user();
        return response([
            'user'=> $user,
            'channel'=>sha1('user.'.$user->id)
        ]);
    }
}
