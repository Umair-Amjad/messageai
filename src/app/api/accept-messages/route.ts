import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/app/lib/db";
import UserModel from "@/app/model/user";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || session.user) {
    return Response.json(
      { success: false, message: "not Authenticated" },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptedmessage: acceptMessages },
      { new: true }
    );

    if (!updateUser) {
      return Response.json(
        { success: false, message: "failed to update user accept messages" },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "message acceptance status Updated",
        updateUser,
      },
      { status: 401 }
    );
  } catch (err) {
    console.error("failed to accept messges ");
    return Response.json(
      { success: false, message: "failed to accept messges" },
      { status: 401 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || session.user) {
    return Response.json(
      { success: false, message: "not Authenticated" },
      { status: 401 }
    );
  }
  const userId = user._id;

  try {
    const UserById = await UserModel.findById(userId);
    if (!UserById) {
      return Response.json(
        { success: false, message: "Failed to foound the User" },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, isAcceptingMessage: UserById.isAcceptedmessage },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error in getting message accepting status");
    return Response.json(
      { success: false, message: "Error in getting message accepting status" },
      { status: 500 }
    );
  }
}
