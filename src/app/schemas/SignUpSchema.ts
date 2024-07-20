import { z } from "zod";


export const userNameValidation=z.string().min(2).max(20,"UserName must be maximum 20 character").regex(/^[a-zA-Z0-9_]+$/,"UserName should not be containe Special character")

export const SignUpSchema = z.object({
  username: userNameValidation,
  email:z.string().email({message:"Invalid emal addres"}),
  passwaord:z.string().min(5,{message:"password must be 6 character"}).max(12)
});

