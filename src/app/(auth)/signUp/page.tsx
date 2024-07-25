"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { SignUpSchema } from "@/app/schemas/SignUpSchema";
import { ApiResponce } from "@/app/types/ApiResponse";
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
const page = () => {
  const [userName, setUserName] = useState("");

  const [userNameMessage, setuserNameMessage] = useState("");
  const [ischekinguserName, setischekinguserName] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const debouced = useDebounceCallback(setUserName, 400);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (userName) {
        setischekinguserName(true);
        setuserNameMessage("");
        try {
          const res = await axios.get(
            `api/check-username-unique?userName=${userName}`
          );
          let message = res.data.message;
          console.log(message);
          setuserNameMessage(message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponce>;
          setuserNameMessage(
            axiosError.response?.data.message ?? "Error in checking userName"
          );
        } finally {
          setischekinguserName(false);
        }
      }
    };
    checkUserNameUnique();
  }, [userName]);

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    // console.log(data);

    setisSubmitting(true);
    try {
      const res = await axios.post<ApiResponce>(`/api/signUp`, data);
      toast({
        title: "Success",
        description: res.data.message,
      });
      router.replace(`/verify/${userName}`);
    } catch (err) {
      console.error("Error in SignUp");
      const axiosError = err as AxiosError<ApiResponce>;
      let ErrorMessage =
        axiosError.response?.data.message ?? "Error in checking userName";
      toast({
        title: "signUp Failed",
        description: ErrorMessage,
        variant: "destructive",
      });
      setisSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md  p-8 space-y-8 b-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extralight tracking-tight lg:text-5xl mb-6">
            JOIN MYSTRY MESSAGE
          </h1>
          <p className="mb-4"> SignUp to Start Adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {ischekinguserName && (
                    <Loader2 className="mt-1 animate-spin" />
                  )}
                  <p
                    className={`text-sm ${
                      userNameMessage === "UserName is Available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    test {userNameMessage}
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                "signUp"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
