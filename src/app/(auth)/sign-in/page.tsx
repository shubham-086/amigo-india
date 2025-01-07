"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema } from "@/schemas/authSchema";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      if (response.error === "CredentialsSignin") {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      }
    }
    setIsSubmitting(false);
    if (response?.url) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-[85vh] w-full items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <AnimatedSection slideDirection="down">
              <Card className="shadow-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">Sign In</CardTitle>
                  <CardDescription>
                    Sign in to your account to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="m@example.com"
                                  type="email"
                                  {...field}
                                  onChange={(e) => field.onChange(e)}
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
                              <div className="flex justify-between">
                                <FormLabel>Password</FormLabel>
                                <Link
                                  href="/forgot-password"
                                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                  Forgot your password?
                                </Link>
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="**********"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-1 h-6 w-6 animate-spin" />
                              Please wait...
                            </>
                          ) : (
                            "Signin"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          type="button"
                        >
                          Continue with Google
                        </Button>
                      </div>
                      <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?
                        <Link
                          href="/sign-up"
                          className="underline underline-offset-4"
                        >
                          Sign up
                        </Link>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SignInPage;
