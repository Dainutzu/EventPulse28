"use client";

import { clubs } from "@/lib/clubs";
import { useApp } from "@/context/AppContext";
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ClubsPage() {
  const { toggleFollowClub, isFollowingClub } = useApp();

  return (
    <main className="flex flex-col min-h-screen pb-32 bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-2">
        <div className="flex items-center justify-between">
           <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter">Communities</h1>
           <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
             <Users size={24} />
           </div>
        </div>
        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <Sparkles size={12} className="text-blue-500" />
          Join your campus pulse
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs?.map((club, i) => {
          const following = isFollowingClub(club.id);
          return (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group h-full"
            >
              <div 
                className="h-full p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col items-center text-center space-y-6"
              >
                {/* Clickable Area */}
                <Link href={`/clubs/${club.id}`} className="flex flex-col items-center space-y-4 flex-1 w-full">
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-sm relative shrink-0">
                    <Image 
                      src={club.image || "/clubs/default-club.jpg"} 
                      alt={club.name} 
                      className="w-full h-full object-cover"
                      fill
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">{club.name}</h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[9px] font-black px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-widest whitespace-nowrap">
                        {club.category}
                      </span>
                      <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">{club.members}</span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {club.description}
                  </p>
                </Link>

                {/* Join Button (Separate from Link to prevent nested interaction issues) */}
                <div className="w-full pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollowClub(club.id);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${following ? "bg-green-500 text-white" : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 active:scale-95"}`}
                  >
                    {following ? <UserCheck size={14} strokeWidth={3} /> : <UserPlus size={14} strokeWidth={3} />}
                    {following ? "Following" : "Join Club"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
