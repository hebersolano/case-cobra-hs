import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { metadataConstructor } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = metadataConstructor();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />
        <main className="grainy-light flex flex-col min-h-[calc(100vh-10rem-1px)]">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
