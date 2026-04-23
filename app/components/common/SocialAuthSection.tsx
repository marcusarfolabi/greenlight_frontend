"use client";

import { SocialButton, SocialProvider } from "@/app/components/common/SocialButton";

const SOCIAL_PROVIDERS: SocialProvider[] = ["google", "apple", "linkedin"];

interface SocialAuthSectionProps {
    activeProvider?: SocialProvider | null;
    dividerLabel?: string;
    onProviderClick: (provider: SocialProvider) => void | Promise<void>;
}

export function SocialAuthSection({
    activeProvider = null,
    dividerLabel = "Or Use Email",
    onProviderClick,
}: SocialAuthSectionProps) {
    return (
        <>
            <div className="space-y-3">
                <div className="flex items-center gap-1 w-full">
                    {SOCIAL_PROVIDERS.map((provider) => (
                        <SocialButton
                            key={provider}
                            provider={provider}
                            isLoading={activeProvider === provider}
                            onClick={() => onProviderClick(provider)}
                            className="flex-1"
                        />
                    ))}
                </div>
            </div>

            <div className="relative py-2 flex items-center">
                <div className="grow border-t border-border"></div>
                <span className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    {dividerLabel}
                </span>
                <div className="grow border-t border-border"></div>
            </div>
        </>
    );
}
