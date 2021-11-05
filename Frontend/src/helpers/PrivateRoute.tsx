import { GlobalContext } from "@contexts/GlobalContext";
import { useAppSelector } from "@hooks";
import { useContext } from "react";
import {
    Route,
    Redirect
  } from "react-router-dom";
import { getCookie } from ".";

export default function PrivateRoute({children, ...props} : {children:any, [key:string] : any}){
    const hasCookie = getCookie('access_token');
    return(
        <Route {...props} render={() => {
            return hasCookie
                    ? children
                    : <Redirect to='/login' />
          }} />
    );

}