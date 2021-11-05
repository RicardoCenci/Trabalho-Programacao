import Contact from '@components/ContactListItem'
import { GlobalContext } from '@contexts/GlobalContext'
import { ContactT } from '@types'
import { SyntheticEvent, useCallback, useContext } from 'react'
import photo from '@images/default.png'
import style from './Contact.module.css'
import { randomColor } from '@helpers'

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
  const openChat = useCallback((e : SyntheticEvent, contact : ContactT)=>{
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
export default Page