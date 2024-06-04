import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";

const montserrat = Poppins({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Instalkly.",
  description: "Talk to everyone, instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased font-montserrat h-screen bg-background`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
