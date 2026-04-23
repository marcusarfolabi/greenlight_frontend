"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    PlusSquare,
    History,
    Settings,
    LogOut,
    Menu,
    X,
    Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
        <div className="min-h-screen bg-[#F8F9FA]">
            {/* --- TOP HEADER --- */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-border z-50 flex items-center justify-between px-4 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 hover:bg-accent rounded-lg"
                    >
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white fill-current" />
                        </div>
                        <span className="font-black text-xl tracking-tighter uppercase">Arena Admin</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-black uppercase">David Host</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Administrator</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-black">
                        DH
                    </div>
                </div>
            </header>

            {/* --- SIDEBAR --- */}
            <aside className={`
        fixed left-0 top-16 bottom-0 w-64 bg-white border-r-2 border-border z-40 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                <nav className="p-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
                  ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"}
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className={`
        pt-16 transition-all duration-300
        lg:pl-64
      `}>
                <div className="p-6 lg:p-10">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}