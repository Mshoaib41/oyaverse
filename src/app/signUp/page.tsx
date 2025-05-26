"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@app/features/common/components/atoms/input";
import { Button } from "@app/features/common/components/atoms/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@app/features/common/components/atoms/form";

const signUpSchema = z
  .object({
    name: z.string().nonempty({ message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form Data:", data);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5faff] via-[#d8ecf6] to-[#b3d7e6] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0290BE] mb-2">Sign Up</h1>
          <p className="text-gray-600 text-sm">
            Create your account to start shipping with us.
          </p>
        </div>
        {formSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0DBF91] mb-4">
              Registration Successful!
            </h2>
            <p className="text-gray-600">
              Welcome to our logistics platform. Start managing your deliveries
              now.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0290BE] focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0290BE] focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a password"
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0290BE] focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0290BE] focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold text-white bg-gradient-to-r from-[#0290BE] to-[#0DBF91] rounded-md shadow-md hover:opacity-90 transition"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        )}
        <div className="text-sm text-center mt-4">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#0290BE] font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
