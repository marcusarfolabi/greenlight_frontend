"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/settings";


export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-4 transition-colors duration-300 relative overflow-hidden">
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-brand-primary/20 blur-[120px] pointer-events-none -z-10"
                aria-hidden="true"
            />
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">

                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-foreground">
                        Frequently Asked <span className="text-brand-primary text-outline">Questions</span>
                    </h2>
                    <p className="text-muted-foreground font-bold italic">
                        Everything you need to know to start your first session.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className="border-2 border-brand-navy/10 dark:border-white/10 rounded-3xl overflow-hidden bg-card transition-all"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
                                aria-expanded={activeIndex === i}
                            >
                                <span className="text-lg md:text-xl font-black tracking-tight text-foreground">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                    className="text-brand-primary"
                                >
                                    <ChevronDown size={24} strokeWidth={3} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 md:px-8 pb-8">
                                            <div className="h-px w-full bg-brand-navy/5 dark:bg-white/5 mb-6" />
                                            <p className="text-muted-foreground font-medium leading-relaxed text-base md:text-lg">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};