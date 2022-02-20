
export interface Contact{
    user : User
    messages: {
        items: Array<Message>,
        allIds: Array<Number>,
        getLastMessage: Function
    },
    unread_messages : number,
    color: {
        background : string,
        text: string
    }
}

export interface ContactStatus{
    user : User,
    last_status: Status,
    status_count : number,
    unseen_status: number
}
export interface Status{
    id : number,
    description: string,
    content: Attachment,
    timestamp: number
}
export interface Message{
    id: number,
    send_by : 'user'|'contact',
    timestamp : number,
    text: string | null,
    attachment : Attachment | null,
    message_type : "Image"|'File'|'Audio'|'Video' | 'Text'
}
export interface Attachment{
    id: number,
    url  : string,
    name : string,
    extension : string,
    size : number,
    timestamp : number
}
export interface User{
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
export interface GlobalContext{
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