"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export const InstallPrompt = () => { 
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e as BeforeInstallPromptEvent);
            setIsVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) return;

        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;

        if (outcome === "accepted") {
            setInstallPrompt(null);
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 z-50 animate-in fade-in slide-in-from-bottom-5">
            <div className="bg-brand-navy dark:bg-card border-2 border-brand-primary/50 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 max-w-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shrink-0">
                        <Download size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-black uppercase text-white">Install GreenLight</p>
                        <p className="text-xs text-muted-foreground font-medium">Add to home screen for the best experience.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleInstallClick}
                        className="bg-brand-primary text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight hover:scale-105 active:scale-95 transition-all"
                    >
                        Install
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-2 text-muted-foreground hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};