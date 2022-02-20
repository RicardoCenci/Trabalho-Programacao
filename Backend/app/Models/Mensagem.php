<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensagem extends Model
{
    use HasFactory;
    protected $table = 'mensagens';

    protected $fillable = [
        'conversation_id',
        'sender_id',
        'attachment_id',
        'text',
        'sender_id'
    ];

    function sender(){
        return $this->hasOne(User::class, 'sender_id');
    }
    function recipient(){
        return $this->hasOne(User::class, 'recipient_id');
    }
    function attachment(){
        return $this->belongsTo(Attachment::class, 'attachment_id');
    }

    function getTypeAttribute(){
        if ($this->attachment_id) {
            return 'Midia';
        }
        return 'Text';
    }
    function getSendByAttribute(){
        return $this->sender_id == auth()->user()->id ? 'user' : 'contact';
    }
    function getTimestampAttribute(){
        return isset($this->attributes['timestamp']) ? strtotime($this->attributes['timestamp']) : $this->created_at->timestamp;
    }

    public function getMessageType(){
        $attachment = $this->attachment()->first();

        switch ($attachment->extension ?? '') {
            case 'png':
            case 'jpeg':
            case 'jpg':
            case 'bpm':
            case 'webp':
            case 'gif':
                return 'Image';
                break;

            case 'pdf':
                return 'File';
                break;
    
            case 'mp3':
            case 'ogg':
            case 'wav':
                return 'Audio';
                break;

            case 'avi':
            case 'mp4':
            case 'mov':
                return 'Video';
                break;
                            
            default:
                return "Text";
                break;
        }
    }
}
