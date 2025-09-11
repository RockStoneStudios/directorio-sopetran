import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNav from "@/components/nav/top-nav";
import { ThemeProvider } from "../context/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { BusinessProvider } from "@/context/business";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Directorio Sopetran",
  description: "Directorio para el comercio unido de sopetran, que ofrece sopetran para los turistas",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
           <BusinessProvider>
              <header className= "fixed top-0 left-0 right-0 z-50 opacity-90">
                 <TopNav/>
              </header>
              <main className="mt-20 md:mt-10 relative"> {children}</main> 
           </BusinessProvider>
          </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
