import dbConnect from "@/app/lib/db";
import UserModel from "@/app/model/user";
import { z } from "zod";
import { userNameValidation } from "@/app/schemas/SignUpSchema";

const userNameQuerrySchema = z.object({
  userName: userNameValidation,
});

export async function GET(request: Request) {

  if(request.method !== 'GET'){
    return Response.json(
      {
        success: false,
        message: "Only GET method Allow",
      },
      { status: 400 }
    );
  }
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url); //getting url

    const querryPrams = {
      userName: searchParams.get("userName"),
    };

    // validate with zod
    const result = userNameQuerrySchema.safeParse(querryPrams);

    // console.log(result)
    if (!result.success) {
      const userNameError = result.error.format().userName?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            userNameError?.length > 0
              ? userNameError.join(", ")
              : "invalid querry parameters ",
        },
        { status: 400 }
      );
    }

    const { userName } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    // console.log(
    //   searchParams,
    //   querryPrams,
    //   result,
    //   userName,
    //   existingVerifiedUser
    // );

    if (existingVerifiedUser ) {
      return Response.json(
        {
          success: false,
          message: "UserName is already Taken",
        },
        { status: 201 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "UserName is Available",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("checking UserName Error", err);
    return Response.json(
      {
        success: false,
        message: "Error checking UserName",
      },
      { status: 500 }
    );
  }
}
