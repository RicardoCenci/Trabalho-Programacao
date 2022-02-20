<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\GroupController;

Route::group(['api'], function(){
    Route::post('/register', [AuthController::class, "register"]);
    Route::post('/login', [AuthController::class, "login"]);
    
});

Route::group(['middleware' => ['auth:sanctum']], function(){
    
    Route::post('channel/auth', [AuthController::class, "websocket"]);

    Route::prefix('my')->group(function(){


        Route::get('/contacts', [UserController::class, "getContacts"]);
        Route::get('/friendship-requests/incoming', [UserController::class, "getIncomingFriendShipRequest"]);
        Route::get('/friendship-requests/outgoing', [UserController::class, "getOutgoingFriendShipRequest"]);
        Route::post('/friendship-requests/respond', [UserController::class, "respondFriendRequest"]);
        Route::get('/blocked-users', [UserController::class, "getBlockedUser"]);
        Route::get('/qrcode', [UserController::class, "getQrcode"]); //Isso daqui talvez não precise



        Route::get('/profile', [UserController::class, "getProfile"]);
        Route::post('/profile', [UserController::class, "editProfile"]);

        Route::get('/preferences', [UserController::class, "getPreferences"]);
        Route::post('/preferences', [UserController::class, "editPreference"]);

    });

    Route::prefix('contacts')->group(function(){
        Route::post('/{userID}/send', [ContactsController::class, "sendMessage"]);
        Route::post('/{userID}/send-friend-request', [ContactsController::class, "sendFriendRequest"]);
        Route::post('/{userID}/block', [ContactsController::class, "blockUser"]);
        Route::post('/{userID}/unblock', [ContactsController::class, "unblockUser"]);
        Route::get('/{userID}/profile', [ContactsController::class, "getProfile"]);
        Route::get('/{userID}/messages', [ContactsController::class, "getMessages"]);
        
    });

    Route::prefix('group')->group(function(){
        Route::post('/create', [GroupController::class, "create"]);
        Route::get('/{groupID}/join', [GroupController::class, "join"]);
        Route::get('/{groupID}/exit', [GroupController::class, "exit"]);
        Route::delete('/{groupID}/delete', [GroupController::class, "delete"]);
        Route::patch('/{groupID}/update', [GroupController::class, "update"]);
        Route::get('/{groupID}/block', [GroupController::class, "block"]);
        Route::get('/{groupID}/accept-request', [GroupController::class, "accept"]);
        
    });
    Route::prefix('status')->group(function(){
        Route::get('/', [StatusController::class, "index"]);
        Route::post('/create', [StatusController::class, "store"]);
        Route::get('/{statusID}', [StatusController::class, "getByID"]);
        Route::delete('/{statusID}', [StatusController::class, "delete"]);
        Route::patch('/{statusID}', [StatusController::class, "update"]);
        
    });


    Route::post('/logout', [AuthController::class, "logout"]);
    Route::post('/verify', [AuthController::class, "verifyToken"]);
});


    
