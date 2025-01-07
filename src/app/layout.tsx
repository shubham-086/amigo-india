import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import GlobalContextProvider from "@/context/GlobalContext";

const notoSans = localFont({
  src: "./font/NotoSans.woff2",
});

export const metadata: Metadata = {
  title: "Amigo India",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <GlobalContextProvider>
          <body className={notoSans.className}>
            {children} <Toaster />
          </body>
        </GlobalContextProvider>
      </AuthProvider>
    </html>
  );
}
