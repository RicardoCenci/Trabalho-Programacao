import { randomColor } from '@helpers'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store'
import { Contact, Message } from '@types'




export interface ContactsState{
    items : {
        [contactID : number] : Contact
    },
    allIds: Array<number>
}

const initialState : ContactsState = {
    items: {},
    allIds: []
}
const getLast = function(this: { items: Array<number>}){
    const keys = Object.keys(this.items) as unknown as Array<number>
    const index = Math.max(...keys);
    return this.items[index]
}
const contactSlice = createSlice({
    name: "message",
    initialState,
    reducers:{
        recievedContacts(state, action:PayloadAction<Array<Contact>>){
            const contacts = action.payload
            contacts.forEach((contact)=>{
                contact.messages.getLastMessage = getLast
                state.items[contact.user.id] = contact
                state.items[contact.user.id].color = randomColor()
                state.allIds.push(contact.user.id);
            })
        },
        recievedContactMessages(state, action:PayloadAction<{contact_id: number, messages: Array<Message>}>){
            const messages = action.payload.messages
            const contact_id = action.payload.contact_id
            messages.forEach((message)=>{
                state.items[contact_id].messages.items[message.id] = message
                state.items[contact_id].messages.allIds.push(message.id)
                state.items[contact_id].messages.getLastMessage = getLast
            })
        },
        recievedMessageFromUser(state, action:PayloadAction<any>){
            const message = action.payload.message;
            const sender = action.payload.sender
            state.items[sender.id].messages.items[message.id] = message
            state.items[sender.id].messages.allIds.push(message.id)
        },
        updateContactLastMessage(state, action:PayloadAction<Array<any>>){
            // const [contact_id, lastMessage] = action.payload
            // state.items[contact_id].last_message = lastMessage
        },

        // recievedMessages(state, action:PayloadAction<Array<Message>>){
        //     const messages = action.payload
        //     messages.forEach((message)=>{
        //         state.items[message.id] = message
        //         state.allIds.push(message.id)
        //     })
        // },

        // updateCurrentChatMessage(state, action:PayloadAction<Message>){
        //     const message = action.payload
        //     state.messages.items[message.id] = message;
        //     state.messages.allIds.push(message.id)
        // }
    }
})

export const getContactMessages = (id : number)=>{
    return createSelector(
        (state : RootState) => state.contacts.items,
        (contacts) : Array<Message> => {
            return contacts[id].messages.items
        }
    
    )
}
export const { recievedContacts, updateContactLastMessage, recievedMessageFromUser, recievedContactMessages } = contactSlice.actions
export default contactSlice.reducer;