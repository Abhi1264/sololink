import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/lib/analytics/posthog";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

const notoSans = Noto_Sans({ variable: "--font-sans" });

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
    <html lang="en" className={notoSans.variable}>
      <body className={`${notoSans.variable} antialiased`}>
        <PostHogProvider>
          <PageViewTracker />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
