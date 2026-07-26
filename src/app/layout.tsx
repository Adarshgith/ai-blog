import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Navbar from "./components/Navbar";
import { auth, signIn, signOut } from "@/app/lib/auth";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WordCraft AI — Write faster with AI",
  description:
    "WordCraft AI is an AI-powered blogging platform. Write your own posts or let AI draft them for you in seconds.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const signInAction = async () => {
    "use server";
    await signIn("google");
  };

  const signOutAction = async () => {
    "use server";
    await signOut();
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Navbar session={session} signOutAction={signOutAction} />
        <main className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}