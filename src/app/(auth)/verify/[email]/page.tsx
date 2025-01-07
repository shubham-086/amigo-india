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
import { verifyCodeSchema } from "@/schemas/authSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifyCodePage = () => {
  const router = useRouter();
  const params = useParams<{ email: string }>();
  params.email = params.email ? decodeURIComponent(params.email) : "";
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    try {
      setIsSubmitting(true);

      if (!params.email) {
        throw new Error("Email is required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(params.email)) {
        throw new Error("Invalid email format");
      }

      const response = await axios.post("/api/auth/verify-code", {
        email: params.email,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      setIsSubmitting(false);
      router.replace("/sign-in");
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error in signup: ", error);
      const axiorError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed!",
        description:
          axiorError.response?.data.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <AnimatedSection slideDirection="down">
            <Card className="shadow-md">
              <CardHeader className="">
                <CardTitle className="text-2xl mb-2">
                  Verify Your Account
                </CardTitle>
                <CardDescription className="">
                  Enter the verification code sent to your email.
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
                            <FormLabel>Verification code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter code"
                                type="number"
                                minLength={6}
                                maxLength={6}
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
                          "Verify"
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
  );
};

export default VerifyCodePage;
