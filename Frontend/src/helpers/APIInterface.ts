import { HttpResponse } from "@types"

export default async function createAPI(credentials: any, callbacks : {onSuccess? : Function, onError?: Function} = {}) {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || '127.0.0.1:8000'
    var authenticationSuccess = false;

    function isToken(obj : Object){
        return  obj.hasOwnProperty('isValid') ||
                obj.hasOwnProperty('refresh') ||
                obj.hasOwnProperty('destroy') 
    }

    function del(url : string, body ={}, header ={}) : Promise<HttpResponse>{
        const payload = createRequest('DELETE' , body , header);
        return fetch(`${endpoint}${url}`, payload)
            .then(handleResponse)
    }
    function post(url : string, body = {}, header = {}) : Promise<HttpResponse>{
        const payload = createRequest('POST' , body , header);
        return fetch(`${endpoint}${url}`, payload)
                .then(handleResponse)
    }



    function get(url : string, header ={}) : Promise<HttpResponse>{
        const payload = createRequest('GET' , null , header);
        return fetch(`${endpoint}${url}`, payload)
            .then(handleResponse)
    }

    function update(url : string, body ={}, header ={}) : Promise<HttpResponse>{
        const payload = createRequest('PATCH' , body , header);
        return fetch(`${endpoint}${url}`, payload)
            .then(handleResponse)
    }
    
    function logout(){}
    
    async function login(credentials : {email : string, password: string} | FormData){
        const [email, password] = credentials instanceof FormData ? [credentials.get('email'),credentials.get('password')] : [ credentials?.email, credentials?.password]
        if (!email || !password) {
            console.error('No credentials recieved to login');
            return
        }
        var r;

        await post('/login', credentials)
                .then((response)=>{
                    r = createToken(response.body.access_token)
                    setAuthCookie(r)
                    if (typeof callbacks['onSuccess'] === 'function') {
                        authenticationSuccess = true
                        callbacks['onSuccess'](response)
                    }

                }).catch((err : HttpError)=>{
                    if (typeof callbacks['onError'] === 'function') {
                        callbacks['onError'](err)
                    }
                })
        return r
    }
    function setAuthCookie(token : any) {
        document.cookie =  `access_token=${token?.get() || token}; path=/`;
    }
    function isAuthenticated(){
        return authenticationSuccess
    }

    async function handleResponse(response : any){
        const res = await createResponse(response)
        if(!res.ok){
            throw new HttpError(res);
        }
        return res
    }
    async function createResponse(response : Response){      
        const responseData = await response.text();
        
        return {
            ok: response.ok,
            status : response.status,
            statusMessage: response.statusText,
            path: response.url,
            headers: response.headers,
            body : JSON.parse(responseData)
        }
    }
    function createRequest(method: string , body : Object | null  = null ,header = {}){
        const init = new Map()
        init.set('method', method)
       
        init.set('headers', createHeader(header))
        !body || init.set('body', JSON.stringify(body))

        return Object.fromEntries(init);
    }

    function createHeader(header = {}){
        const headers = new Headers({
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            ...header
        })
        try{
            !isToken(token) || headers.set('Authorization',`Bearer ${token.get()}`)
        }catch(e){
            if (!(e instanceof ReferenceError)) {
                console.error(e)
            }
        }
        return headers
    }

    function getUser(){
        return token.getUser();
    }
    if (isToken(credentials)) {
        authenticationSuccess = await credentials.isValid();
    }

    const token = isToken(credentials) ? credentials : await login(credentials) 
  
    return {
        post: post,
        get : get,
        delete: del,
        update: update,
        logout: logout,
        getUser: getUser,
        isAuthenticated
    }
}

export interface Token {
    get(): any,
    isValid() : any,
    refresh() : any,
    destroy() : any
    getUser() : any
}

export interface LoggedUser{
    "id": number,
    "first_name": string,
    "last_name": string,
    "photo": string|null,
    "channel": string
}
export function createToken(token:string) : Token{
    const authEndpoint = process.env.REACT_APP_API_ENDPOINT || 'localhost:8000'

    var user: LoggedUser|null = null;

    function get(){
        return token
    };

    async function isValid(){
        if (user) {
            return true;
        }
        const response = await fetch(authEndpoint + '/login', {
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },  
        }).then(createResponse)

        if (response.status == 200) {
            user = {...response.body.user, channel: response.body.channel}
            return true;
        }
        return false
    };

    async function createResponse(response : Response){
        return {
            ok: response.ok,
            status : response.status,
            statusMessage: response.statusText,
            path: response.url,
            headers: response.headers,
            body : await response.json()
        }
    }

    function refresh(){};
    function destroy(){};
    function getUser(){
        return user
    };

    return{
        get,
        isValid,
        getUser,
        refresh,
        destroy
    }
}
class HttpError{
    _res : HttpResponse
    constructor(response : any){
        this._res = response
    }
    getStatus(){
        return this._res.status
    }
    getMessage(){
        return this._res.body.message
    }
    isValidationError(){
        return this._res.body.message === 'Validation Error'
    }
    getValidationErrors(){
        return this._res.body.data
    }
    getBody(){
        return this._res.body
    }
}


