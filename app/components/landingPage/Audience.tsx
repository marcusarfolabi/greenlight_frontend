"use client";

import { motion } from "framer-motion";
import { AUDIENCE_LIST } from "@/settings";
import { ChevronRight } from "lucide-react";

export const Audience = () => {
    return (
        <section className="relative py-24 bg-background transition-colors duration-300 overflow-hidden" aria-labelledby="audience-heading">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-primary mb-4">
                            Own the Spotlight
                        </p>
                        <h2 id="audience-heading" className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            BUILT FOR <span className="text-brand-primary text-outline">LEADERS</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground font-bold text-lg max-w-sm">
                        From boardrooms to stadiums, we give you the tools to command the crowd.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {AUDIENCE_LIST.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col h-full"
                        >
                            <div className={`absolute inset-0 translate-y-3 rounded-4xl ${item.color} opacity-20`} aria-hidden="true" />

                            <div className="relative flex-1 p-8 bg-card dark:bg-brand-navy border-2 border-brand-navy/10 dark:border-white/10 rounded-4xl shadow-[0_10px_0_0_rgba(0,0,0,0.05)] transition-all flex flex-col">
                                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg text-white group-hover:scale-110 group-hover:rotate-6 transition-transform`} aria-hidden="true">
                                    <item.icon size={28} strokeWidth={2.5} />
                                </div>

                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                                    {item.role}
                                </h3>

                                <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1">
                                    {item.useCase}
                                </p>

                                <button
                                    type="button"
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary group-hover:gap-4 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-brand-navy rounded-lg w-fit"
                                    aria-label={item.ariaLabel}
                                >
                                    Host This Arena <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-1 bg-linear-to-r from-brand-primary via-blue-500 to-purple-500 rounded-[3rem] overflow-hidden"
                >
                    <div className="bg-card dark:bg-brand-navy rounded-[2.9rem] py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
                                Ready to take control?
                            </h4>
                            <p className="font-bold text-muted-foreground text-lg">
                                Set up your first live session in less than 2 minutes.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="px-12 py-6 cursor-pointer bg-brand-primary text-white font-black rounded-2xl shadow-[0_8px_0_#1a5c2e] hover:shadow-[0_4px_0_#1a5c2e] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all uppercase tracking-widest text-lg"
                        >
                            Launch My Arena
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};