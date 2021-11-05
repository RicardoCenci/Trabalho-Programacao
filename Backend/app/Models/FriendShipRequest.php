<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FriendShipRequest extends Model
{
    use HasFactory;
    protected $table = 'friendship_requests';

    protected $fillable = [
        'sender_id',
        'recipient_id',
        'status'
    ];

   
    protected $hidden = [

    ];

    
    protected $casts = [
        'status'=> 'boolean'
    ];

    function to(){
        return $this->belongsTo(User::class, 'recipient_id');
    }
    
    function from(){
        return $this->belongsTo(User::class, 'sender_id');
    }
    function accept(){
        try {
            DB::beginTransaction();
            $this->status = 1;
            $this->save();
            $existingFriendShip = FriendShip::where('user_id', $this->sender_id)
                                            ->orWhere('friend_id', $this->sender_id)
                                            ->orWhere('user_id', $this->recipient_id)
                                            ->orWhere('friend_id', $this->recipient_id)
                                            ->first();
            if ($existingFriendShip) {
                throw new \Exception("This friendship already exists", 400);
            }
            FriendShip::create([
                'user_id'=> $this->sender_id,
                'friend_id'=> $this->recipient_id
            ]);
            DB::commit();
            
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    
}
