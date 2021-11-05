import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageT } from '@types'

export interface MessageState{
    items : { [messageID:string] : MessageT }
    allIds: Array<number>
}
const initialState : MessageState = {
    items: {},
    allIds : []
}

const messageSlice = createSlice({
    name: "currentChat",
    initialState,
    reducers:{
        recievedMessages(state, action:PayloadAction<Array<MessageT>>){
            const messages = action.payload
            messages.forEach((message)=>{
                state.items[message.id] = message
            })
        }
    }
})

export const { recievedMessages } = messageSlice.actions
export default messageSlice.reducer;