<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use PhpParser\Node\Stmt\Catch_;

class Attachment extends Model
{
    use HasFactory;
    protected $table = 'attachment';
    protected $fillable = [
        'url',
        'file_name',
        'extension',
        'size'
    ];


    static public function store(\Illuminate\Http\UploadedFile $file, $maxUploadMB = 10, $allowedExt = ['jpeg', 'jpg', 'png', 'bmp', 'pdf', 'gif', 'mp4', 'mov', 'avi', 'webm', 'mp3', 'wav', 'ogg']){
        $ext = $file->extension();
        $size = $file->getSize();
        if (!in_array($ext, $allowedExt)) {
            throw new \Exception("Extension type $ext not allowed", 1);
        }
        if ($maxUploadMB *1024 *1024 <= $size) {
            throw new \Exception("File size exeed upload limit of $maxUploadMB MB", 1);
        }
        
        $fileName = Attachment::getFileName($file->getClientOriginalName());

        $uid = sha1(microtime(). $fileName);

        try{
            $path = $file->storeAs(
                'images', $uid
            );
        }catch(\Exception $e){
            if ($path) {
                unlink($path);
            }
           throw $e;
        }
        
        return Attachment::create([
            'url'=> $uid,
            'file_name'=>$fileName,
            'extension'=>$ext,
            'size'=>$size
        ]);
    }

    static public function getFileName(string $fileName){
        $fileNameArr = explode('.',$fileName);
        array_pop($fileNameArr);
        return implode('.',$fileNameArr);
    }
}
