"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/app/schemas/SignInSchema";
import { signIn } from "next-auth/react";
const SignIn = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      Identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // console.log(data);

    setisSubmitting(true);
   const res=await signIn('credentials',{
    identifier:data.Identifier,
    password:data.password
   })
   if(res?.error){
    toast({
        title:'Login Failed',
        description:'Incorrect Username or Password',
        variant:'destructive'
    })
   }
   if (res?.url) {
    router.replace('/dashboard')
   }
  };
  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md  p-8 space-y-8 b-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extralight tracking-tight lg:text-5xl mb-6">
            JOIN MYSTRY MESSAGE
          </h1>
          <p className="mb-4"> SignIn to Start Adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           
            <FormField
              control={form.control}
              name="Identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please
                  wait...
                </>
              ) : (
                "SignIn"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
    </>
  );
};

export default SignIn;
