<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendShip extends Model
{
    use HasFactory;
    protected $table = 'friendships';

    protected $fillable = [
        'user_id',
        'friend_id'
    ];
    function sender(){
        return $this->belongsTo(User::class, 'sender_id');
    }
    // function sender(){
    //     return $this->belongsTo(User::class, 'sender_id');
    // }
}
