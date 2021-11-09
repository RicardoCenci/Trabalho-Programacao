import Contact from '@components/ContactListItem'
import { GlobalContext } from '@contexts/GlobalContext'
import { ContactT } from '@types'
import { SyntheticEvent, useCallback, useContext } from 'react'
import photo from '@images/default.png'
import style from './Contact.module.css'
import { randomColor } from '@helpers'
import Chat from '@pages/Chat'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@store'

const contatos : Array<ContactT> = [ 
    {
      user:{
        id: 50,
        first_name:"Teste",
        last_name:"teste2",
        photo: photo
      },
      last_message: {
        send_by: 'user',
        timestamp: new Date().getTime(),
        attachment: null,
        text: 'teste',
        message_type : 'Text'
      },
      unread_messages: 10,
      color : randomColor()
    }
]


function Page(){
  const { setCurrentContact,setOpenChat } = useContext(GlobalContext)
  const dispatch = useAppDispatch();
  const openChat = useCallback((e : SyntheticEvent, contact : ContactT)=>{
    // dispatch()
    setCurrentContact(contact)
    setOpenChat(true)
  },[setCurrentContact,setOpenChat])

    return(<>
        <div className={style.container}>
            {contatos.map((contact)=>{
                return <Contact key={`contact-user-${contact.user.id}`} onClick={(e : SyntheticEvent)=>{openChat(e,contact)}} contato={contact} />
            })}
        </div>
    </>)
}
function ChatPage(){
  const { currentContact,openChat } = useContext(GlobalContext)
  return (<>
      {currentContact && openChat && <motion.div
        initial={{y : '100%'}}
        animate={{ y: 0}}
        transition={{ ease: "easeInOut", duration: .2 }}
        exit={{x:'100%'}}
        className={style.chatContainer}
      >
        <Chat currentContact={currentContact}/>
      </motion.div>}
    </>)
}
export default Page