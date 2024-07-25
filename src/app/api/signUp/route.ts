import dbConnect from "@/app/lib/db";
import UserModel from "@/app/model/user";
import bcrypt from "bcryptjs";
import { sendEmailVerification } from "@/app/helper/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userName, email, password } = await request.json();
    const existinguserVerifiedByUserName = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    // console.log( userName, email, password,"hello",existinguserVerifiedByUserName)

    if (existinguserVerifiedByUserName) {
      return Response.json(
        {
          success: false,
          message: "User Already exist",
        },
        { status: 400 }
      );
    }


    const existingUserByEmail = await UserModel.findOne({ email:email });
    console.log(existingUserByEmail)
    const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "user Already Exist",
          },
          { status: 400 }
        );
      }else{
        const hasePassword=await bcrypt.hash(password,10)
        existingUserByEmail.password=hasePassword;
        existingUserByEmail.verifyCode=verifyCode;
        existingUserByEmail.verifycodeExpiry=new Date(Date.now()*3600000)
        await existingUserByEmail.save()
      }
    } else {
      const hasePassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        userName,
        email,
        password: hasePassword,
        verifyCode,
        verifycodeExpiry: expiryDate,
        isVerified: false,
        isAcceptedmessage: true,
        messages: [],
      });
      await newUser.save();

      // send Email
    }
    const emailResponce = await sendEmailVerification(
      email,
      userName,
      verifyCode
    );

    if (!emailResponce.success) {
      return Response.json(
        {
          success: false,
          message: emailResponce.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: emailResponce.message,
      },
      { status: 200 }
    );
  

  } catch (error) {
    console.error("Error Registering", error);
    return Response.json(
      { success: false, message: "error registery user" },
      { status: 500 }
    );
  }
}
