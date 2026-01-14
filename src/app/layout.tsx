import type { Metadata } from "next";
import "./globals.css";
import { jetBrainsMono } from "@/theme/style_guide";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Lucas Monteiro - Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.className} font-sans`}
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
