"use client";

import Link from "next/link";
import { FOOTER_ACTIONS } from "@/settings";

export function StickyActionFooter() {
    return (
        <div className="sticky bottom-0 z-50 w-full px-4 py-6 pointer-events-none">
            <div className="max-w-7xl mx-auto">
                <div className="pointer-events-auto bg-brand-navy dark:bg-brand-navy/90 backdrop-blur-md rounded-3xl p-4 lg:p-6 shadow-2xl border border-white/10">

                    <div className="flex items-center justify-between mb-6 gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-white font-black text-lg md:text-xl tracking-tighter">
                                Green<span className="text-brand-leaf">Light</span> <span className="bg-white text-brand-navy px-1.5 rounded ml-1 text-xs md:text-sm">GO</span>
                            </span>
                            <p className="text-white/80 text-sm font-bold hidden md:block">
                                Try now! The NEW and easy way to engage and learn for FREE!
                            </p>
                        </div>
                        <Link
                            href="/signup"
                            className="bg-white text-brand-navy px-4 py-2 md:px-6 rounded-lg font-black text-xs md:text-sm hover:bg-brand-leaf transition-colors whitespace-nowrap"
                            aria-label="Start for free now"
                        >
                            Start for FREE
                        </Link>
                    </div>
                    <div className="grid grid-cols-5 gap-2 md:gap-4">
                        {FOOTER_ACTIONS.map((action) => (
                            <button
                                key={action.name}
                                type="button"
                                className="flex flex-col items-center gap-2 group transition-all"
                                aria-label={`Maps to ${action.name}`}
                            >
                                <div className={`${action.color} w-full aspect-square md:w-auto md:aspect-auto flex items-center justify-center p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg group-hover:scale-105 transition-transform`}>
                                    <action.icon className="text-white h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                                </div>

                                <div className="text-center">
                                    <p className="text-white font-bold text-[10px] md:text-sm tracking-tight">
                                        {action.name}
                                    </p>
                                    <p className="hidden lg:block text-white/60 text-[10px] mt-1 leading-tight">
                                        {action.desc}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
