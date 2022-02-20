import React, { useRef, useState } from "react"
import { GlobalContext as GlobalContextInterface, User,Contact} from "@types"
import { randomColor, useEvent } from "@helpers"
import { useDispatch } from "react-redux";
import { recievedMessageFromUser } from "@features/contacts/contactsSlice";
export const GlobalContext = React.createContext<GlobalContextInterface>({})

export function GlobalContextProvider(props : any){

    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState('status')
    const activePageComponent = useRef(null)
    const [currentContact, setCurrentContact] = useState(null)
    const [openChat, setOpenChat] = useState(false)
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch();

    useEvent((e : any)=>{
        dispatch(recievedMessageFromUser(e))
    },'Message')

    return(
        <GlobalContext.Provider value={{
            user,
            setUser,
            currentContact,setCurrentContact,
            openChat, setOpenChat,
            activeTab, setActiveTab, activePageComponent,
            messages,setMessages
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}