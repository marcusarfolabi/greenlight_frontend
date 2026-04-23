"use client";

import { ArenaButton } from "@/app/components/common/ArenaButton";
import { ArenaInput } from "@/app/components/common/ArenaInput";
import { SocialAuthSection } from "@/app/components/common/SocialAuthSection";
import { SocialProvider } from "@/app/components/common/SocialButton";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [activeProvider, setActiveProvider] = useState<SocialProvider | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success("Entry Granted!");
        } catch (error) {
            toast.error("Invalid credentials. Please check your password.");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: SocialProvider) => {
        setActiveProvider(provider);
        try {
            // Simulate OAuth redirect
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success(`Redirecting to ${provider.charAt(0).toUpperCase()}${provider.slice(1)}...`);
        } finally {
            setActiveProvider(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-black text-foreground tracking-tight">
                    Welcome Back!
                </h1>
            </div>

            <SocialAuthSection activeProvider={activeProvider} onProviderClick={handleSocialLogin} />
            <form onSubmit={handleLogin} className="space-y-4">
                <ArenaInput
                    label="Email or Username"
                    placeholder="e.g. afolabi_dev"
                    type="text"
                />

                <ArenaInput
                    label="Password"
                    placeholder="••••••••"
                    type="password"
                    rightElement={
                        <Link href="/forgot" className="text-[10px] font-black text-brand-primary uppercase hover:underline">
                            Forgot?
                        </Link>
                    }
                />

                <ArenaButton isLoading={loading} type="submit" className="mt-4">
                    Log In
                </ArenaButton>
            </form>

            <div className="text-center pt-2">
                <p className="text-sm font-bold text-muted-foreground">
                    Don&lsquo;t have an account?{" "}
                    <Link href="/signup" className="text-brand-primary hover:underline font-black">
                        Sign up for FREE
                    </Link>
                </p>
            </div>
        </div>
    );
}
