'use client'
import { verifySchema } from "@/app/schemas/VerifySchema";
import { ApiResponce } from "@/app/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const page = () => {
  const [isSubmitting, setisSubmitting] = useState(false);

  const router = useRouter();
  const params = useParams<{ userName: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {  
      code: "",
    },
  });

  const Submit = async (data: z.infer<typeof verifySchema>) => {
    setisSubmitting(true);

    try {
      const res = await axios.post(`/api/verify-code`, {
        userName: params.userName,
        code: data.code,
      });
      toast({
        title: "sucess",
        description: res.data.message,
      });
      router.replace("/signIn");
      setisSubmitting(false);
    } catch (err) {
      console.error("Error in SignUp");
      const axiosError = err as AxiosError<ApiResponce>;
      let ErrorMessage =
        axiosError.response?.data.message ?? "Error in checking userName";
      toast({
        title: "signUp Failed",
        description: ErrorMessage,
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md  p-8 space-y-8 b-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extralight tracking-tight lg:text-5xl mb-6">
            Verify Your Code
          </h1>
          <p className="mb-4"> Verify your account send to your email</p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(Submit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
    </div>
  );
};

export default page;
