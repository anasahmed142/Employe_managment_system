"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonLoading } from "@/components/ui/Loading_button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { login } from "@/store/AuthSlice";
import { loginApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import Loading from "./ui/loading";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading , setloading] = useState(false)
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const formSchema = zodSchema.pick({ email: true, password: true });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setloading(true)
        router.replace("/dashboard/employe_dashboard");
      } else {
             setloading(true)
        router.replace("/dashboard/employe_dashboard");
      }
    }
  }, [user, router]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await loginApi(values);
      const loggedInUser = data?.loggedInUser;
      dispatch(
        login({
          user: loggedInUser,
          token: loggedInUser.accessToken,
        })
      );

      toast.success(data.message || "Login successful");
           setloading(true)
      if (loggedInUser.role === "admin") {
        router.push("/dashboard/admin_dashboard");
      } else {
        router.push("/dashboard/employe_dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Invalid credentials");
      } else {
        console.error("Unexpected error", err);
        toast.error("Something went wrong");
      }
    }finally {
  setloading(false); }
}
  

  return (

    <div>
{loading && <Loading/>}
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>

                {/* Email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? "🙈" : "👁️"}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <ButtonLoading
                  type="submit"
                  text="Login"
                  loading={form.formState.isSubmitting}
                />

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          {/* Right side image */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/images/login.jpg"
              alt="Login Image"
              width={1000}
              height={1000}
              quality={100}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
