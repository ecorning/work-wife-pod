import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bowlby_One_SC } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bowlby = Bowlby_One_SC({
  weight: "400",
  variable: "--font-bowlby",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Work Wife Pod",
  description:
    "Your favorite (desperately needed) work advice podcast. Hosted by Emily & friends — actually qualified experts on career & the workplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bowlby.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
