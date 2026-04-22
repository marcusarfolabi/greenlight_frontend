"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Trophy, Timer, Wallet, LayoutDashboard, PlayCircle } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-5 px-6"> 
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-brand-primary/20 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"> 
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
                        IGNITE YOUR <br />
                        <span className="text-brand-primary">COMPETITIVE</span> <br />
                        LEARNING
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md mb-8 font-medium">
                        The ultimate high-energy quiz platform. Synchronized rounds,
                        real-time leaderboards, and instant rewards.
                    </p>

                    <div className="flex flex-wrap items-center gap-4"> 
                        <button
                            type="button"
                            onClick={() => {/* handle start */ }}
                            className="group relative cursor-pointer flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-black rounded-2xl shadow-[0_6px_0_#1a5c2e] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-brand-primary/40"
                            aria-label="Start a new live quiz session"
                        >
                            <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                            <span>Start a Quiz</span>
                        </button> 
                        <button
                            type="button"
                            onClick={() => {/* handle navigate */ }}
                            className="group cursor-pointer flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-brand-navy dark:border-white text-foreground font-black rounded-2xl hover:bg-brand-navy hover:text-white dark:hover:bg-white dark:hover:text-brand-navy transition-all uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-brand-navy/20 dark:focus:ring-white/20"
                            aria-label="View global and session leaderboards"
                        >
                            <Trophy className="w-5 h-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
                            <span>View Leaderboards</span>
                        </button>
                    </div>
                </motion.div>

                <div className="relative h-125 w-full flex items-center justify-center">
                    <PuzzledCarousel />
                </div>
            </div>
        </section>
    );
};

const PuzzledCarousel = () => {
    const screens = [
        { id: 1, color: "#16a34a", icon: <Trophy size={30} />, label: "Real-Time Rankings" },
        { id: 2, color: "#0f172a", icon: <Users size={30} />, label: "Participant Lobby" },
        { id: 3, color: "#22c55e", icon: <Rocket size={30} />, label: "Rapid Fire Quiz" },
        { id: 4, color: "#1e293b", icon: <Timer size={30} />, label: "5s Preview Sync" },
        { id: 5, color: "#15803d", icon: <Wallet size={30} />, label: "Instant Payouts" },
        { id: 6, color: "#334155", icon: <LayoutDashboard size={30} />, label: "Admin Host Console" },
    ];

    return (
        <div className="relative w-full h-150 flex items-center justify-center perspective:1500px">
            {screens.map((screen, index) => { 
                const duration = 20; 
                const offset = index * (duration / screens.length);

                return (
                    <motion.div
                        key={screen.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],  
                            x: [250, 0, -250, 0, 250],
                            y: [0, 40, 0, -40, 0],
                            scale: [0.6, 1.1, 0.6, 0.4, 0.6],
                            rotateY: [30, 0, -30, 0, 30], 
                            zIndex: [10, 50, 10, 0, 10],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: -offset,
                        }}
                        className="absolute w-52 h-72 rounded-[2.5rem] p-7 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] flex flex-col justify-between text-white border border-white/10 backdrop-blur-2xl"
                        style={{
                            backgroundColor: screen.color,
                        }}
                    > 
                        <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-b from-white/20 to-transparent opacity-20 pointer-events-none" />

                        <div className="relative">
                            <div className="bg-white/10 w-12 h-12 flex items-center justify-center rounded-2xl border border-white/20">
                                {screen.icon}
                            </div>
                        </div>

                        <div className="relative space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-ping" />
                                <div className="h-1 w-12 bg-white/20 rounded-full" />
                            </div>
                            <div>
                                <h3 className="font-black uppercase text-sm leading-tight tracking-tight">
                                    {screen.label}
                                </h3>
                                <p className="text-[9px] font-medium text-white/40 uppercase tracking-[0.15em] mt-1">
                                    GreenLight Platform
                                </p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};