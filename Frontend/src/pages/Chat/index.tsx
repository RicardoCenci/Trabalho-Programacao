import { GlobalContext } from '@contexts/GlobalContext'
import { MessageT } from '@types'
import { useCallback, useContext, useLayoutEffect, useRef } from 'react'
import style from './Chat.module.css'
import Input from '@components/Input'
import DOMPurify from 'dompurify';
import ChatMessage from '@components/Messages'
import ContextMenu from '@components/ContextMenu'
import { randomNumberBetween } from '@helpers'
function Chat(props:any){
    const {currentContact,messages,setOpenChat,setMessages } = useContext(GlobalContext)
    const chatView = useRef<HTMLDivElement>(null)
    const input = useRef<HTMLDivElement>(null)

    const closeChat = useCallback((e)=>{
        setOpenChat(false)
    },[setOpenChat])

    const handleSendMessage = useCallback((message : MessageT)=>{
        if (!input.current) {
            return
        }
        setMessages([...messages, message])
        input.current.innerText = ''
    },[setMessages,input,messages])

    const handleInput = useCallback((e)=>{
        const inputValue = getInputValue()
        if (!inputValue || !input.current) {
            return
        }
        const message : MessageT = {
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
        const message : MessageT = {
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
                    <img src={currentContact?.user.photo} alt={`${currentContact?.user.first_name} ${currentContact?.user.last_name}`} />
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
                    {messages.map((message : MessageT)=>{
                        return <ChatMessage key={message.timestamp} message={message} />
                    })}
                </div>
                
                <Input innerRef={input} onKeyDown={handleTyping} onButtonClick={handleInput}/>
            </div>
        </div>
    )
}

export default Chat