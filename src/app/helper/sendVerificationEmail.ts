import { resend } from "@/app/lib/resend";
import verificationEmail from "../../../email/verificationEmail";
import { ApiResponce } from "../types/ApiResponse";

export async function sendEmailVerification(
  email: string,
  userName: string,
  verifyCode: string
): Promise<ApiResponce> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code",
      react: verificationEmail({userName,verificationCode:verifyCode}),
    });
    return {
      success: true,
      isAcceptedMessage: false,
      message: "verification Email send successfully",
    };
  } catch (error) {
    console.log("Error sending verification Email", error);
    return {
      success: false,
      isAcceptedMessage: false,
      message: "Failed sending verification Email",
    };
  }
}
