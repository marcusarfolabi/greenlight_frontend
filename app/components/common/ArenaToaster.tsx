"use client";

import { Toaster, resolveValue, toast as hotToast } from "react-hot-toast";
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Quick utility for clean class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const ArenaToaster = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            toastOptions={{
                duration: 5000,
            }}
        >
            {(t) => (
                <div
                    className={cn(
                        "flex items-center gap-4 p-2 pl-4 rounded-full shadow-2xl transition-all duration-300 pointer-events-auto border backdrop-blur-xl",
                        "bg-card/95 border-border/50", // Use semantic theme variables
                        t.visible ? "animate-in fade-in slide-in-from-right-5" : "animate-out fade-out slide-out-to-right-5"
                    )}
                >
                    {/* Branded Icon Section */}
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "flex w-9 h-9 rounded-full items-center justify-center shrink-0 border-2",
                            t.type === 'error'
                                ? 'bg-destructive/10 border-destructive/20 text-destructive'
                                : 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary'
                        )}>
                            {t.type === 'success' && <CheckCircle2 size={18} strokeWidth={3} />}
                            {t.type === 'error' && <AlertCircle size={18} strokeWidth={3} />}
                            {t.type === 'loading' && <Loader2 size={18} strokeWidth={3} className="animate-spin" />}
                            {(t.type === 'blank' || t.type === 'custom') && <Info size={18} strokeWidth={3} />}
                        </div>

                        <div className="flex flex-col pr-2">
                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/80 leading-tight">
                                {t.type === 'success' ? 'Arena Success' : t.type === 'error' ? 'Entry Denied' : 'GreenLight Alert'}
                            </p>
                            <p className="text-[12px] text-foreground font-bold leading-tight">
                                {resolveValue(t.message, t)}
                            </p>
                        </div>
                    </div>

                    {/* Action/Dismiss Section */}
                    <div className="flex items-center pr-1 border-l border-border/50 pl-2">
                        <button
                            onClick={() => hotToast.dismiss(t.id)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                            aria-label="Dismiss"
                        >
                            <X size={14} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            )}
        </Toaster>
    );
};