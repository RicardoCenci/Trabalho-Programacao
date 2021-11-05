import Cache from "@helpers/Cache"
import { HttpResponse, UserT } from "@types"
import image from '@images/tree-736885__480.jpg'
import { useAppSelector, useAppDispatch } from '@hooks'
import { getCookie } from '@helpers'
import { is } from "@reduxjs/toolkit/node_modules/immer/dist/internal"

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
        const payload = createRequest('GET' , {} , header);
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
        return {
            ok: response.ok,
            status : response.status,
            statusMessage: response.statusText,
            path: response.url,
            headers: response.headers,
            body : await response.json()
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
            !isToken(token) || headers.set('Authentication',`Bearer ${token.get()}`)
        }catch(e){
            if (!(e instanceof ReferenceError)) {
                console.error(e)
            }
        }
        return headers
    }

    const token = isToken(credentials) ? credentials : await login(credentials) 
  
    return {
        post: post,
        get : get,
        delete: del,
        update: update,
        logout: logout,
        isAuthenticated
    }
}


export function createToken(token:string){
    const authEndpoint = process.env.REACT_APP_API_ENDPOINT || 'localhost:8000'

    function get(){
        return token
    };

    async function isValid(){
        var r : any = {
            status : 500
        };
        await fetch(authEndpoint + '/verify', {
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },  
        })
        .then(createResponse)
        .then(res =>{
            r = res
        })
        return r
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
    return{
        get,
        isValid,
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


