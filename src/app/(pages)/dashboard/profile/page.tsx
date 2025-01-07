"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import { UserData, userSchema } from "@/schemas/userSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Profile: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      image: "",
      institute: "",
      email: "",
    },
  });

  // Fetch profile data
  useEffect(() => {
    if (status === "loading") return;
    const fetchProfile = async () => {
      try {
        const { data } = await axios.post<ApiResponse>("/api/user", {
          email: session?.user.email,
        });
        console.log(data.data);
        setUser(data.data as UserData);
        form.reset(data.data as UserData);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.error("Error fetching profile:", axiosError);
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed to fetch profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [form, status, toast, session?.user.email]);

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("instituteName", data.institute);
      formData.append("email", session?.user.email || "");

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await axios.put<ApiResponse>(
        "/api/user/update",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser(response.data.data);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error updating profile:", axiosError);
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 md:px-10 my-10">
        <Skeleton className="h-10 w-40 mb-4" />
        <Skeleton className="h-20 w-20 rounded-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src={user?.image || "/blank-user.png"} alt="@user" />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              College Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.institute}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your name"
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
                      name="institute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institute Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter intitute name"
                              type="text"
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
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Photo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files && files[0]) {
                                  field.onChange(files);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="inline-flex w-fit ml-auto mt-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-1 h-6 w-6 animate-spin" />{" "}
                          Please wait...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
