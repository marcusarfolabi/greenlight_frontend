"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => { };

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const isClient = React.useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
    if (!isClient) return <div className="h-12 w-12" />;

    const toggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, y: 3 }}
            onClick={toggleTheme}
            className="relative group flex h-8 w-8 items-center justify-center rounded-xl bg-brand-navy dark:bg-white text-white dark:text-brand-navy shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none transition-all"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={resolvedTheme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {resolvedTheme === "light" ? (
                        <Sun size={18} strokeWidth={2.5} />
                    ) : (
                        <Moon size={18} strokeWidth={2.5} />
                    )}
                </motion.div>
            </AnimatePresence>

            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 rounded bg-brand-navy dark:bg-brand-leaf px-2 py-1 text-[10px] font-black text-white dark:text-brand-navy group-hover:scale-100 transition-all uppercase tracking-wider">
                {resolvedTheme} mode
            </span>
        </motion.button>
    );
}