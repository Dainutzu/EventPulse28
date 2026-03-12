"use client";

import { useParams, useRouter } from "next/navigation";
import { clubs } from "@/lib/clubs";
import { events } from "@/lib/events";
import { useApp } from "@/context/AppContext";
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  ChevronLeft,
  Calendar,
  MapPin,
  Sparkles,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ClubDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toggleFollowClub, isFollowingClub } = useApp();

  const club = clubs.find((c) => c.id === id);

  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 uppercase tracking-tighter">Club Not Found</h2>
        <button 
          onClick={() => router.push("/communities")}
          className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-black text-xs uppercase tracking-widest"
        >
          Back to Communities
        </button>
      </div>
    );
  }

  const following = isFollowingClub(club.id);

  // Filter events organized by this club
  const clubEvents = events.filter(e => e.organiser === club.name);

  return (
    <main className="flex flex-col min-h-screen pb-32 bg-white dark:bg-neutral-900">
      {/* Dynamic Header/Banner Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image 
          src={club.image || "/clubs/default-club.jpg"} 
          alt={club.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white dark:to-neutral-900" />
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-12 left-6 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white active:scale-90 transition-all z-10"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-10 space-y-8">
        {/* Club Info Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 p-8 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-700 shadow-xl shadow-black/5 flex flex-col items-center text-center space-y-6"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700 shadow-lg -mt-20 relative bg-neutral-100 dark:bg-neutral-800">
            <Image 
              src={club.image || "/clubs/default-club.jpg"} 
              alt={club.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                {club.category}
              </span>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Users size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{club.members} members</span>
              </div>
            </div>
            <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter uppercase">{club.name}</h1>
          </div>

          <button
            onClick={() => toggleFollowClub(club.id)}
            className={`w-full max-w-xs flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg ${following ? "bg-green-500 text-white shadow-green-500/20" : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-neutral-900/10 active:scale-95"}`}
          >
            {following ? <UserCheck size={18} strokeWidth={3} /> : <UserPlus size={18} strokeWidth={3} />}
            {following ? "Following" : "Join Club"}
          </button>
        </motion.div>

        {/* About Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-sm font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles size={16} className="text-blue-500" />
            About the club
          </h2>
          <div className="p-8 rounded-[2rem] bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/50 leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p className="text-lg font-medium italic mb-4">
              &quot;{club.description}&quot;
            </p>
            <p className="text-base">
              The {club.name} is dedicated to fostering a vibrant campus environment through leadership, service, and collaboration. Our members are passionate about making an impact and developing their professional and personal skills through regular workshops, networking sessions, and community projects.
            </p>
          </div>
        </motion.section>

        {/* Upcoming Events Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap size={16} className="text-orange-500" />
              Upcoming Events
            </h2>
            <span className="text-[10px] font-black px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase tracking-widest">
              {clubEvents.length} Active
            </span>
          </div>

          {clubEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {clubEvents.map((event) => (
                <Link 
                  href={`/events/${event.id}`} 
                  key={event.id}
                  className="group relative bg-white dark:bg-neutral-800 p-5 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all flex gap-4 overflow-hidden"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative">
                    <Image 
                      src={event.image || "/events/default-event.jpg"} 
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 space-y-1 py-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{event.date}</span>
                    </div>
                    <h3 className="text-base font-black text-neutral-900 dark:text-white leading-tight uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-3 text-neutral-400 pt-1">
                       <div className="flex items-center gap-1">
                         <MapPin size={10} />
                         <span className="text-[9px] font-black uppercase tracking-widest">{event.location}</span>
                       </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-[2rem] border-2 border-dashed border-neutral-100 dark:border-neutral-800 flex flex-col items-center justify-center text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center text-neutral-300">
                  <Calendar size={32} />
               </div>
               <div className="space-y-1">
                 <p className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-widest">No Scheduled Events</p>
                 <p className="text-[10px] font-medium text-neutral-400">Stay tuned for updates from {club.name}!</p>
               </div>
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}
