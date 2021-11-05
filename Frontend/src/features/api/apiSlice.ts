import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store'
import { HttpResponse } from '@types'

export interface Api{
    post(url : string, body : Object, header : Object): Promise<HttpResponse>,
    get(url : string, body : Object, header : Object) : Promise<HttpResponse>,
    delete(url : string, body : Object, header : Object): Promise<HttpResponse>,
    update(url : string, body : Object, header : Object): Promise<HttpResponse>,
    logout(url : string, body : Object, header : Object): Promise<HttpResponse>,
    isAuthenticated() : boolean
}


export interface ApiState{
    current: {
        [key: string] : any
    }
}

const initialState : ApiState = {
    current:{}
}

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers:{
        recievedAPI(state, action:PayloadAction<any>){
            const api = action.payload as Api
            state.current = {
                get : api.get,
                post: api.post,
                delete: api.delete,
                update: api.update,
                isAuthenticated: api.isAuthenticated,
                logout: api.logout
            }
        }
    }
})
export const getApi = createSelector(
    (state : RootState) => state.api.current,
    (api)=>api
)
export const { recievedAPI } = apiSlice.actions
export default apiSlice.reducer;