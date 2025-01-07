"use client";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="lg:container mx-auto px-4 lg:px-32 py-10">
          <div className="text-center mb-16">
            <div className="mb-4">
              <div className="bg-primary h-[2px] w-60 flex mx-auto -mb-3"></div>
              <h3 className="text-xl font-semibold text-primary bg-white inline-block px-5 uppercase">
                Contact
              </h3>
              <div className="bg-primary h-[2px] w-80 flex mx-auto -mt-2"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Get in Touch With Us
            </h2>
          </div>
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <h3 className="text-xl">Contact Information</h3>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary p-3">
                        <MapPin size={24} color="white" />
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-semibold">Address</h3>
                        <p className="text-gray-700">
                          C-187, 2nd Floor, Sector 18 Road, Indira Nagar,
                          Lucknow - 226016 (Indira Nagar Metro Station)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary p-3">
                        <Phone size={24} color="white" />
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="text-gray-700">+91 6393506500</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary p-3">
                        <Mail size={24} color="white" />
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-gray-700">info@amigoindia.in</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xl text-gray-800 mb-4">Follow Us</h4>
                    <div className="flex space-x-6">
                      <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-600 hover:text-blue-800 transition-all duration-300"
                      >
                        <Facebook />
                      </Link>
                      <Link
                        href="https://www.instagram.com/amigoindialucknow/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-pink-600 hover:text-pink-800 transition-all duration-300"
                      >
                        <Instagram />
                      </Link>
                      <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-700 hover:text-blue-900 transition-all duration-300"
                      >
                        <Linkedin />
                      </Link>
                      <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-red-600 hover:text-red-700 transition-all duration-300"
                      >
                        <Youtube />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <h3 className="text-xl">Send Us a Message</h3>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-4">
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
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter subject"
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
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter your message here..."
                                  {...field}
                                  onChange={(e) => field.onChange(e)}
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
                              <Loader2 className="mr-1 h-6 w-6 animate-spin" />{" "}
                              Please wait...
                            </>
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
          <AnimatedSection className="mt-10">
            <Card className="shadow-lg">
              <CardHeader>
                <h3 className="text-xl">Find Us on the Map</h3>
              </CardHeader>
              <CardContent>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.9258304925684!2d80.98580487514357!3d26.87409746174952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be32185e60fb3%3A0x1b7ecfdf0e2062aa!2sAmigo%20India%20Lucknow!5e0!3m2!1sen!2sin!4v1735889122547!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
