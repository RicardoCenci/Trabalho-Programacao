<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusViewList extends Model
{
    use HasFactory;
    protected $table = 'status_view_list';

    protected $fillable = [
        'owner_id',
        'recipient_id',
        'can_view'
    ];
    protected $cast = [ 
        'can_view'=>'boolean'
    ];

    function owner(){
        return $this->hasOne(User::class, 'owner_id');
    }

    function recipient(){
        return $this->hasOne(User::class, 'recipient_id');
    }
}
