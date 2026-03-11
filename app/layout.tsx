import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";
import AuthGuard from "@/components/AuthGuard";
import NotificationToast from "@/components/NotificationToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Pulse",
  description: "Campus event discovery and registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={`${inter.className} bg-neutral-50 dark:bg-neutral-950 antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800`}>
        <AppProvider>
          <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-md min-h-screen relative bg-white dark:bg-neutral-900 shadow-2xl overflow-x-hidden flex flex-col">
              <AuthGuard>
                <NotificationToast />
                <AnimatePresence mode="wait">
                  <PageTransition key="main">
                    {children}
                  </PageTransition>
                </AnimatePresence>
                <BottomNav />
              </AuthGuard>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
