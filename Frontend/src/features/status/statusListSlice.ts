import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactStatus } from '@types';

export interface StatusListState{
    items: {
        [statusID : number] : ContactStatus
    }, 
    allIds : Array<number>
}

const initialState : StatusListState = {
    items: [],
    allIds: [],
}

const statusSlice = createSlice({
    name: "statusList",
    initialState,
    reducers:{
        recievedStatusList(state, action:PayloadAction<Array<ContactStatus>>){
            for (const status of action.payload) {
                state.items[status.user.id] = status
                state.allIds.push(status.user.id)
            }
        }
    }
})

export const { recievedStatusList } = statusSlice.actions
export default statusSlice.reducer;