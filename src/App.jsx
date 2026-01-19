import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Brain,
  MessageCircle,
  Shield,
  Heart,
  Activity,
  ArrowRightLeft,
  User,
  UserCheck,
} from "lucide-react";

const App = () => {
  const [bootSequence, setBootSequence] = useState(true);
  const [currentView, setCurrentView] = useState("landing"); // 'landing', 'mood', 'connect'
  const [selectedMood, setSelectedMood] = useState(null);

  // Fake "Boot Sequence" effect
  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (bootSequence) {
    return <BootScreen />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 font-mono text-neutral-800 selection:bg-rose-200">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="max-w-4xl mx-auto p-6 pt-24">
        <AnimatePresence mode="wait">
          {currentView === "landing" && (
            <LandingView key="landing" onStart={() => setCurrentView("mood")} />
          )}
          {currentView === "mood" && (
            <MoodSelector
              key="mood"
              onMoodSelect={(mood) => {
                setSelectedMood(mood);
                setCurrentView("connect");
              }}
            />
          )}
          {currentView === "connect" && (
            <CouncillorConnect key="connect" mood={selectedMood} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

/* --- 1. BOOT SCREEN (Retro Intro) --- */
const BootScreen = () => (
  <div className="fixed inset-0 bg-neutral-900 text-green-400 font-mono p-10 flex flex-col justify-end">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <p className="mb-2">{`> INITIALIZING MIND_OS KERNEL...`}</p>
      <p className="mb-2">{`> LOADING SERENITY PROTOCOLS... [OK]`}</p>
      <p className="mb-2">{`> ESTABLISHING SECURE CONNECTION...`}</p>
      <p className="mb-2 text-rose-400">{`> DECRYPTING EMOTIONAL STATES...`}</p>
      <motion.div
        className="mt-8 h-1 w-32 bg-green-500"
        animate={{ width: "100%" }}
        transition={{ duration: 2.5, ease: "circOut" }}
      />
    </motion.div>
  </div>
);

/* --- 2. LANDING VIEW --- */
const LandingView = ({ onStart }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-12 text-center mt-10"
  >
    <div className="space-y-4">
      <div className="inline-block p-4 rounded-2xl bg-white border-2 border-neutral-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Brain className="w-16 h-16 text-neutral-800" />
      </div>
      <h1 className="text-5xl font-bold tracking-tighter">
        Mind_OS <span className="text-rose-500 text-2xl align-top">v1.0</span>
      </h1>
      <p className="text-xl text-neutral-500 max-w-lg mx-auto">
        A secure, decentralized operating system for your mental well-being.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard icon={Shield} title="Private" desc="Encrypted locally." />
      <FeatureCard icon={Activity} title="Real-time" desc="Instant support." />
      <FeatureCard
        icon={Heart}
        title="Empathetic"
        desc="Designed for humans."
      />
    </div>

    <button
      onClick={onStart}
      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-xl text-lg font-bold hover:bg-rose-500 transition-colors shadow-[6px_6px_0px_0px_rgba(225,29,72,1)] active:translate-y-1 active:shadow-none"
    >
      Initialize Session
      <ArrowRightLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

/* --- 3. MOOD SELECTOR --- */
const MoodSelector = ({ onMoodSelect }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="max-w-xl mx-auto text-center"
  >
    <h2 className="text-3xl font-bold mb-8">System Status Check</h2>
    <p className="text-neutral-500 mb-10">
      Select your current emotional frequency:
    </p>

    <div className="grid grid-cols-3 gap-4">
      <MoodBtn
        icon="😫"
        label="Overloaded"
        onClick={() => onMoodSelect("stressed")}
      />
      <MoodBtn
        icon="😐"
        label="Stable"
        onClick={() => onMoodSelect("neutral")}
      />
      <MoodBtn
        icon="🤩"
        label="Optimized"
        onClick={() => onMoodSelect("happy")}
      />
    </div>
  </motion.div>
);

/* --- 4. COUNCILLOR CONNECT (The Diagram Interaction) --- */
const CouncillorConnect = ({ mood }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full max-w-3xl mx-auto"
  >
    <div className="bg-white border-2 border-neutral-200 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Student Side */}
        <div className="text-center space-y-4">
          <div className="w-32 h-40 bg-rose-50 border-2 border-rose-200 rounded-xl flex items-center justify-center relative">
            <User className="w-12 h-12 text-rose-400" />
            <span className="absolute -bottom-3 bg-rose-100 text-rose-600 px-3 py-1 text-xs font-bold rounded-full border border-rose-200">
              YOU ({mood})
            </span>
          </div>
        </div>

        {/* The "Interaction UI" Arrows */}
        <div className="flex-1 flex flex-col items-center space-y-2">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
            Encrypted Link
          </p>
          <div className="w-full h-0.5 bg-neutral-200 relative">
            <motion.div
              className="absolute top-1/2 -mt-1 h-2 w-2 bg-green-500 rounded-full"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-neutral-100 rounded text-xs">
              Requesting...
            </span>
          </div>
          <div className="w-full h-0.5 bg-neutral-200" />
        </div>

        {/* Councillor Side */}
        <div className="text-center space-y-4">
          <div className="w-32 h-40 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center justify-center relative">
            <UserCheck className="w-12 h-12 text-blue-500" />
            <span className="absolute -bottom-3 bg-blue-100 text-blue-600 px-3 py-1 text-xs font-bold rounded-full border border-blue-200">
              COUNCILLOR
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-neutral-50 rounded-xl border border-neutral-100 text-center">
        <h3 className="text-lg font-bold mb-2">Connection Established</h3>
        <p className="text-neutral-500 text-sm mb-4">
          A councillor has been notified of your status.
        </p>
        <button className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-[4px_4px_0px_0px_rgba(21,128,61,1)] hover:translate-y-1 hover:shadow-none transition-all">
          Start Chat
        </button>
      </div>
    </div>
  </motion.div>
);

/* --- COMPONENTS --- */
const Navbar = ({ currentView, setCurrentView }) => (
  <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-neutral-100 z-10">
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => setCurrentView("landing")}
    >
      <Terminal className="w-6 h-6" />
      <span className="font-bold tracking-tight">MIND_OS</span>
    </div>
    <div className="text-xs text-neutral-400 font-mono">
      SYS.STATUS: <span className="text-green-500">ONLINE</span>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-6 bg-white rounded-xl border-2 border-neutral-100 hover:border-neutral-300 transition-colors">
    <Icon className="w-8 h-8 mb-4 text-rose-500" />
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-neutral-500 text-sm">{desc}</p>
  </div>
);

const MoodBtn = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border-2 border-neutral-100 hover:border-rose-400 hover:bg-rose-50 transition-all cursor-pointer group"
  >
    <span className="text-4xl mb-3 group-hover:scale-110 transition-transform block">
      {icon}
    </span>
    <span className="font-bold text-sm text-neutral-600 group-hover:text-rose-600">
      {label}
    </span>
  </button>
);

export default App;
