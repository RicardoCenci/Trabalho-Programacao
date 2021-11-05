import Echo from "laravel-echo"
declare global {
    interface Window { Pusher: any; }
}
window.Pusher = require('pusher-js')

class Websocket{
    _echo : Echo;
    static __me: Websocket;
    _callbacks : {[key:string] : any} = {}
    _channel: any;
    constructor() {
        this._echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_WS_KEY,
            wsHost: window.location.hostname,
            wsPort: process.env.REACT_APP_WS_PORT,
            forceTLS: false,
            disableStats: true
        })
        this._bindEvents()

        Websocket.__me = this
    }
    _bindEvents(){
        this._echo.connector.pusher.connection.bind('connecting', (payload : any) => {
            console.log('connecting...');
        });
        
        this._echo.connector.pusher.connection.bind('connected', (payload  : any) => {
            console.log('connected!', payload);
        });
        
        this._echo.connector.pusher.connection.bind('unavailable', (payload  : any) => {
            console.log('unavailable', payload);
        });
        
        this._echo.connector.pusher.connection.bind('failed', (payload  : any) => {    
            console.log('failed', payload);
        });
        
        this._echo.connector.pusher.connection.bind('disconnected', (payload  : any) => {
            console.log('disconnected', payload);
        });
        
        this._echo.connector.pusher.connection.bind('message', (payload  : any) => {
            console.log('message', payload);
        });
    }

    static getInstance(){
        return Websocket.__me ? Websocket.__me : new Websocket()
    }

    static on(uniqueID : string,event: string, callback : Function){
        const ws = Websocket.getInstance()
        if(!ws._callbacks[event]){
            ws._callbacks[event] = []
        }
        ws._callbacks[event][uniqueID] = callback
    }

}


export default Websocket