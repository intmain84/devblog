import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { ThemeProviderWrapper } from "@/components/layout/ThemeProviderWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Alex Blog",
  description: "Alex's personal blog",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          "antialiased flex flex-col min-h-screen px-2",
          poppins.variable
        )}
      >
        <ThemeProviderWrapper>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer>Footer</footer>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
