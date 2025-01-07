"use client";

import * as React from "react";
import {
  Brain,
  MonitorCog,
  ClipboardList,
  MonitorPlay,
  Blocks,
} from "lucide-react";

import { NavMain } from "@/app/(pages)/dashboard/_components/nav-main";
import { NavUser } from "@/app/(pages)/dashboard/_components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import Image from "next/image";
import Loader from "@/components/Loader";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Blocks,
    },
    {
      title: "Courses",
      url: "#",
      icon: MonitorPlay,
      // isActive: true,
      items: [
        {
          title: "My courses",
          url: "#",
        },
        {
          title: "Explore",
          url: "/dashboard/courses",
        },
      ],
    },
    {
      title: "Learn & Practice",
      url: "#",
      icon: Brain,
      items: [
        {
          title: "Take Quiz",
          url: "/dashboard/quiz",
        },
        {
          title: "Practice Questions",
          url: "#",
        },
      ],
    },
    {
      title: "Interview Prepration",
      url: "#",
      icon: ClipboardList,
    },
    {
      title: "Code Compilor",
      url: "#",
      icon: MonitorCog,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader />
      </div>
    );
  }
  const user = session?.user as User;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/"
                className="flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <Image
                  src="/logo.png"
                  alt="Amigo India Logo"
                  width={50}
                  height={50}
                />

                <div className="grid flex-1 text-left text-sm leading-none">
                  <span className="truncate font-bold">Amigo India</span>
                  <span className="truncate text-xs">Learning Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
