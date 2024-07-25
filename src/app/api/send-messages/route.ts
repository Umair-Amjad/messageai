import dbConnect from "@/app/lib/db";
import UserModel from "@/app/model/user";
import {Message} from "@/app/model/user"



export async function POST(request:Request) {
    await dbConnect();
    const {userName,content}=await request.json();
    try{
        const user =await UserModel.findOne(userName)
        if(!user){
            return Response.json(
                { success: false, message: "user not found" },
                { status: 404 }
              );
        }

        //is user accepting messages

        if(!user.isAcceptedmessage){
            return Response.json(
                { success: false, message: "user not accepting messages" },
                { status: 403 }
              );
        }
        const newMessage={content,createdAt:new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json(
            { success: true, message: "message send succesfullt" },
            { status: 200 }
          );
    }catch(err){
    console.error("Error in getting message by users",err);

        return Response.json(
            { success: true, message: "message send succesfullt" },
            { status: 200 }
          );
    }    
}