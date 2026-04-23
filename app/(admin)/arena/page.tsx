"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArenaButton } from "@/app/components/common/ArenaButton";
import { Plus, Play, Edit3, Settings, Users, Trophy, Zap, Clock } from "lucide-react";

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
}

const CountUp = ({ end, duration = 1000, suffix = "" }: CountUpProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
};

/**
 * Modern Stat Card
 */
const StatCard = ({ stat, index }: { stat: any; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white border-2 border-slate-100 p-6 rounded-3xl shadow-sm flex items-center gap-5"
    >
        <div className={`p-4 rounded-2xl bg-slate-50 ${stat.color}`}>
            <stat.icon className="w-8 h-8" />
        </div>
        <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                {stat.label}
            </p>
            <p className="text-3xl font-black">
                <CountUp end={stat.value} suffix={stat.suffix} />
            </p>
        </div>
    </motion.div>
);

// --- Data ---

const MOCK_QUIZZES = [
    {
        id: "1",
        title: "Q1 Product Knowledge",
        participants: 142,
        status: "Draft",
        questions: 12,
        color: "bg-blue-500",
        shadow: "shadow-[0_4px_0_rgb(37,99,235)]"
    },
    {
        id: "2",
        title: "Global Sales Kickoff",
        participants: 850,
        status: "Ready",
        questions: 25,
        color: "bg-purple-600",
        shadow: "shadow-[0_4px_0_rgb(147,51,234)]"
    },
];

const STATS = [
    { label: "Total Players", value: 1240, suffix: "", icon: Users, color: "text-blue-500" },
    { label: "Live Arenas", value: 3, suffix: "", icon: Zap, color: "text-yellow-500" },
    { label: "Completion Rate", value: 94, suffix: "%", icon: Trophy, color: "text-green-500" },
];

// --- Main Page ---

export default function ArenaDashboard() {
    return ( 
        <div className="flex flex-col gap-y-8 lg:gap-y-10 p-4 lg:p-0">
            {/* 1. HEADER SECTION */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 lg:gap-3">
                        <h1 className="text-2xl lg:text-4xl font-black tracking-tight uppercase">
                            Hello, Host
                        </h1>
                        <span className="text-2xl lg:text-4xl animate-bounce">👋</span>
                    </div>
                    {/* FIX 2: Ensure this text doesn't wrap or hide on tiny screens */}
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                        Arena is ready for action
                    </p>
                </div>

                <ArenaButton className="w-full sm:w-auto px-6 lg:px-8 py-4 lg:py-6 text-sm lg:text-lg shadow-[0_4px_0_rgb(0,0,0,0.1)] active:translate-y-1 transition-all uppercase font-black">
                    <Plus className="w-5 h-5 lg:w-6 lg:h-6 mr-2 stroke-[3px]" />
                    Create New
                </ArenaButton>
            </header>

            {/* 2. STATS OVERVIEW */} 
            <div className="relative z-0 flex flex-col md:flex-row gap-4 lg:gap-6">
                {STATS.map((stat, i) => (
                    <div
                        key={stat.label} 
                        className="flex-1 min-w-0"
                    >
                        <StatCard stat={stat} index={i} />
                    </div>
                ))}
            </div>

            {/* 3. QUIZZES SECTION */}
            <section className="space-y-4 lg:space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg lg:text-2xl font-black tracking-tight uppercase">My Arenas</h2>
                    <button className="text-[10px] lg:text-xs font-black text-primary hover:underline uppercase tracking-widest">
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {MOCK_QUIZZES.map((quiz, i) => (
                        <motion.div
                            key={quiz.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white border-b-[4px] lg:border-b-[6px] border-slate-200 hover:border-primary border-2 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] transition-all relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1.5 lg:w-2 h-full ${quiz.color}`} />

                            <div className="flex gap-4 lg:gap-6">
                                {/* Visual Icon: Fixed size on mobile to prevent squishing */}
                                <div className={`w-20 h-20 lg:w-32 lg:h-32 rounded-xl lg:rounded-2xl ${quiz.color} flex items-center justify-center text-white shadow-inner flex-shrink-0`}>
                                    <Zap className="w-8 h-8 lg:w-12 lg:h-12 fill-white/20" />
                                </div>

                                <div className="flex-1 min-w-0 space-y-3 lg:space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="text-lg lg:text-xl font-black leading-tight group-hover:text-primary transition-colors uppercase truncate">
                                            {quiz.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 items-center text-[8px] lg:text-[10px] font-black uppercase text-slate-400">
                                            <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
                                                <Users className="w-2.5 h-2.5" /> {quiz.participants}
                                            </span>
                                            <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
                                                <Clock className="w-2.5 h-2.5" /> {quiz.questions} Qs
                                            </span>
                                            <span className={quiz.status === "Ready" ? "text-green-500" : "text-amber-500"}>
                                                ● {quiz.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 items-center">
                                        <ArenaButton size="sm" className="flex-[2.5] h-10 lg:h-12 bg-green-600 shadow-[0_3px_0_rgb(22,101,52)] text-[10px] lg:text-sm font-black">
                                            <Play className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 fill-current" /> START
                                        </ArenaButton>
                                        <ArenaButton variant="outline" size="sm" className="flex-1 h-10 lg:h-12 p-0 border-2 rounded-xl">
                                            <Edit3 className="w-4 h-4" />
                                        </ArenaButton>
                                        <ArenaButton variant="outline" size="sm" className="flex-1 h-10 lg:h-12 p-0 border-2 rounded-xl">
                                            <Settings className="w-4 h-4" />
                                        </ArenaButton>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}