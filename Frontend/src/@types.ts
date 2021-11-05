import { FunctionComponent, MutableRefObject } from "react";

export interface ContactT{
    user : UserT,
    last_message: {
        send_by: string,
        timestamp: number,
        attachment: string | null, 
        message_type : string | null,
        text : string | null
    },
    unread_messages : number,
    color: {
        background: string,
        text: string
    }
}

export interface StatusT{
    user : number,
    last_status: AttachmentT,
    status_count : number,
    unseen_status: number
}
export interface MessageT{
    id: number,
    send_by : 'user'|'contact',
    timestamp : number,
    text: string | null,
    attachment : AttachmentT | null,
    message_type : "Image"|'File'|'Audio'|'Video' | 'Text'
}
export interface AttachmentT{
    url  : string,
    name : string,
    extension : string,
    size : number
}
export interface UserT{
    id: number,
    first_name:string,
    last_name : string | null,
    photo: string,
}
export interface HttpError{
    getStatus() : number
    getMessage(): string
    getBody() : {
        message : string,
        data : object
    }
    getValidationErrors() : {
        [ key : string] : any
    }
    isValidationError():boolean
}
export interface HttpResponse{
    ok: boolean,
    status : number,
    statusMessage: string,
    path: string,
    headers: object,
    body : {
        [ key: string] : any
    }
}
export interface GlobalContextT{
    [key:string] : any
    // contacts? : Array<ContactT>,
    // user?: UserT,

    // currentContact?: ContactT,
    // setCurrentContact?: Function| null,

    // messages?: Array<MessageT>
    // setMessages?: Function,

    // activePageComponent?: MutableRefObject<FunctionComponent>
    // activeTab: string,
    // setActiveTab?: Function
}