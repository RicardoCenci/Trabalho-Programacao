import React, { useRef, useState } from "react"
import { GlobalContextT, UserT,ContactT} from "@types"
import { randomColor, randomNumberBetween } from "@helpers"
export const GlobalContext = React.createContext<GlobalContextT>({})

export function GlobalContextProvider(props : any){

    const [user, setUser] = useState<UserT | null>(null);
    const [activeTab, setActiveTab] = useState('status')
    const activePageComponent = useRef(null)
    const [currentContact, setCurrentContact] = useState(null)
    const [openChat, setOpenChat] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: randomNumberBetween(0,1000),
            send_by : 'user',
            timestamp : new Date().getTime() /1000,
            text: 'teste',
            attachment : null,
            message_type : 'Text'
        },
        {
            id: randomNumberBetween(0,1000),
            send_by : 'contact',
            timestamp : new Date().getTime() /1000,
            text: 'teste',
            attachment : null,
            message_type : 'Text'
        }
    ])
    const contacts: Array<ContactT> = [
        {
            user : {
                id:5,
                first_name:"Teste",
                last_name:"teste",
                photo:'/teste'
            },
            last_message: {
                send_by: 'User',
                timestamp: new Date().getTime(), // hoje
                attachment: '/Teste', 
                message_type: '/Teste', 
                text : 'Alo gay'
            },
            unread_messages : 5,
            color: randomColor()
        }
    ]

    return(
        <GlobalContext.Provider value={{
            user,
            setUser,
            contacts,
            currentContact,setCurrentContact,
            openChat, setOpenChat,
            activeTab, setActiveTab, activePageComponent,
            messages,setMessages
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}