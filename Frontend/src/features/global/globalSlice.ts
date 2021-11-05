import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GlobalState{
    loading : Boolean
}

const initialState : GlobalState = {
    loading: true
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers:{
        recievedLoading(state, action:PayloadAction<boolean>){
            state.loading = action.payload
        }
    }
})

export const { recievedLoading } = globalSlice.actions
export default globalSlice.reducer;