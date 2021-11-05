<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Message implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;
    public $reciever;
    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(\App\Models\User $sender, \App\Models\User $reciever, $message){
        
        $this->sender = $sender;
        $this->reciever = $reciever;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel(sha1('user.'.$this->reciever->id));
    }
}
