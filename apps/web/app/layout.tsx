import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@repo/ui/global.css";
import Header from "./_components/header";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMaoS",
  description: "Learning Management as Open Source",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="bg-black text-white overflow-x-hidden">
      <body className={`${roboto.className} subpixel-antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
