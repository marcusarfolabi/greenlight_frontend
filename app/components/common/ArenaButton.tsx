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
        primary: "bg-brand-primary shadow-[0_6px_0_var(--brand-primary-dark)] enabled:hover:bg-brand-primary/90", 
        secondary: "bg-card border-2 border-border text-foreground shadow-[0_6px_0_var(--border)] active:shadow-none enabled:hover:bg-muted",
        outline: "bg-transparent border-2 border-border text-muted-foreground hover:bg-muted shadow-none active:translate-y-0"
    };

    return (
        <button
            className={clsx(
                "relative w-full cursor-pointer text-bg-brand-primary font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-sm active:translate-y-1.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-1.5",
                variant !== "outline" && "text-bg-brand-primary",
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