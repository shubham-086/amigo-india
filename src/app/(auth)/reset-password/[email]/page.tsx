// ResetPasswordPage.js
"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordSchema } from "@/schemas/authSchema";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams<{ email: string }>();
  const email = params.email ? decodeURIComponent(params.email) : "";

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/auth/reset-password", {
        verifyCode: data.code,
        newPassword: data.newPassword,
        email,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push("/");
    } catch (error) {
      console.error("Error: ", error);
      toast({
        title: "Failed!",
        description: "Unable to reset password.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-[85vh] w-full items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <AnimatedSection slideDirection="down">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">
                    Reset Password
                  </CardTitle>
                  <CardDescription>
                    Enter the verification code and your new password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-4">
                        <FormField
                          control={form.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Verification Code</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter code"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter new password"
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
                          className="w-fit mt-3"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-1 h-6 w-6 animate-spin" />{" "}
                              Please wait...
                            </>
                          ) : (
                            "Reset Password"
                          )}
                        </Button>
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

export default ResetPasswordPage;
