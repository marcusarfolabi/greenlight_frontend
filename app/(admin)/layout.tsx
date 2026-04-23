"use client";

import { useState } from "react";
import { LayoutDashboard, PlusSquare, History, Settings, LogOut, Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Create Quiz", href: "/quiz/new", icon: PlusSquare },
        { name: "Live Sessions", href: "/live", icon: Zap },
        { name: "History", href: "/history", icon: History },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="relative min-h-screen bg-[#F8F9FA]">
            {/* --- TOP HEADER --- */}
            {/* Added h-16 md:h-20 for a bit more air on desktop */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-slate-100 z-50 flex items-center justify-between px-4 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-primary/20">
                            <Zap className="w-5 h-5 text-white fill-current" />
                        </div>
                        <span className="font-black text-lg lg:text-xl tracking-tighter uppercase">Arena</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                        <p className="text-[10px] font-black uppercase text-primary leading-none mb-1">Host Mode</p>
                        <p className="text-xs font-bold uppercase tracking-tight leading-none">David Host</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-black text-primary text-sm">
                        DH
                    </div>
                </div>
            </header>

            {/* --- SIDEBAR --- */}
            <aside className={`
                fixed left-0 top-16 bottom-0 w-64 bg-white border-r-2 border-slate-100 z-40 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <nav className="p-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)} // Close on mobile link click
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl font-black text-sm transition-all uppercase tracking-wide
                                    ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/30 translate-x-1"
                                        : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}
                                `}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-6 left-4 right-4">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-black text-sm text-red-500 hover:bg-red-50 transition-colors uppercase tracking-wide">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>
            
            <main className="transition-all duration-300 pt-20 lg:pt-24 lg:pl-64 min-h-screen">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}