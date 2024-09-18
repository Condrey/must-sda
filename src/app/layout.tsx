import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { webName } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "./react-query-provider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${webName}`,
    default: `${webName}`,
  },
  description: `Mbarara University Of Science and Technology Seventh-Day Adventist Students' Association Website.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
