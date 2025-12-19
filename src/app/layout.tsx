import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/lib/analytics/posthog";

const googleSans = Google_Sans({ variable: "--font-sans" });
const googleSansCode = Google_Sans_Code({ variable: "--font-code" });

export const metadata: Metadata = {
  title: "MonoLink - Your Link in Bio",
  description: "Create your personalized link in bio page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={googleSans.variable}>
      <body className={`${googleSans.variable} ${googleSansCode.variable} antialiased`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
