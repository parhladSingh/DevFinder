"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  linkedinprofile: z.string().min(2, {
      message: "LinkedIn profile must be in URL format.",
    })
    .regex(/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/, {
      message:
        "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username).",
    }),
  
 
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    linkedinprofile: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Add your sign-up logic here
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("SignUp success");
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  //   try {
  //     setLoading(true);
  //     // Use 'values' instead of 'user' here
  //     const response = await axios.post("/api/users/signup", user);
  //     toast.success("SignUp success");
  //     router.push("/login");
  //   } catch (error: any) {
  //     console.log("SignUp failed", error.message);
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-black dark: bg-grid-white/[0.2]">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-black ">
        <h1 className="text-3xl font-bold mb-6">
          {loading ? "Processing" : "Sign Up"}
        </h1>
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
                      id="username"
                      type="text"
                      value={user.username}
                      onChange={(e) => {
                        setUser({ ...user, username: e.target.value });
                        field.onChange(e); // Sync with react-hook-form
                      }}
                      placeholder="Username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinprofile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input
                      id="linkedinprofile"
                      type="text"
                      value={user.linkedinprofile}
                      onChange={(e) => {
                        setUser({ ...user, linkedinprofile: e.target.value });
                        field.onChange(e); // Sync with react-hook-form
                      }}
                      placeholder="https://www.linkedin.com/in/username"
                    />
                  </FormControl>
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
                    <Input
                      id="email"
                      type="text"
                      value={user.email}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                        field.onChange(e); // Sync with react-hook-form
                      }}
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      value={user.password}
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                        field.onChange(e); // Sync with react-hook-form
                      }}
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
