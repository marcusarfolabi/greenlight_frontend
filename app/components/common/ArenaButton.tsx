import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ArenaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    isLoading?: boolean;
}

export const ArenaButton = ({
    children,
    className,
    variant = "primary",
    isLoading,
    ...props
}: ArenaButtonProps) => {
    const variants = {
        primary: "bg-brand-primary shadow-[0_6px_0_rgb(22,101,52)] active:shadow-none enabled:hover:bg-brand-primary/90",
        secondary: "bg-brand-navy shadow-[0_6px_0_rgb(15,23,42)] active:shadow-none enabled:hover:bg-brand-navy/90 text-white",
    };

    return (
        <button
            className={clsx(
                "relative w-full text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-sm active:translate-y-1.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-[6px]",
                variants[variant],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            <div className="flex items-center justify-center gap-2">
                {isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin stroke-[3px]" />
                )}
                <span>{isLoading ? "Entering Arena..." : children}</span>
            </div>
        </button>
    );
};