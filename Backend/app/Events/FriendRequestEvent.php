<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FriendRequestEvent implements ShouldBroadcast 
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $to;
    public $from;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(\App\Models\User $from, $to)
    {
        $this->to = $to;
        $this->from = $from;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel(sha1('user.'.$this->to));
    }
}
