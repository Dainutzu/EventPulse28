import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Event Pulse — Discover Campus Events",
  description:
    "Discover, explore, and register for events happening on campus. Your pulse on what's happening.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-neutral-50 dark:bg-neutral-950 antialiased">
        <AppProvider>
          <div className="min-h-screen flex justify-center bg-neutral-50 dark:bg-neutral-950">
            <div className="w-full max-w-md min-h-screen bg-white dark:bg-neutral-900 relative shadow-sm">
              {children}
              <BottomNav />
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
