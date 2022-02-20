<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Status extends Model
{
    use HasFactory;
    protected $table = 'status';

    protected $fillable = [
        'owner_id',
        'description',
        'content_id'
    ];

    public static function create($description = '', $content){
        try {
            DB::beginTransaction();
            $attachment = Attachment::store($content);
            $model = new self;
            $model->description = $description;
            $model->content_id = $attachment->id;
            $model->owner_id = user()->id;
            $model->save();
            $model->content = $attachment;
            //code...
            DB::commit();
            return $model;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    function owner(){
        return $this->hasOne(User::class, 'id', 'owner_id');
    }

    function content(){
        return $this->hasOne(Attachment::class, 'id','content_id');
    }
    function getTimestampAttribute(){
        return $this->created_at->timestamp;
    }
}
