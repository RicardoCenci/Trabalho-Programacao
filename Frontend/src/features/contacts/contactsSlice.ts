import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '@types'

export interface Contact{
    user : UserT
    messages: Array<{
        send_by: string,
        timestamp: number,
        attachment: string | null, 
        message_type : string | null,
        text : string | null
    }>
    unread_messages : number,
    color: {
        background : string,
        textColor: string
    }
}


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

const contactSlice = createSlice({
    name: "message",
    initialState,
    reducers:{
        recievedContacts(state, action:PayloadAction<Array<Contact>>){
            const contacts = action.payload
            contacts.forEach((contact)=>{
                state.items[contact.user.id] = contact
            })
        }
    }
})

export const { recievedContacts } = contactSlice.actions
export default contactSlice.reducer;