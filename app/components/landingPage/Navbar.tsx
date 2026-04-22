"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "../theme-toggle"
import { NAV_LINKS } from "@/settings"
import { AUTH_URL } from "@/app/lib/constants"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <nav className="sticky top-0 z-50 w-full bg-background border-b border-black/5 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-1">

                {/* LEFT: Logo & Desktop Links */}
                <div className="flex items-center gap-4 lg:gap-8">
                    <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity">
                        <Image
                            src="/greenlight.png"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                            priority
                        />
                        <span className="text-xs sm:text-lg lg:text-xl font-black tracking-tighter text-foreground">
                            Green<span className="text-btn-primary">Light</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                prefetch
                                href={link.href}
                                className="text-sm font-bold text-foreground/80 hover:text-brand-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Actions */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <Link href="/play" className="text-[11px] sm:text-sm font-black uppercase hover:text-brand-primary px-1">
                        Play
                    </Link>

                    <Link
                        href={`${AUTH_URL}/signup`} prefetch
                        className="btn-quiz py-1.5 px-3 sm:py-2 sm:px-5 text-[10px] sm:text-xs lg:text-sm whitespace-nowrap"
                    >
                        Start for FREE
                    </Link>

                    <Link href={`${AUTH_URL}/login`} prefetch className="text-[11px] sm:text-sm font-black uppercase hover:text-brand-primary px-1">
                        Log in
                    </Link>

                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Hamburger Menu Trigger - Only visible on Mobile/Tablet */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden p-1 text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                        aria-label="Open Menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* MOBILE SIDEBAR DRAWER (Slides from Left) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-60"
                        />

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-full w-70 bg-background z-70 shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-black text-foreground">Menu</span>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-black text-foreground/40 hover:text-brand-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-foreground/10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm">Appearance</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    )
}