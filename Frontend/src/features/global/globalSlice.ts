import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FunctionComponentElement } from 'react'

export interface GlobalState{
    loading : number,
    popupPage?: FunctionComponentElement<any>
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
        }
    }
})

export const { recievedLoading } = globalSlice.actions
export default globalSlice.reducer;