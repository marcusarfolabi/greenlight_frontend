"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface ArenaInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    rightElement?: ReactNode;
    error?: string;
}

export const ArenaInput = ({
    label,
    rightElement,
    error,
    className,
    type,
    ...props
}: ArenaInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine if we need to show the toggle
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-brand-navy/60 dark:text-white/60">
                    {label}
                </label>
                {rightElement}
            </div>

            <div className="relative group">
                <input
                    type={inputType}
                    className={clsx(
                        "w-full px-5 py-4 rounded-2xl border-2 font-bold outline-none transition-all placeholder:text-slate-400 pr-12",
                        "border-slate-100 bg-slate-50 text-brand-navy",
                        "dark:border-white/5 dark:bg-white/5 dark:text-white",
                        "focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10",
                        error ? "border-red-500 focus:border-red-500" : "",
                        className
                    )}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        // Dynamic labels for screen readers and tooltips
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-brand-primary transition-colors focus:outline-none focus:text-brand-primary"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff size={20} strokeWidth={2.5} aria-hidden="true" />
                        ) : (
                            <Eye size={20} strokeWidth={2.5} aria-hidden="true" />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-[10px] font-bold text-red-500 uppercase px-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
};