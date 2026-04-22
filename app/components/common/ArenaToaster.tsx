"use client";

import { Toaster, resolveValue } from "react-hot-toast";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

export const ArenaToaster = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 5000,
            }}
        >
            {(t) => (
                <div
                    className={`${t.visible ? "animate-in fade-in slide-in-from-right-5" : "animate-out fade-out slide-out-to-right-5"
                        } flex items-center gap-4 bg-brand-navy/95 dark:bg-card/95 backdrop-blur-md border border-white/10 p-2 pl-4 rounded-full shadow-2xl transition-all duration-300 pointer-events-auto`}
                >
                    {/* Branded Icon Section */}
                    <div className="flex items-center gap-3">
                        <div className={`flex w-8 h-8 rounded-full items-center justify-center shrink-0 
                ${t.type === 'error' ? 'bg-red-500/20 text-red-500' : 'bg-brand-primary/20 text-brand-primary'}`}
                        >
                            {t.type === 'success' && <CheckCircle2 size={16} strokeWidth={3} />}
                            {t.type === 'error' && <AlertCircle size={16} strokeWidth={3} />}
                            {t.type === 'loading' && <Info size={16} strokeWidth={3} className="animate-spin" />}
                            {t.type === 'blank' && <Info size={16} strokeWidth={3} />}
                        </div>

                        <div className="flex flex-col min-w-30">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none">
                                {t.type === 'success' ? 'Arena Success' : t.type === 'error' ? 'Entry Denied' : 'GreenLight Notification'}
                            </p>
                            <p className="text-[11px] text-slate-400 font-bold mt-0.5 whitespace-nowrap">
                                {resolveValue(t.message, t)}
                            </p>
                        </div>
                    </div>

                    {/* Action/Dismiss Section */}
                    <div className="flex items-center pr-1 border-l border-white/10 pl-2 ml-1">
                        <button
                            onClick={() => import('react-hot-toast').then(m => m.default.dismiss(t.id))}
                            className="p-1.5 text-muted-foreground hover:text-white transition-colors"
                            aria-label="Dismiss"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}
        </Toaster>
    );
};