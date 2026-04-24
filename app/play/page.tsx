"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArenaButton } from "@/app/components/common/ArenaButton";
import { ArenaInput } from "@/app/components/common/ArenaInput";
import { Users, Radio, Sparkles, RefreshCw } from "lucide-react";
import clsx from "clsx";

const ADJECTIVES = ["Mighty", "Speedy", "Epic", "Golden", "Legendary", "Chill"];
const NOUNS = ["Player", "Warrior", "Seeker", "Wizard", "Ninja", "Champ"];

export default function GameEntryScreen() {
    const router = useRouter();
    const [step, setStep] = useState<"PIN" | "NAME">("PIN");
    const [pin, setPin] = useState("");
    const [username, setUsername] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [lobbyCount, setLobbyCount] = useState(124);

    // Mock live counter
    useEffect(() => {
        const interval = setInterval(() => {
            setLobbyCount((prev) => prev + (Math.random() > 0.8 ? 1 : 0));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handlePinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pin.length !== 4) return toast.error("Enter a 4-digit PIN");

        setIsProcessing(true);
        // Mock PIN validation
        await new Promise(r => setTimeout(r, 800));
        setIsProcessing(false);
        setStep("NAME");
    };

    const generateRandomName = () => {
        const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
        const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
        const num = Math.floor(Math.random() * 99);
        setUsername(`${adj}${noun}${num}`);
    };

    const handleFinalJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username) return toast.error("Choose a name first!");

        setIsProcessing(true);
        // Final Join Logic
        await new Promise(r => setTimeout(r, 1000));
        router.push(`/lobby?pin=${pin}&name=${username}`);
    };

    return (
        <div className="relative min-h-[500px] flex flex-col items-center justify-center p-6 overflow-hidden">

            {/* LIVE LOBBY COUNTER */}
            <div className="absolute top-0 right-0 m-4 md:m-8">
                <div className="flex items-center gap-3 bg-black/10 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl">
                    <Users className="w-5 h-5 text-brand-primary animate-pulse" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase leading-none opacity-60">In Lobby</span>
                        <span className="text-lg font-black tabular-nums tracking-tighter">{lobbyCount}</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-sm space-y-10 text-center">
                {/* STEP 1: PIN ENTRY */}
                {step === "PIN" && (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <div className="space-y-4 mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                                <Radio className="w-3 h-3 animate-ping" /> Live Arena
                            </div>
                            <h1 className="text-5xl font-black   uppercase tracking-tighter">
                                Enter the  <span className="text-brand-primary">Arena</span>
                            </h1>
                        </div>

                        <form onSubmit={handlePinSubmit} className="w-full space-y-6">
                            <div className="relative">

                                <ArenaInput
                                    placeholder="0000"
                                    label=""
                                    maxLength={4}
                                    className="text-center text-6xl font-black tracking-[1.5rem] h-28 bg-card border-b-[12px] border-brand-primary/30 focus:border-brand-primary shadow-2xl"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                />
                                <ArenaButton
                                    type="submit"
                                    isLoading={isProcessing}
                                    className="h-20 text-2xl font-black uppercase mt-4">

                                    Join Lobby
                                </ArenaButton>
                            </div>
                        </form>
                    </div>
                )}

                {/* STEP 2: NICKNAME SELECTION */}
                {step === "NAME" && (
                    <div className="animate-in slide-in-from-right fade-in duration-500">
                        <div className="space-y-4 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-600 text-[10px] font-black uppercase tracking-widest">
                                <Sparkles className="w-3 h-3" /> Almost There
                            </div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter">
                                What&apos;s your <span className="text-brand-primary">Nickname?</span>
                            </h1>
                            <p className="text-sm font-bold opacity-60">This is how you&apos;ll appear on the leaderboard!</p>
                        </div>

                        <form onSubmit={handleFinalJoin} className="space-y-6">
                            <div className="relative group">
                                <ArenaInput
                                    label=""
                                    placeholder="Type it here..."
                                    className="text-center text-3xl font-black h-20 bg-card border-b-[8px] border-brand-primary/30 focus:border-brand-primary"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={generateRandomName}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-muted hover:bg-brand-primary hover:text-white transition-all active:rotate-180"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                </button>
                            </div>

                            <ArenaButton type="submit" isLoading={isProcessing} className="h-20 text-2xl font-black uppercase">
                                Join Game!
                            </ArenaButton>

                            <button
                                type="button"
                                onClick={() => setStep("PIN")}
                                className="text-xs font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
                            >
                                ← Wrong PIN?
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}