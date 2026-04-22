"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

interface Option {
    value: string;
    label: string;
}

interface ArenaSelectProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string; // Added error prop
}

export const ArenaSelect = ({
    label,
    options,
    value,
    onChange,
    placeholder,
    error
}: ArenaSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className="space-y-2 relative" ref={containerRef}>
            <label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground/80 px-1">
                {label}
            </label>

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-sm font-bold outline-none",
                    "bg-muted/30 dark:bg-card/40",
                    // Dynamic Border Logic
                    error
                        ? "border-destructive focus:border-destructive focus:ring-4 focus:ring-destructive/10"
                        : "border-border/60 focus:border-brand-primary/50",
                    isOpen && !error && "border-brand-primary ring-4 ring-brand-primary/10"
                )}
            >
                <span className={clsx(!selectedOption && "text-muted-foreground/60")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={18} className={clsx("transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {/* Error Message */}
            {error && (
                <p className="text-[10px] font-black text-destructive uppercase px-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 p-1.5 bg-card border-2 border-border rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
                    <div className="max-h-60 overflow-y-auto p-0.5 space-y-1 custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={clsx(
                                    "w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-colors text-left",
                                    value === option.value
                                        ? "bg-brand-primary/10 text-brand-primary"
                                        : "hover:bg-muted/50 text-foreground"
                                )}
                            >
                                <span className="truncate pr-4">{option.label}</span>
                                {value === option.value && (
                                    <Check size={16} strokeWidth={3} className="shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};