import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState{
    isAuthenticated : boolean,
    id: number,
    first_name:string,
    last_name : string,
    photo: string,
    private_channel: string
}

const initialState : UserState = {
    isAuthenticated : false,
    id: 0,
    first_name: '',
    last_name: '',
    photo: '',
    private_channel: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        recievedUser(state, action:PayloadAction<UserState>){
            const user = action.payload
            state.isAuthenticated = true; 
            state.id = user.id
            state.first_name = user.first_name
            state.last_name = user.last_name ?? ''
            state.photo = user.photo
            state.private_channel = user.private_channel
        }
    }
})

export const { recievedUser } = userSlice.actions
export default userSlice.reducer;