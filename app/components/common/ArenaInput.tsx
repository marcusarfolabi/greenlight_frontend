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

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground/80">
                    {label}
                </label>
                {rightElement}
            </div>

            <div className="relative group">
                <input
                    type={inputType}
                    className={clsx(
                        "w-full px-5 py-4 rounded-2xl border-2 font-bold outline-none transition-all pr-12",
                        // Dynamic Theme Mapping
                        "bg-muted/30 border-border/60 text-foreground",
                        "dark:bg-card/40 dark:border-border/40",
                        "placeholder:text-muted-foreground/50",
                        // Focus States
                        "focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10",
                        // Error States
                        error ? "border-destructive focus:border-destructive focus:ring-destructive/10" : "",
                        className
                    )}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/60 hover:text-brand-primary transition-colors focus:outline-none focus:text-brand-primary"
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
                <p className="text-[10px] font-black text-destructive uppercase px-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
};