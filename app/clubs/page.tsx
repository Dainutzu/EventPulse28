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

export default function ClubsPage() {
  const { toggleFollowClub, isFollowingClub } = useApp();

  return (
    <main className="flex flex-col min-h-screen pb-32 bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="px-6 py-8 space-y-2">
        <div className="flex items-center justify-between">
           <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">Communities</h1>
           <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
             <Users size={20} />
           </div>
        </div>
        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <Sparkles size={12} className="text-blue-500" />
          Join your campus pulse
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs?.map((club, i) => {
          const following = isFollowingClub(club.id);
          return (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group lg:active:scale-[0.98] transition-all h-full"
            >
              <div className="h-full p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col items-center text-center space-y-4">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                   <Users size={80} />
                </div>

                <div className="w-20 h-20 rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-700 shadow-sm relative shrink-0">
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

                <div className="pt-4 w-full mt-auto">
                  <button
                    onClick={() => toggleFollowClub(club.id)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${following ? "bg-green-500 text-white" : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 active:scale-95"}`}
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
