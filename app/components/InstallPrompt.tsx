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
        <div className="fixed bottom-4 left-6 right-6 px-4 md:px-0 md:left-auto md:bottom-10 z-50 flex justify-center animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center gap-4 bg-brand-navy/95 dark:bg-card/95 backdrop-blur-md border border-white/10 p-2 pl-4 rounded-full shadow-xl max-w-sm md:max-w-md">

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex w-8 h-8 bg-brand-primary/20 text-brand-primary rounded-full items-center justify-center shrink-0">
                        <Download size={16} strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[11px] md:text-xs font-black uppercase tracking-widest text-white leading-none">
                            GreenLight App
                        </p>
                        <p className="hidden md:block text-[10px] text-muted-foreground font-bold mt-0.5">
                            Install for zero-lag performance
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={handleInstallClick}
                        className="bg-brand-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-brand-primary/90 transition-all whitespace-nowrap"
                    >
                        Install
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-1.5 text-muted-foreground hover:text-white transition-colors"
                        aria-label="Dismiss"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};