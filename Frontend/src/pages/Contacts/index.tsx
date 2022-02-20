import Contact from '@components/ContactListItem'
import { GlobalContext } from '@contexts/GlobalContext'
import { Contact as ContactInterface } from '@types'
import { SyntheticEvent, useCallback, useContext, useEffect } from 'react'
import style from './Contact.module.css'
import { entries, getCookie, isEmpty } from '@helpers'
import Chat from '@pages/Chat'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@store'
import { recievedPage } from '@features/global/globalSlice'
import { useAppSelector } from '@hooks'
import { getApi, recievedAPI } from '@features/api/apiSlice';
import createAPI, { createToken } from '@helpers/APIInterface'
import { recievedContacts } from '@features/contacts/contactsSlice'

function Page(){
  const { setCurrentContact,setOpenChat } = useContext(GlobalContext)
  const dispatch = useAppDispatch();
  const api = useAppSelector(getApi)

  const contatos = useAppSelector(state => state.contacts.items)


  useEffect(()=>{
    // async function setAPI(){
    //   const token = createToken(getCookie('access_token'));
      
    //   const API = await createAPI(token);

    //   dispatch(recievedAPI(API))

    //   return API;
    // }
    // if (isEmpty(api)) {
    //   setAPI()
    // }
  },[dispatch, api])



  useEffect(()=>{
    if(isEmpty(api)){
      return
    }
    async function getData(){
      const response = await api.get('/my/contacts');
      dispatch(recievedContacts(response.body))
    }

    if (isEmpty(contatos)) {
      getData()
    }

  },[api, contatos, dispatch])



  const openChat = useCallback((e : SyntheticEvent, contact : ContactInterface)=>{
    dispatch(recievedPage(<ChatPage/>))
    // Make the request to get the user messsages
    setCurrentContact(contact)
    setOpenChat(true)
  },[setCurrentContact,setOpenChat, dispatch])

    return(<>
        <div className={style.container}>
            {entries(contatos).map(([id, contact])=>{
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