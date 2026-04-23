import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ArenaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    isLoading?: boolean;
    size?: "default" | "sm";
    tooltip?: string; // Add this prop
}

export const ArenaButton = ({
    children,
    className,
    size = "default",
    variant = "primary",
    isLoading,
    tooltip, // Destructure tooltip
    ...props
}: ArenaButtonProps) => {

    const variants = {
        primary: "bg-brand-primary shadow-[0_6px_0_var(--brand-primary-dark)] enabled:hover:bg-brand-primary/90",
        secondary: "bg-card border-2 border-border text-foreground shadow-[0_6px_0_var(--border)] active:shadow-none enabled:hover:bg-muted",
        outline: "bg-transparent border-2 border-border text-muted-foreground hover:bg-muted shadow-none active:translate-y-0"
    };

    return (
        <button
            className={clsx(
                "group/tooltip relative w-full cursor-pointer text-bg-brand-primary font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-sm active:translate-y-1.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-1.5",
                "hover:brightness-110",
                variant !== "outline" && "text-bg-brand-primary",
                variants[variant],
                size === "sm" ? "py-2 px-4" : "py-4",
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {/* Tooltip implementation */}
            {tooltip && (
                <span className="hidden md:block group-hover/tooltip:opacity-100 absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-[10px] font-bold text-white bg-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-black">
                    {tooltip}
                </span>
            )}

           <div className="flex items-center justify-center gap-2 active:scale-95 transition-transform">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
            </div>
        </button>
    );
};