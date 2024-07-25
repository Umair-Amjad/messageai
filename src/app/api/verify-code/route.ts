import dbConnect from "@/app/lib/db";
import UserModel from "@/app/model/user";

export async function GEET(request:Request) {
    await dbConnect()


    const users=await UserModel.find({}).exec()
    console.log(users)
}

export async function POST(request: Request) {
    await dbConnect()
  try {
    const { userName, code } = await request.json();
    console.log(userName,code)
    const decodeUserName = decodeURIComponent(userName);
    

    const user = await UserModel.findOne({ userName: decodeUserName });
    console.log(user)

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not founds",
        },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifycodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account Verified successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
        return Response.json(
            {
              success: false,
              message: "Error Verifying Code Expired ",
            },
            { status: 401 }
          );
    }else{
        return Response.json(
            {
              success: false,
              message: "Code incorrect",
            },
            { status: 400 }
          );
    }
  } catch (error) {
    console.log("Error Verifying Code");
    return Response.json(
      {
        success: false,
        message: "Error Verifying Code",
      },
      { status: 500 }
    );
  }
}
