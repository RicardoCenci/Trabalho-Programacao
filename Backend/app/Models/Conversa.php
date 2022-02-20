<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Conversa extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_user',
        'second_user'
    ];
    protected $casts =[
        'created_at' => 'datetime'
    ];
    public static function createBetween($user1, $user2){
        $user1ID = gettype($user1) === 'object' ? $user1->id : $user1;
        $user2ID = gettype($user2) === 'object' ? $user2->id : $user2;
        // dd($user1ID , $user2ID);
        return Conversa::create([
            'first_user' => $user1ID,
            'second_user' => $user2ID
        ]);
    }
    function mensagens(){
        return $this->hasMany(Mensagem::class, 'conversation_id', 'id');
    }

}
