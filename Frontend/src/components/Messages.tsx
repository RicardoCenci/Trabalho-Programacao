import React, { FunctionComponent } from 'react'
import style from '@styles/Messages.module.css'
import { Message } from "@types"
import Moment from 'react-moment';
import { useSizeTranslator } from '@helpers';


function Text(props : any){
    const message : Message = props.message

    return(
        <div className={`${style.typeText} ${style.message}`}>
            <span className={style.text} >{message.text}</span>
            <span className={style.time}><Moment unix local format="HH:mm">{message.timestamp}</Moment></span>
        </div>
    )
}

function File(props : any){
    const message : Message = props.message
    const size = useSizeTranslator(message.attachment?.size)
    return(
        <div className={`${style.typeFile} ${style.message}`}>
            <div className={style.infoContainer}>
                <span className='icon-file'></span>
                <div className={style.info}>
                    <p className={style.name}>{message.attachment?.name}</p>
                    <p className={style.sizeAndExtension}>{size} - {message.attachment?.extension.toUpperCase()}</p>
                </div>
            </div>
            <span className={style.time}><Moment unix local format="HH:mm">{message.timestamp}</Moment></span>
        </div>
    )
}

function Audio(props : any){
    const message : Message = props.message

    return(
        <div className={`${style.typeAudio} ${style.message}`}>
            <div className={style.info}>
                <span className='icon-mic'></span>
                <span className={style.duration}>12:20</span>
            </div>
            <div className={style.timelineContainer}>
                <div className={style.timeline}></div>
                <div className={style.currentLocation}></div>
                <span className={style.time}><Moment unix local format="HH:mm">{message.timestamp}</Moment></span>
            </div>
        </div> 
    )
}

function Image(props : any){
    const message : Message = props.message
    return(
        <div className={`${style.typeImage} ${style.message}`}>
            <img src={message.attachment!.url} title={message.attachment!.name} className={style.image} alt=""/>
            <div className={style.info}>
                <span className={style.text} >{message.text}</span>
                <span className={style.time}><Moment unix local format="HH:mm">{message.timestamp}</Moment></span>
            </div>
        </div>
    )
}

function Video(){
    return(
        <p>Video</p>
    )
}
type MessageTypesT = {
    [key: string]: FunctionComponent
}
const MessagesTypes : MessageTypesT = {
    'Text'    : Text,
    'Image'   : Image,
    'Video'   : Video,
    'Audio'   : Audio,
    'File'    : File
} 
function ChatMessage(props : any){
    const message : Message = props.message
    
    return(
        <div className={`${style.container} ${message.send_by === 'user' ? style.sendByUser : style.sendByContact}`}>
            {React.createElement(MessagesTypes[message.message_type],props)}
        </div>
    )
}
export default ChatMessage