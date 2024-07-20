import {z} from "zod";


export const acceptedMessageSchema=z.object({
    acceptMessages:z.boolean()
})