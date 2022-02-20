import { getApi, recievedAPI } from "@features/api/apiSlice";
import { recievedUser } from '@features/user/userSlice';
import LoadingScreen from '@components/Loading';
import { useAppDispatch, useAppSelector } from "@hooks";
import { useEffect, useRef, useState } from "react";
import {
    Route,
    Redirect
  } from "react-router-dom";
import { getCookie, isEmpty } from ".";
import createAPI, { createToken } from "./APIInterface";
import Websocket from "./Websocket";

export default function PrivateRoute({children, ...props} : {children:any, [key:string] : any}){
    const api = useAppSelector(getApi)
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
       

    },[])
    useEffect(()=>{
        if(user.isAuthenticated || !isEmpty(api) || !loading){
            return
        }
        async function login(){
            const token = createToken(getCookie('access_token'));
            const API = await createAPI(token);
            const isAuthenticated = API.isAuthenticated();
            setLoading(false)
            if(!isAuthenticated){
                return
            }
            dispatch(recievedAPI(API))
            dispatch(recievedUser(API.getUser()))
            Websocket.connect(token.getUser());

        }
        login()
    },[loading])
    return(
        <Route {...props} render={() => {
            return  (
                user.isAuthenticated 
                    ? children
                    : (
                        loading ? <LoadingScreen/> : <Redirect to='/login' />
                    ))
          }} />
    );

}