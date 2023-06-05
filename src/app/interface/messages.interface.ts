export interface Usermessages{
messages:[Message]
}

export interface Message{

  message:string,
   from:string,
   to:string,
   viewed?:boolean,
   createdAt?:Date
}
