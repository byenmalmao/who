import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "./(landing)/components/Background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Who?",
  description: "byenmalmao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Background/>
        {children}
        </body>
    </html>
  );
}
