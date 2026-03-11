"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Compass, User, UserCircle2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Explore", icon: Compass, href: "/explore" },
    { name: "Clubs", icon: UserCircle2, href: "/clubs" },
    { name: "Attendance", icon: CheckCircle2, href: "/attendance" },
    { name: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-100 dark:border-neutral-800 px-6 py-3 pb-8 z-50">
      <div className="flex justify-between items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive 
                  ? "text-blue-600 dark:text-blue-400 scale-110" 
                  : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              }`}
            >
              <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 h-0"}`}>
                {tab.name}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
