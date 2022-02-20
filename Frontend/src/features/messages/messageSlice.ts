import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store from '@store'
import { Message } from '@types'

export interface MessageState{
    items : { [messageID:string] : Message }
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
        recievedMessages(state, action:PayloadAction<Array<Message>>){
            const messages = action.payload
            messages.forEach((message)=>{
                state.items[message.id] = message
                state.allIds.push(message.id)
            })
        },
        updateCurrentChatMessage(state, action:PayloadAction<Message>){
            const message = action.payload
            state.items[message.id] = message;
            state.allIds.push(message.id)
        }
    }
})

export const { recievedMessages } = messageSlice.actions
export default messageSlice.reducer;