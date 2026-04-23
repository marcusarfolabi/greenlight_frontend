import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export type SocialProvider = "google" | "apple" | "linkedin";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    provider: SocialProvider;
    isLoading?: boolean;
}

export const SocialButton = ({ provider, isLoading, className, ...props }: SocialButtonProps) => {
    const label = provider.charAt(0).toUpperCase() + provider.slice(1);

    return (
        <button
            type="button"
            disabled={isLoading}
            className={clsx(
                "group relative cursor-pointer w-full h-12 px-4 rounded-xl transition-all duration-200",
                "flex items-center justify-center gap-3 border",
                "text-sm font-semibold tracking-tight",
                "bg-white text-slate-700 border-slate-200 shadow-sm",
                "hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900",
                "dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800",
                "dark:hover:bg-zinc-800 dark:hover:border-zinc-700 dark:hover:text-white",
                "active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",

                className
            )}
            {...props}
        >
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-background bg-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {`Continue with ${label}`}
            </span>
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            ) : (
                <div className="flex items-center justify-center w-5 h-5">
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
                        <svg viewBox="0 0 384 512" className="w-4.5 h-4.5 fill-current">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-14.7 0-51.4-22.2-84.5-20.5-43 1.9-82.3 28.5-103.5 65.1-42.6 73.7-10.9 181.8 30.2 241.2 20.1 29 44.4 61.3 75.8 60.1 29.8-1.1 41.2-19.1 77.2-19.1 35.5 0 46.1 19.1 77.7 18.5 32-1 54.1-29.3 73.9-58.1 22.9-33.5 32.3-65.9 32.7-67.6-.7-.3-63.7-24.4-63.8-97zM249.1 82c16.1-20.3 27-48.4 24.1-76.5-24.1 1-53.1 16.1-70.3 36.5-15.4 18-28.5 46.8-24.8 74.3 26.7 2.1 54-13.8 71-34.3z" />
                        </svg>
                    )}
                    {provider === "linkedin" && (
                        <svg viewBox="0 0 448 512" className="w-4.5 h-4.5 fill-[#0077B5]">
                            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.86 53.86 0 1 1 0-107.72 53.86 53.86 0 0 1 0 107.72zM447.9 448h-92.68V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.8-43.8 31v173h-92.68s1.24-280 0-309h92.68v43.8c12.3-19 34.3-46 83.5-46 60.8 0 106.5 39.6 106.5 124.7V448z" />
                        </svg>
                    )}
                </div>
            )}

            <span className="truncate">
                {isLoading ? "Connecting..." : ` ${label}`}
            </span>
        </button>
    );
};
