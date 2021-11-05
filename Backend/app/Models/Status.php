<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $table = 'status';

    protected $fillable = [
        'owner_id',
        'description',
        'content_id'
    ];
    
    function owner(){
        return $this->hasOne(User::class, 'owner_id');
    }

    function content(){
        return $this->hasOne(Attachment::class, 'content_id');
    }
}
