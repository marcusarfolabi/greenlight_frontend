"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Music, Play, Crown, Share2, Volume2, VolumeX, Timer } from "lucide-react";
import { ArenaButton } from "@/app/components/common/ArenaButton";
import { toast } from "react-hot-toast";
import clsx from "clsx";

// Mock data for other players
const INITIAL_PLAYERS = [
    { id: "1", name: "SpeedyWizard", color: "bg-[#E21B3C]" },
    { id: "2", name: "EpicNinja", color: "bg-[#1368CE]" },
    { id: "3", name: "GoldenChamp", color: "bg-[#26890C]" },
    { id: "4", name: "MightySeeker", color: "bg-[#D89E00]" },
];

export default function GameLobbyScreen({ username = "You", pin = "8888" }) {
    const [trackInfo] = useState(() => {
        const num = Math.floor(Math.random() * 8) + 1;
        return {
            number: num,
            path: `/audios/lobby${num}.mp3`,
            name: `Lobby Beats #${num}`
        };
    });

    const [players, setPlayers] = useState(INITIAL_PLAYERS);
    const [isReady, setIsReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isMuted, setIsMuted] = useState(true);
    const lobbyAudioRef = useRef<HTMLAudioElement | null>(null);

    const playJoinSound = useCallback(() => {
        const joinSfx = new Audio("/audios/join.mp3");
        joinSfx.volume = 0.3;

        joinSfx.play().catch((err) => {
            console.warn("Join sound blocked: User hasn't interacted yet.");
        });
    }, []);

    useEffect(() => {
        // Countdown Ticker
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // 2. FIXED: Use the pre-calculated trackInfo from state
        if (!lobbyAudioRef.current) {
            const audio = new Audio(trackInfo.path);
            audio.loop = true;
            audio.volume = 0.5;
            lobbyAudioRef.current = audio;
        }

        return () => {
            clearInterval(timer);
            if (lobbyAudioRef.current) {
                lobbyAudioRef.current.pause();
                lobbyAudioRef.current = null;
            }
        };
    }, [trackInfo.path]); // Only depends on the path

    const toggleAudio = () => {
        if (!lobbyAudioRef.current) return;
        if (isMuted) {
            lobbyAudioRef.current.play().catch(() => { });
            setIsMuted(false);
        } else {
            lobbyAudioRef.current.pause();
            setIsMuted(true);
        }
    };

    // Simulate players joining
    useEffect(() => {
        // Don't add players if we've reached a limit (optional)
        if (players.length >= 10) return;

        const timer = setTimeout(() => {
            const newPlayer = {
                id: Date.now().toString(),
                name: `Player${Math.floor(Math.random() * 99)}`,
                color: "bg-brand-primary"
            };
            setPlayers((prev) => [...prev, newPlayer]);

            playJoinSound();
        }, 4000);

        return () => clearTimeout(timer);
    }, [players]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative min-h-screen bg-background transition-colors duration-300 overflow-hidden p-6 text-foreground font-black">
            {/* ANIMATED BACKGROUND PARTICLES */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-foreground rounded-full blur-[80px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand-primary rounded-full blur-[100px] animate-bounce" />
            </div>

            {/* TOP NAV: PIN & STATUS */}
            <div className="relative z-10 flex justify-between items-center mb-12">
                {/* PIN SECTION */}
                <div className="bg-foreground/5 backdrop-blur-md p-4 rounded-2xl border-b-4 border-foreground/20 group cursor-pointer hover:scale-105 transition-transform">
                    <p className="text-[10px] uppercase opacity-60 tracking-widest font-black">Game PIN</p>
                    <h2 className="text-4xl tracking-tighter font-black">{pin}</h2>
                </div>

                {/* COUNTDOWN & AUDIO CONTROLS */}
                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                        <div className="flex items-center gap-2 justify-end text-brand-primary mb-1">
                            <Timer className="w-4 h-4 animate-pulse" />
                            <p className="text-[10px] uppercase font-black tracking-widest">Starts In</p>
                        </div>
                        <div className="bg-foreground/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                            <span className="text-2xl font-black tabular-nums tracking-tight">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>

                    {/* AUDIO TOGGLE */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end mr-2 hidden sm:flex">
                            {/* <span className="text-[9px] uppercase opacity-40 font-black">Awaiting Host</span> */}
                            <span className="text-[11px] font-bold">{isMuted ? "Audio Off" : "Awaiting Host"}</span>
                        </div>
                        <button
                            onClick={toggleAudio}
                            className={clsx(
                                "p-4 rounded-full transition-all active:scale-90 border-b-4",
                                isMuted
                                    ? "bg-red-500/20 border-red-900/50 text-red-500"
                                    : "bg-btn-primary border-black/20 text-btn-text animate-bounce-slow"
                            )}
                        >
                            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* SHARE BUTTON */}
                    <button className="p-4 bg-foreground/10 rounded-full hover:bg-foreground/20 transition-all border-b-4 border-foreground/20">
                        <Share2 className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* MAIN PLAYER GRID */}
            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Users className="w-8 h-8 text-brand-primary" />
                    <h1 className="text-3xl uppercase italic tracking-tighter">
                        {players.length + 1} Players Joined
                    </h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <AnimatePresence>
                        {/* THE CURRENT USER (DANCING CARD) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{
                                scale: 1,
                                rotate: [0, -5, 5, -5, 0],
                                y: [0, -15, 0]
                            }}
                            transition={{
                                rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                                y: { repeat: Infinity, duration: 0.5, ease: "easeOut" }
                            }}
                            className="relative group"
                        >
                            <div className="absolute -top-4 -left-2 z-20 bg-brand-leaf text-brand-navy px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-lg">
                                <Crown className="w-3 h-3" /> YOU
                            </div>
                            {/* Card stays consistent with game branding, but container respects background variable */}
                            <div className="h-40 bg-white text-brand-navy rounded-2xl border-b-[8px] border-black/20 flex flex-col items-center justify-center p-4 shadow-2xl overflow-hidden">
                                <div className="w-16 h-16 bg-brand-primary rounded-full mb-3 flex items-center justify-center text-white text-3xl">
                                    {username[0]}
                                </div>
                                <p className="text-center truncate w-full font-black uppercase">{username}</p>
                            </div>
                        </motion.div>

                        {/* OTHER PLAYERS */}
                        {players.map((player) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="h-40 bg-foreground/5 backdrop-blur-sm rounded-2xl border-b-[8px] border-foreground/10 flex flex-col items-center justify-center p-4"
                            >
                                <div className={clsx(player.color, "w-12 h-12 rounded-full mb-3 shadow-inner opacity-60")} />
                                <p className="text-sm opacity-80 font-bold">{player.name}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* FOOTER: READY BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background to-transparent z-20 flex justify-center">
                <div className="max-w-xs w-full">
                    <ArenaButton
                        onClick={() => {
                            setIsReady(!isReady);
                            if (!isReady) toast.success("You're ready to rumble!");
                        }}
                        className={clsx(
                            "h-20 text-2xl uppercase tracking-widest",
                            isReady ? "opacity-100" : "opacity-80"
                        )}
                    >
                        {isReady ? "READY UP!" : "LOCK IN!"}
                    </ArenaButton>
                </div>
            </div>
        </div>
    );
}