"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import {
  AlignJustify,
  ArrowRight,
  Blocks,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Loader from "./Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { AvatarFallback } from "./ui/avatar";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  const user = session?.user as User;

  function stringToColor(string: any) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 60%, 70%)`;
    return color;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="pl-5 flex items-center justify-between h-[70px]">
        <div className="flex items-center">
          <Image
            src="/amigo-india.png"
            alt="Amigo India"
            height={100}
            width={115}
          />
        </div>
        <div className="hidden md:flex gap-5">
          <Link
            href="/"
            className={`text-gray-600 font-medium hover:text-primary transition ${
              pathname === "/"
                ? "text-primary underline underline-offset-4"
                : ""
            }`}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className={`text-gray-600 font-medium hover:text-primary transition ${
              pathname === "/about"
                ? "text-primary underline underline-offset-4"
                : ""
            }`}
          >
            ABOUT
          </Link>
          <Link
            href="/courses"
            className={`text-gray-600 font-medium hover:text-primary transition ${
              pathname === "/courses"
                ? "text-primary underline underline-offset-4"
                : ""
            }`}
          >
            COURSES
          </Link>
          <Link
            href="/gallery"
            className={`text-gray-600 font-medium hover:text-primary transition ${
              pathname === "/gallery"
                ? "text-primary underline underline-offset-4"
                : ""
            }`}
          >
            GALLERY
          </Link>
          <Link
            href="/contact"
            className={`text-gray-600 font-medium hover:text-primary transition ${
              pathname === "/contact"
                ? "text-primary underline underline-offset-4"
                : ""
            }`}
          >
            CONTACT
          </Link>
        </div>

        {session !== null ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hidden md:flex items-center gap-2 cursor-pointer mr-5">
                <div className="hidden lg:grid flex-1 text-right text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback
                    className="rounded-lg text-lg"
                    style={{
                      backgroundColor: stringToColor(user?.name || "U"),
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] rounded-lg"
              side="bottom"
              align="end"
              sideOffset={12}
            >
              <DropdownMenuGroup>
                <Link href="#">
                  <DropdownMenuItem>
                    <CircleUserRound />
                    My Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard">
                  <DropdownMenuItem>
                    <Blocks />
                    Dashboard
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/sign-in"
            className="hidden md:flex items-center gap-2 bg-primary text-white px-8 h-full font-medium text-lg hover:bg-secondary transition"
          >
            Login <ArrowRight />
          </Link>
        )}

        <Sheet>
          <SheetTrigger asChild className="md:hidden flex mr-5">
            <Button variant="outline" size="icon">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex-row gap-3 space-y-1 text-left">
              {session !== null ? (
                <>
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback
                      className="rounded-lg text-lg"
                      style={{
                        backgroundColor: stringToColor(user?.name || "U"),
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{user.name}</SheetTitle>
                    <SheetDescription>{user.email}</SheetDescription>
                  </div>
                </>
              ) : (
                <SheetHeader>
                  <SheetTitle className="text-gray-800">Amigo India</SheetTitle>
                </SheetHeader>
              )}
            </SheetHeader>
            <div className="grid gap-2 py-5 mt-2">
              <Link
                href="/"
                className={`block text-gray-600 hover:bg-gray-100 py-2 px-3 ${
                  pathname === "/" ? "text-primary bg-gray-100" : ""
                }`}
              >
                HOME
              </Link>
              <Link
                href="/about"
                className={`block text-gray-600 hover:bg-gray-100 py-2 px-3 ${
                  pathname === "/about" ? "text-primary bg-gray-100" : ""
                }`}
              >
                ABOUT
              </Link>
              <Link
                href="/courses"
                className={`block text-gray-600 hover:bg-gray-100 py-2 px-3 ${
                  pathname === "/courses" ? "text-primary bg-gray-100" : ""
                }`}
              >
                {" "}
                COURSES
              </Link>
              <Link
                href="/gallery"
                className={`block text-gray-600 hover:bg-gray-100 py-2 px-3 ${
                  pathname === "/gallery" ? "text-primary bg-gray-100" : ""
                }`}
              >
                GALLERY
              </Link>
              <Link
                href="/contact"
                className={`block text-gray-600 hover:bg-gray-100 py-2 px-3 ${
                  pathname === "/contact" ? "text-primary bg-gray-100" : ""
                }`}
              >
                CONTACT
              </Link>
            </div>
            <SheetFooter className="">
              <Link
                href="/sign-up"
                className="w-full flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-sm font-medium hover:bg-secondary transition"
              >
                {session?.user ? "DASHBOARD" : "LOGIN"}
                <ArrowRight className="w-4" />
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
