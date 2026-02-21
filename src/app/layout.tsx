import type { Metadata } from "next";
import "./globals.css";
import { jetBrainsMono } from "@/theme/style_guide";

export const metadata: Metadata = {
  title: "Lucas Monteiro - Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${jetBrainsMono.className} font-sans h-full`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
