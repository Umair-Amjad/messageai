"use Client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/app/model/user";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponce } from "@/app/types/ApiResponse";
  
type MessageCardProps={
    message:Message,
    onMessageDelete:(messageId:string)=>void
}
const MessageCard = ({message,onMessageDelete}:MessageCardProps) => {
const {toast}=useToast();

const handleDelete=async ()=>{
    const res=await axios.delete<ApiResponce>(`api/delete-message${message._id}`)
    toast({
        title:res.data.message
    })
    onMessageDelete(message.content)
}

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Show Dialog<X className="w-5 h-5"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
    </>
  );
};

export default MessageCard;
