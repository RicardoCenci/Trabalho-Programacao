import contatoStyle from '@styles/Contact.module.css'
import { ContactT } from "@types"
import defaultImage from '@images/default.png'
import { useDate } from '@helpers'

function Contact({contato, ...props } : {contato:ContactT, [key:string]:any}){
    const unreadMessagesString = contato.unread_messages > 1000 ?
                                    '999+' : 
                                    contato.unread_messages.toString()
    const date = useDate(contato.last_message.timestamp);
    return(
        <div {...props} data-unread-messages={unreadMessagesString ?? 0} className={`${contatoStyle.container} ${contato.unread_messages !== 0 ? contatoStyle.unread : ""}`}>
            <img className={contatoStyle.photo} src={defaultImage} alt={`${contato.user.first_name} ${contato.user.last_name}`} />
            <div>
                <p className={contatoStyle.name}>{contato.user.first_name} {contato.user.last_name}</p>
                <p className={contatoStyle.timestamp}>{date}</p>                                                                                                                                                                                                
            </div>
            <div className={contatoStyle.lastMessage}>
                <p className={contatoStyle.text}>{contato.last_message.text}</p>
            </div>
        </div>
    )
}

export default Contact