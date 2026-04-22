// components/common/SocialButton.tsx
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Image from "next/image";

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
                "w-full bg-white dark:bg-slate-100 text-slate-900 font-black py-3.5 rounded-2xl transition-all",
                "border-2 border-slate-200 dark:border-transparent",
                "shadow-[0_4px_0_rgb(226,232,240)] active:shadow-none active:translate-y-1",
                "flex items-center justify-center gap-3 uppercase tracking-widest text-xs",
                "disabled:opacity-70 disabled:pointer-events-none",
                className
            )}
            {...props}
        >
            {provider === "google" && (
                <Image 
                    src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                />
            )}
            <span>{isLoading ? "Connecting..." : `Continue with ${provider}`}</span>
        </button>
    );
};