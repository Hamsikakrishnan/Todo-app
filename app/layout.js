import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Todo App",
  description: "An app to add and delete tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <div className="flex items-center justify-between bg-black p-8">
        <Link href="/">
            <h1 className=" text-2xl text-white font-bold">Todo App</h1>
        </Link>
        
        <Link href="/completed">
          <button className="text-black bg-green-100 px-6 py-3 rounded-md font-bold text-xl">Completed Tasks</button>
        </Link>
        
      </div>
        
        {children}
      </body>
    </html>
  );
}
