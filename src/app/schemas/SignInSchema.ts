import {z} from "zod";


export const signInSchema=z.object({
    Identifier:z.string(),
    password:z.string()
})