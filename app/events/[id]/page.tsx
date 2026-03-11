"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { events } from "@/lib/events";
import { useApp } from "@/context/AppContext";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  Share2, 
  ShieldCheck, 
  Ticket, 
  QrCode, 
  Users,
  BellRing
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function EventDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { registerEvent, isRegistered, registeredEvents, addNotification } = useApp();
  const [showQR, setShowQR] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);

  const event = events.find((e) => e.id === id);
  const registered = isRegistered(id as string);
  const ticket = registeredEvents.find(e => e.id === id);

  if (!event) return <div className="p-8 text-center text-neutral-500 font-bold uppercase tracking-widest text-xs">Event not found</div>;

  const handleReminder = () => {
    setReminderSet(true);
    addNotification("Reminder Set!", `We'll notify you 30 mins before ${event.title} starts.`);
  };

  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-neutral-900 pb-32">
      {/* Dynamic Banner */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={event.image} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900 via-transparent to-transparent" />
        
        {/* Actions Over Banner */}
        <div className="absolute top-12 px-6 w-full flex justify-between">
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-all border border-white/30"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
              <Share2 size={20} />
            </button>
            <button 
              onClick={handleReminder}
              className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${reminderSet ? "bg-orange-500 border-transparent text-white animate-pulse" : "bg-white/20 border-white/30 text-white"}`}
            >
              <BellRing size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Event Details Content */}
      <div className="px-6 -mt-16 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-neutral-800 p-8 rounded-[3rem] shadow-2xl border border-neutral-100 dark:border-neutral-700"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest border border-blue-100 dark:border-blue-500/20">
              {event.category}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-50 dark:bg-neutral-700/50 text-[10px] font-black text-neutral-400 uppercase tracking-widest border border-neutral-100 dark:border-neutral-600">
               {event.faculty}
            </span>
          </div>

          <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter leading-tight mb-8">
            {event.title}
          </h1>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-blue-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Date</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white mt-1">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-blue-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Time</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white mt-1">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Location</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white mt-1">{event.location}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Organiser Section */}
        <div className="mt-8 px-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 dark:bg-white flex items-center justify-center text-sm">
                 🏢
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Organiser</p>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">{event.organiser}</p>
              </div>
           </div>
           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
              <Users size={12} className="text-neutral-400" />
              <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{event.capacity} Capacity</span>
           </div>
        </div>

        {/* Description */}
        <div className="mt-12 px-2">
          <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">About the Event</h3>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-24 w-full max-w-md px-6 z-40">
        <div className="p-4 bg-white/10 dark:bg-neutral-900/10 backdrop-blur-2xl rounded-[2.5rem] shadow-sm flex items-center justify-center gap-3">
          {registered ? (
            <button
              onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-green-500 text-white font-black text-sm shadow-xl shadow-green-500/30 active:scale-95 transition-all"
            >
              <Ticket size={20} />
              View Digital Ticket
            </button>
          ) : (
            <button
              onClick={() => registerEvent(event)}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black text-sm shadow-2xl active:scale-95 transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <QrCode size={20} className="relative z-10" />
              <span className="relative z-10">Register Securely</span>
            </button>
          )}
        </div>
      </div>

      {/* Ticket QR Modal */}
      <AnimatePresence>
        {showQR && ticket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-neutral-900/95 backdrop-blur-2xl flex items-center justify-center p-8"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              className="w-full max-w-xs bg-white rounded-[3.5rem] p-10 flex flex-col items-center text-center shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                 <QrCode size={32} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900 mb-2 tracking-tight">{event.title}</h2>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">{event.date} • {event.time}</p>
              
              <div className="bg-white p-4 rounded-[2rem] shadow-sm mb-8 border border-neutral-100">
                <QRCodeSVG value={ticket.ticketId} size={150} />
              </div>

              <div className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em] mb-1">Ticket ID</div>
              <div className="text-sm font-mono font-black text-neutral-900">{ticket.ticketId}</div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-2 text-green-500 bg-green-50 px-4 py-2 rounded-full"
              >
                <ShieldCheck size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Secured Pulse Ticket</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
