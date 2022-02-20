import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GlobalState{
    loading : number,
    popupPage?: any
}

const initialState : GlobalState = {
    loading: 0,
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers:{
        recievedLoading(state, action:PayloadAction<number>){
            state.loading = action.payload
        },
        recievedPage(state, action : PayloadAction<any>){
            state.popupPage = action.payload
        }
    }
})

export const { recievedLoading,recievedPage } = globalSlice.actions
export default globalSlice.reducer;