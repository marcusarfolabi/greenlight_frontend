"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation"; // To send them to the lobby
import { toast } from "react-hot-toast";
import { ArenaButton } from "@/app/components/common/ArenaButton";
import { ArenaInput } from "@/app/components/common/ArenaInput";

const playSchema = z.object({
    otp: z.string().length(4, "Code must be 4 digits"),
});

type PlayValues = z.infer<typeof playSchema>;

export default function PlayVerifyScreen() {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlayValues>({
        resolver: zodResolver(playSchema),
    });

    const onVerifyCode = async (data: PlayValues) => {
        setIsVerifying(true);
        try {
            // 1. Call your API to verify the OTP
            // const response = await api.auth.verifyOtp(data.otp);

            await new Promise((resolve) => setTimeout(resolve, 1500)); // Mock API delay

            toast.success("Identity Verified!");

            // 2. Redirect to the Lobby/Waiting Room as per PRD
            // You might pass a game ID or session ID here
            router.push("/lobby");
        } catch (err) {
            toast.error("Invalid or expired code. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">
            {/* Header / Branding */}
            <div className="text-center space-y-2">
                <div className="bg-brand-primary w-16 h-16 rounded-2xl rotate-12 mx-auto flex items-center justify-center mb-4 shadow-xl">
                    <span className="text-white text-3xl font-black -rotate-12">?</span>
                </div>
                <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">
                    Enter the Arena
                </h1>
                <p className="text-muted-foreground font-bold text-sm">
                    Check your email for the 4-digit entry code
                </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleSubmit(onVerifyCode)} className="w-full space-y-6">
                <div className="relative">
                    <ArenaInput
                        label=""
                        placeholder="0 0 0 0"
                        max={4}
                        maxLength={4}
                        className="text-center text-5xl font-black tracking-[1rem] h-24 bg-muted/30 border-b-8 focus:border-brand-primary transition-all"
                        {...register("otp")}
                        error={errors.otp?.message}
                    />
                </div>

                <ArenaButton
                    type="submit"
                    isLoading={isVerifying}
                    className="h-16 text-xl font-black uppercase tracking-widest shadow-lg active:translate-y-1 transition-transform"
                >
                    Join Lobby
                </ArenaButton>
            </form>

            {/* Secondary Actions */}
            <div className="flex flex-col items-center space-y-4">
                <button
                    type="button"
                    className="text-xs font-black uppercase text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => toast.success("New code sent!")}
                >
                    Didn&apos;t get a code? <span className="text-brand-primary">Resend</span>
                </button>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-xs font-bold opacity-40 hover:opacity-100 transition-opacity"
                >
                    Wrong email? Go back
                </button>
            </div>

            {/* Waiting Room Preview (Visual Hint) */}
            <div className="pt-8 opacity-20 pointer-events-none">
                <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-background" />
                    ))}
                    <div className="text-xs font-black flex items-center pl-6 whitespace-nowrap">
                        12 PLAYERS WAITING...
                    </div>
                </div>
            </div>
        </div>
    );
}