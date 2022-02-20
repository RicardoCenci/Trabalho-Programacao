<?php

use App\Models\Attachment;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('image/{url}', function($url){
    $attachment = Attachment::where('url', $url)->first();
    abort_if(!$attachment, 404);
    return $attachment->response();
})->name('image');