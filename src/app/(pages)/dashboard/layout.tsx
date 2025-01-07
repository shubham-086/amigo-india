import { AppSidebar } from "@/app/(pages)/dashboard/_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Amigo India - Dashboard",
  description: "Dashboard for Amigo India",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
