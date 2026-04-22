"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Zap,
    ShieldCheck,
    BarChart3,
    Settings2,
    Timer,
    Wallet,
    LucideProps
} from "lucide-react";
import { FEATURES } from "@/settings";



const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export const Features = () => {
    return (
        <section className="relative py-24 overflow-hidden transition-colors duration-300" aria-labelledby="features-heading">
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2w-125 h-125 bg-brand-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        id="features-heading"
                        className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6"
                    >
                        Built for <span className="text-brand-primary">Speed</span>
                    </motion.h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-bold text-lg">
                        High-performance tools for both participants and administrators.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {FEATURES.map((f, i) => {
                        const IconComponent = f.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="relative group cursor-pointer"
                            > 
                                <div className={`absolute inset-0 translate-y-2 rounded-4xl opacity-20 ${f.color}`} />

                                <div className="relative p-8 bg-card dark:bg-brand-navy rounded-4xl border-2 border-brand-navy/10 dark:border-white/10 shadow-[0_8px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-2 transition-all">
                                    <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                                        <IconComponent size={32} className="text-white" />
                                    </div>

                                    <h3 className="text-2xl font-black uppercase mb-3 tracking-tight">
                                        {f.title}
                                    </h3>
                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                        {f.desc}
                                    </p>
                                    <span className="sr-only">{f.aria}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};