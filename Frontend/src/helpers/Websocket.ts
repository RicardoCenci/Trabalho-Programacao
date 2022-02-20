import Echo from "laravel-echo"
import { getCookie } from ".";
import { LoggedUser } from "./APIInterface";
declare global {
    interface Window { Pusher: any; }
}
window.Pusher = require('pusher-js')

class Websocket {
    _echo: Echo;
    static __me: Websocket;
    _callbacks: CallbackManager
    _channel: any;
    static _queue : Array<any> = [];
    constructor(user: LoggedUser) {
        this._echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_WS_KEY,
            wsHost: window.location.hostname,
            wsPort: process.env.REACT_APP_WS_PORT,
            authEndpoint: 'http://localhost:8000/broadcasting/auth',
            auth: {
                headers: {
                    'Authorization': `Bearer ${getCookie('access_token')}`,
                }
            },
            forceTLS: false,
            disableStats: true
        })
        this._bindEvents()
        this._channel = this._echo.private(`${user.channel}`)
        this._callbacks = new CallbackManager(this._channel)
        Websocket.__me = this

        Websocket._queue.forEach(([id, event, callback]) => {
            this._callbacks.update(id, event, callback);
        });

    }
    _bindEvents() {
        this._echo.connector.pusher.connection.bind('connecting', (payload: any) => {
            console.log('connecting...');
        });

        this._echo.connector.pusher.connection.bind('connected', (payload: any) => {
            console.log('connected!', payload);
        });

        this._echo.connector.pusher.connection.bind('unavailable', (payload: any) => {
            console.log('unavailable', payload);
        });

        this._echo.connector.pusher.connection.bind('failed', (payload: any) => {
            console.log('failed', payload);
        });

        this._echo.connector.pusher.connection.bind('disconnected', (payload: any) => {
            console.log('disconnected', payload);
        });

        // this._echo.connector.pusher.connection.bind('message', (payload  : any) => {
        //     console.log('message', payload);
        // });

    }
    static connect(user: LoggedUser) {
        return new Websocket(user);
    }
    static getInstance() {
        if (!Websocket.__me) {
            return false;
        }
        return Websocket.__me;

    }

    static on(uniqueID: string, event: string, callback: Function) {
        const ws = Websocket.getInstance()
        if (!ws) {
            Websocket._queue.push([uniqueID, event, callback])
            return 
        }
        ws._callbacks.update(uniqueID, event, callback);
    }

    static stopListening(uniqueID: string, event: string){
        const ws = Websocket.getInstance()
        if (!ws) {
            return
        }
        ws._callbacks.stopListening(uniqueID, event);

    }

}
class CallbackManager {
    _callbacks: { [key: string]: any } = {}
    _channel

    constructor(channel: any) {
        this._channel = channel;
    }

    update(uniqueID: string, event: string, callback: Function) {
        if (!this.hasEvent(event)) {
            this._registerEvent(event)
        }
        if (!this._callbacks[event][uniqueID]) {
            console.log(`${uniqueID} started listening to ${event}`)
        }
        this._callbacks[event][uniqueID] = callback;
    }

    hasEvent(event: string) {
        return !!this._callbacks[event]
    }


    _registerEvent(event: string) {
        if (this._callbacks[event]) {
            return
        }
        console.log(`Registering event: ${event}`)
        this._channel.listen(event, (payload: any) => {
            this._notify(event, payload)
        })
        this._callbacks[event] = [];
    }

    _notify(event: string, payload: any) {
        for (const id in this._callbacks[event]) {
            this._callbacks[event][id].call(payload, payload)
        }
    }

    stopListening(id : string, event: string) {
        if (!this.hasEvent(event)) {
            return
        }
        console.log(`${id} stopped listening to ${event}`)
        delete this._callbacks[event][id]

    }

}

export default Websocket