"use client";

import { useApp } from "@/context/AppContext";
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  QrCode, 
  Download, 
  ArrowRight, 
  Zap, 
  TrendingUp
} from "lucide-react";
import { categoryColors } from "@/lib/events";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CheckInEvent {
  id: string;
  title: string;
  location: string;
}

export default function AttendancePage() {
  const { registeredEvents, attendedEvents, points, checkIn, isAttended } = useApp();
  const [showCheckInModal, setShowCheckInModal] = useState<CheckInEvent | null>(null);

  const handleDownload = () => {
    const headers = ["Title", "Date", "Category", "Attendance Status"];
    const rows = registeredEvents.map(event => [
      event.title,
      event.date,
      event.category,
      isAttended(event.id) ? "Attended" : "Not Attended"
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "event_pulse_attendance.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex flex-col min-h-screen pb-32 bg-white dark:bg-neutral-900">
      {/* Header with Points Dashboard */}
      <div className="px-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-6">
           <div>
            <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">Attendance</h1>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Proof of Participation</p>
           </div>
           <button 
             onClick={handleDownload}
             className="w-12 h-12 rounded-[1.5rem] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 active:scale-90 transition-all border border-neutral-200 dark:border-neutral-700"
           >
             <Download size={20} />
           </button>
        </div>

        {/* Pulse Points Card */}
        <div className="p-6 rounded-[2.5rem] bg-indigo-600 shadow-[0_20px_40px_rgba(79,70,229,0.3)] flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
             <TrendingUp size={120} className="text-white" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1 flex items-center gap-2">
               <Zap size={10} className="fill-current" />
               Pulse Reputation Status
            </p>
            <p className="text-4xl font-black text-white tracking-tight">{points} <span className="text-lg opacity-60">XP</span></p>
          </div>
          <div className="px-5 py-2.5 rounded-2xl bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest relative z-10 border border-white/20">
             Elite Level
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="px-6 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">Verified History</h2>
          <span className="text-[9px] font-black text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">{attendedEvents.length} Checks</span>
        </div>

        {registeredEvents.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center bg-neutral-50 dark:bg-neutral-800/20 rounded-[3rem] border-2 border-dashed border-neutral-100 dark:border-neutral-800"
          >
            <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-3xl flex items-center justify-center shadow-sm mx-auto mb-4">
               <QrCode size={24} className="text-neutral-300" />
            </div>
            <p className="text-neutral-400 text-sm font-bold max-w-[200px] mx-auto uppercase">Register for events to track attendance.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {registeredEvents?.map((event, i) => {
              const attended = isAttended(event.id);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className={`p-6 rounded-[2.5rem] bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm transition-all ${attended ? "opacity-100 border-green-500/20 bg-green-50/10" : "hover:shadow-md"}`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`inline-block text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${categoryColors[event.category] || 'bg-neutral-100'}`}>
                        {event.category}
                      </span>
                      {attended && (
                        <div className="flex items-center gap-1.5 text-green-500 bg-green-50 dark:bg-green-500/10 px-4 py-1.5 rounded-full">
                           <CheckCircle2 size={12} strokeWidth={3} />
                           <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight mb-4 uppercase">{event.title}</h3>
                    
                    <div className="space-y-2 mb-8">
                      <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
                        <MapPin size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest mb-0.5">{event.location}</span>
                      </div>
                    </div>

                    {!attended ? (
                      <button
                        onClick={() => setShowCheckInModal(event)}
                        className="w-full py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-neutral-900/10 dark:shadow-white/5"
                      >
                        <QrCode size={18} />
                        Check-in Securely
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                         <Zap size={10} className="text-indigo-500 fill-current" />
                         Earned 100 Pulse Points
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Leaderboard Section */}
      <div className="px-6 mt-12 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">Pulse Leaderboard</h2>
          <div className="flex items-center gap-1.5 text-orange-500">
             <Zap size={10} className="fill-current" />
             <span className="text-[9px] font-black uppercase tracking-widest">Global Ranking</span>
          </div>
        </div>
        
        <div className="space-y-3 bg-neutral-50 dark:bg-neutral-800/40 p-6 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800">
          {[
            { name: "You", xp: points, rank: "#1", color: "bg-blue-600", active: true },
            { name: "Sarah K.", xp: 2400, rank: "#2", color: "bg-neutral-200 dark:bg-neutral-700" },
            { name: "John Deo", xp: 1950, rank: "#3", color: "bg-neutral-200 dark:bg-neutral-700" },
            { name: "Maya R.", xp: 1800, rank: "#4", color: "bg-neutral-200 dark:bg-neutral-700" },
          ].map((leader, i) => (
            <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${leader.active ? "bg-white dark:bg-neutral-800 shadow-sm border border-blue-500/10" : ""}`}>
              <div className="flex items-center gap-4">
                 <div className={`w-8 h-8 rounded-xl ${leader.color} flex items-center justify-center text-[10px] font-black text-white`}>
                    {leader.rank}
                 </div>
                 <p className={`text-xs font-black uppercase tracking-tight ${leader.active ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`}>{leader.name}</p>
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${leader.active ? "text-blue-600" : "text-neutral-400"}`}>{leader.xp} XP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Check-in Modal */}
      <AnimatePresence>
        {showCheckInModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-neutral-900/98 backdrop-blur-3xl flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              className="w-full max-w-xs bg-white dark:bg-neutral-800 rounded-[3.5rem] p-10 flex flex-col items-center text-center shadow-2xl relative border border-white/10"
            >
              <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-8 relative">
                 <QrCode size={48} className="text-blue-600 dark:text-blue-400" />
                 <motion.div 
                   animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.1, 0.5] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-xl"
                 />
              </div>
              
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 tracking-tighter uppercase leading-none">Confirm Presence</h2>
              <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed px-4">
                Verify your attendance at <strong>{showCheckInModal.location}</strong> to earn Pulse reputation.
              </p>

              <div className="w-full space-y-3">
                <button
                  onClick={() => {
                    checkIn(showCheckInModal.id);
                    setShowCheckInModal(null);
                  }}
                  className="w-full py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-2xl shadow-indigo-600/30"
                >
                  Verify Arrival
                </button>
                <button
                  onClick={() => setShowCheckInModal(null)}
                  className="w-full py-4 rounded-[2rem] bg-neutral-100 dark:bg-neutral-700 text-neutral-400 font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                >
                  Go Back
                </button>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-10 left-10 w-6 h-6 border-t-4 border-l-4 border-neutral-100 dark:border-neutral-700/50 rounded-tl-xl" />
              <div className="absolute top-10 right-10 w-6 h-6 border-t-4 border-r-4 border-neutral-100 dark:border-neutral-700/50 rounded-tr-xl" />
              <div className="absolute bottom-10 left-10 w-6 h-6 border-b-4 border-l-4 border-neutral-100 dark:border-neutral-700/50 rounded-bl-xl" />
              <div className="absolute bottom-10 right-10 w-6 h-6 border-b-4 border-r-4 border-neutral-100 dark:border-neutral-700/50 rounded-br-xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
