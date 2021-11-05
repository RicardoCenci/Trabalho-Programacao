<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'photo',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'email'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function contacts(){
        $conversas = Conversa::select('id')
                            ->where('first_user', $this->id)
                            ->orWhere('second_user', $this->id)
                            ->get();
                            
        return Mensagem::select(
                    DB::raw('max(text) as text'),
                    DB::raw('max(mensagens.created_at) as timestamp'),
                    DB::raw('max(sender_id) as last_sender'),
                    DB::raw('CASE 
                            WHEN max(first_user) = max(sender_id) THEN max(second_user)
                            ELSE max(first_user)
                            END contact_id'),
                    'conversation_id')
                ->join('conversas', 'conversas.id', '=','mensagens.conversation_id')
                ->whereIn('conversation_id',$conversas)
                ->groupBy('conversation_id');
    }
    public function conversa($idOrModel){
        $id = gettype($idOrModel) === 'object' ? $idOrModel->id : $idOrModel;
        return Conversa::where('first_user', $id)
                        ->orWhere('second_user', $id)
                        ->orWhere('first_user', $this->id)
                        ->orWhere('second_user', $this->id)
                        ->first();
    }
    function incomingFriendRequests(){
        return $this->hasMany(FriendShipRequest::class, 'recipient_id');
    }

    function outgoingFriendRequests(){
        return $this->hasMany(FriendShipRequest::class, 'sender_id');
    }

    function friends(){
        if (!$this->id) {
            return $this;
        }
        return FriendShip::where('user_id', $this->id)
                            ->orWhere('friend_id', $this->id);
    }
    

    function blockedUsers(){
        return $this->belongsToMany(BlockedUser::class, 'id', 'user_id');
    }
    
    function fullName(){
        return "$this->first_name $this->last_name";
    }
} 
