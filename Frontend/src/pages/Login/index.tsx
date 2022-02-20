import style from './style.module.css'
import {FormInput} from '@components/Input'
import {
    Link, Redirect
} from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from 'react';

import {createToken} from '@helpers/APIInterface'
import createAPI from '@helpers/APIInterface'
import { HttpError, HttpResponse } from '@types';
import { useAppDispatch } from '@store';
import { recievedUser } from '@features/user/userSlice';
import { useAppSelector } from '@hooks';
import { getApi, recievedAPI } from '@features/api/apiSlice';
import { getCookie, isEmpty } from '@helpers';

export default function Login(){
    const form = useRef(null)
    const [loginMessage, setLoginMessage] = useState<Object>('')
    const [passwordMessage, setPasswordMessage] = useState<Object>('')

    const [loading,setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const api = useAppSelector(getApi)

    const handleSubmit = useCallback(async ()=>{
        if (!form.current) {
            console.error('Something went wrong');
            return
        }
        if(user.isAuthenticated) {
            return
        }
        const payload = new FormData(form.current);

        const fieldRequiredMessage = {icon: 'icon-close', text: 'This field is required', color: 'red'};

        const email = payload.get('email') || setLoginMessage(fieldRequiredMessage)

        const password =  payload.get('password') || setPasswordMessage(fieldRequiredMessage)
        
        if (!email || !password) {
            return
        }
        const handleRej = (err : HttpError)=>{
            const errorMessage  = {color: 'red',icon: 'icon-close', text: 'Something went wrong'};
            setLoading(false)
            if (!err.hasOwnProperty('getStatus')) {
                console.log(err)
                debugger
                return
            }
            if (err.getStatus() === 401) {
                setLoginMessage({...errorMessage, text : err.getMessage()})  
                setPasswordMessage({...errorMessage, text : err.getMessage()})  
            }
            if(err.isValidationError()){
                const errors = err.getValidationErrors()
                !errors['email'] || setLoginMessage({...errorMessage, text : errors['email'][0]})  
                !errors['password'] || setPasswordMessage({...errorMessage, text : errors['password'][0]})
            }

        };
        const handleSuccess = (res: any)=>{
            setLoading(false)
            dispatch(recievedUser({...res.body.user , 'private_channel' : res.body.channel}))
        }
        setLoading(true)
        const API = await createAPI({email: email, password: password} ,{onError: handleRej, onSuccess: handleSuccess})
        if ( API.isAuthenticated()) {
            dispatch(recievedAPI(API))
        }
    },[form, dispatch])

    
    useEffect(()=>{
        async function checkToken(t : string){
            const token = createToken(t)
            const response = await token.isValid() as HttpResponse;
            if (response?.status === 200) {
                const API = await createAPI(token)
                dispatch(recievedAPI(API))
                dispatch(recievedUser(response.body.user))
            }
        }
        const t = getCookie('access_token');
        if (!t) {
            return  
        }
        checkToken(t)
    },[dispatch])

    return(
        <div className={style.container}>
            {user.isAuthenticated && !isEmpty(api) && <Redirect to="/"/>}
            {loading && <div className={style.loading}><span></span></div>}
            <h1>Login</h1>
            <form action="" ref={form}>
                <fieldset>
                    <FormInput type='text' required name='email' message={loginMessage} setMessage={setLoginMessage}/>
                    <FormInput type='password' required name='password' message={passwordMessage} setMessage={setPasswordMessage}/>
                </fieldset>
        
                <p className={style.forgotPassword}>Forgot your password? <Link to='/password-recovery'>Recover Password</Link></p>
            </form>

            <div className={style.buttons}>
                <button className={style.login} onClick={handleSubmit}>login</button>
                <p className={style.signIn}>Dont have an account? <Link to='/register'>Sign in</Link></p>
            </div>
        </div>
    );
}
