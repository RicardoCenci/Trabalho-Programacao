import { GlobalContext } from '@contexts/GlobalContext'
import { useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import style from './Chat.module.css'
import Input from '@components/Input'
import DOMPurify from 'dompurify';
import ChatMessage from '@components/Messages'
import ContextMenu from '@components/ContextMenu'
import { entries, randomNumberBetween } from '@helpers'
import { recievedPage } from '@features/global/globalSlice'
import { useAppDispatch } from '@store'
import { useAppSelector } from '@hooks'
import { getApi } from '@features/api/apiSlice'
import defaultImage from '@images/default.png'
import { recievedContactMessages, getContactMessages, recievedMessageFromUser } from '@features/contacts/contactsSlice'
import { Message as MessageInterface } from '@types';


function Chat(props:any){

    const {currentContact,setOpenChat } = useContext(GlobalContext)
    
    const chatView = useRef<HTMLDivElement>(null)
    const input = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();

    const api = useAppSelector(getApi)

    const messages = useAppSelector(getContactMessages(currentContact.user.id))
    
    useEffect(()=>{
        async function getData(){
            const id = currentContact.user.id;
            const response = await api.get(`/contacts/${id}/messages`)
            dispatch(recievedContactMessages({contact_id: id, messages: response.body}))
        }
        getData();
        /* eslint-disable  react-hooks/exhaustive-deps*/
    },[])


    const closeChat = useCallback((e)=>{
        console.log('test');
        setOpenChat(false)
        dispatch(recievedPage(null))
    },[setOpenChat])

    const handleSendMessage = useCallback((message : MessageInterface)=>{
        if (!input.current) {
            return
        }
        async function sendMessage(){
            const id = currentContact.user.id;
            const body = message
            const response = await api.post(`/contacts/${id}/send`, body)
            if (response.ok) {
                dispatch(recievedMessageFromUser(response.body))
                return
            }
            console.error(response)
        }

        sendMessage()
        input.current.innerText = ''
        /* eslint-disable  react-hooks/exhaustive-deps*/
    // },[setMessages,input,messages])
    },[input])

    const handleInput = useCallback((e)=>{
        const inputValue = getInputValue()
        if (!inputValue || !input.current) {
            return
        }
        const message : MessageInterface = {
            id: randomNumberBetween(0,1000) ,
            send_by : "user",
            attachment : null,
            message_type : "Text",
            text: inputValue,
            timestamp: new Date().getTime() / 1000,
        }
        handleSendMessage(message)
    },[handleSendMessage])

    const getInputValue = ()=>{
        if(!input.current){
            return null
        }
        const innerText = DOMPurify.sanitize(input.current.innerText, {ALLOWED_TAGS: ['</br>']}).trim()
        if (!innerText) {
            return null
        }
        return innerText
    }

    

    const handleTyping = useCallback((e : KeyboardEvent)=>{
        if(!input.current || e.code !== 'Enter'){
            return
        }

        e.preventDefault()
        if(e.code === 'Enter' && e.ctrlKey){
            input.current.innerText += '\n\n'
            setTextCursorAtEnd(input.current)
            if (input.current.parentElement) {
                input.current.parentElement.scrollTo(0, input.current.scrollHeight)
            }
            return
        }
        const inputValue = getInputValue()
        if (!inputValue) {
            return
        }
        const message : MessageInterface = {
            id: randomNumberBetween(0,1000),
            send_by : "user",
            attachment : null,
            message_type : "Text",
            text: inputValue,
            timestamp: new Date().getTime() / 1000,
        }
        handleSendMessage(message)
    },[handleSendMessage])

    useLayoutEffect(()=>{
        if (chatView?.current) {
            chatView.current.scrollTo({top: chatView.current.scrollHeight, behavior: 'smooth'})
        }
    },[messages])

    const setTextCursorAtEnd = (contentEditableElement : any)=>{
            if(document.createRange){
                const range = document.createRange();
                range.selectNodeContents(contentEditableElement);
                range.collapse(false);
                const selection = window.getSelection();
                if (!selection) {
                    return
                }
                selection.removeAllRanges();
                selection.addRange(range);
            }
    }

    const handleContextMenu = useCallback((e)=>{
        alert(e)
    },[])
    return(
        <div className={style.container}>
            <div className={style.header} style={{backgroundColor:currentContact.color.background, color: currentContact.color.text}}>
                <span className={`icon-arrow ${style.backIcon}`} onClick={closeChat}></span>
                <div className={style.photo}>
                    <img src={currentContact?.user.photo ?? defaultImage} alt={`${currentContact?.user.first_name} ${currentContact?.user.last_name}`} />
                </div>
                <div className={style.title}>
                    <p>{`${currentContact?.user.first_name} ${currentContact?.user.last_name}`}</p>
                    <p>{`${currentContact?.user.first_name}`}</p>
                </div>
                <ContextMenu icon={'menu'} className={style.contextIcon} itens={[
                    {text : "teste1"},
                    {text : "teste2"},
                ]} defaultAction={handleContextMenu}/>
            </div>
            <div className={style.content}>
                <div className={style.chatView} ref={chatView}>
                    {entries(messages).map(([index, message]) => <ChatMessage key={message.timestamp} message={message} />)}
                </div>
                
                <Input innerRef={input} onKeyDown={handleTyping} onButtonClick={handleInput}/>
            </div>
        </div>
    )
}

export default Chat
