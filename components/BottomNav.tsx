"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-stretch">
          {tabs.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all duration-200 ${
                  active
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.2 : 1.8}
                  className="transition-all duration-200"
                />
                <span
                  className={`text-xs font-medium transition-all duration-200 ${
                    active ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-neutral-900 dark:bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
