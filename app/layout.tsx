import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " Employe Manegment System",
  description: "employe manegment system in Next.js",
  icons: {
    icon: "/assets/media/favicons/favicon.png",
    shortcut: "/assets/media/favicons/favicon.png",
    apple: "/assets/media/favicons/apple-touch-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        {/* FontAwesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
          crossOrigin="anonymous"
        />


      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <Toaster position="top-right" closeButton duration={1000} />
        </ReduxProvider>
      </body>
    </html>
  );
}
