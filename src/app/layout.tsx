import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Roboto } from 'next/font/google'

import "./globals.css";

const myFont = localFont({
  src: '../fonts/PopJoyStd-B.otf',
  display: 'swap',
  // style: 'normal',
  // weight: '400',
})

// const roboto = Roboto({
//   weight: '400',
//   subsets: ['latin'],
// })

export const metadata: Metadata = {
  title: "my-next-blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        {children}
      </body>
    </html>
  );
}
