// components/common/SocialButton.tsx
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    provider: "google" | "apple";
    isLoading?: boolean;
}

export const SocialButton = ({ provider, isLoading, className, ...props }: SocialButtonProps) => {
    return (
        <button
            type="button"
            disabled={isLoading}
            className={clsx(
                // Layout & Base Typography
                "w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] font-black",

                // Theme Colors: Use semantic 'card' or 'white' to keep it distinct from the main CTA
                "bg-white text-slate-900 border-2 border-slate-200",
                "dark:bg-slate-50 dark:border-slate-300",

                // 3D Shadow: Linked to the border color variable
                "shadow-[0_5px_0_var(--border)] active:shadow-none active:translate-y-[5px]",

                // States
                "disabled:opacity-70 disabled:pointer-events-none disabled:shadow-none disabled:translate-y-[5px]",
                "hover:bg-slate-50 dark:hover:bg-white transition-colors",
                className
            )}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
                <>
                    {provider === "google" && (
                        <Image
                            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                            alt="Google Logo"
                            width={20}
                            height={20}
                            className="w-5 h-5 object-contain"
                        />
                    )}
                    {provider === "apple" && (
                        <svg viewBox="0 0 384 512" width="18" height="18" className="fill-current">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-14.7 0-51.4-22.2-84.5-20.5-43 1.9-82.3 28.5-103.5 65.1-42.6 73.7-10.9 181.8 30.2 241.2 20.1 29 44.4 61.3 75.8 60.1 29.8-1.1 41.2-19.1 77.2-19.1 35.5 0 46.1 19.1 77.7 18.5 32-1 54.1-29.3 73.9-58.1 22.9-33.5 32.3-65.9 32.7-67.6-.7-.3-63.7-24.4-63.8-97zM249.1 82c16.1-20.3 27-48.4 24.1-76.5-24.1 1-53.1 16.1-70.3 36.5-15.4 18-28.5 46.8-24.8 74.3 26.7 2.1 54-13.8 71-34.3z" />
                        </svg>
                    )}
                </>
            )}

            <span>{isLoading ? "Connecting..." : `Continue with ${provider}`}</span>
        </button>
    );
};