import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ArenaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
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
        // We use a CSS variable for the shadow color that matches your brand
        primary: "bg-brand-primary shadow-[0_6px_0_var(--brand-primary-dark)] enabled:hover:bg-brand-primary/90",

        // Secondary now pulls from your theme's navy/foreground
        secondary: "bg-card border-2 border-border text-foreground shadow-[0_6px_0_var(--border)] active:shadow-none enabled:hover:bg-muted",

        // Added an outline version for less important actions
        outline: "bg-transparent border-2 border-border text-muted-foreground hover:bg-muted shadow-none active:translate-y-0"
    };

    return (
        <button
            className={clsx(
                "relative w-full text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-sm active:translate-y-[6px] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-[6px]",
                // Only primary and secondary get the 3D white text
                variant !== "outline" && "text-white",
                variants[variant],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin stroke-[3px]" />
                        <span className="opacity-90">Processing...</span>
                    </>
                ) : (
                    children
                )}
            </div>
        </button>
    );
};