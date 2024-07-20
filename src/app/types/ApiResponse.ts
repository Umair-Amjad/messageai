import { Message } from "../model/user";
export interface  ApiResponce{
    success:boolean;
    message:string;
    isAcceptedMessage:boolean
    messages?:Array<Message>
}