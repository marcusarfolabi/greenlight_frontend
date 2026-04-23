"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { ArenaButton } from "@/app/components/common/ArenaButton";
import { ArenaInput } from "@/app/components/common/ArenaInput";
import { ArrowLeft, MailCheck, ShieldCheck, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Updated Schema to handle all three stages
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid Email"),
    otp: z.string().length(4, "Code must be 4 digits").optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
type Step = "EMAIL" | "CONFIRMATION" | "VERIFY" | "RESET_PASSWORD";

export default function ForgotPasswordForm() {
    const [currentStep, setCurrentStep] = useState<Step>("EMAIL");
    const [countdown, setCountdown] = useState(5);
    const router = useRouter(); // 2. Initialize it
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "", otp: "", password: "", confirmPassword: "" }
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (currentStep === "CONFIRMATION" && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (currentStep === "CONFIRMATION" && countdown === 0) {
            setCurrentStep("VERIFY");
        }
        return () => clearTimeout(timer);
    }, [currentStep, countdown]);

    // 1. Send Email only
    const onEmailSubmit = async (data: ForgotPasswordValues) => {
        try {
            console.log("Stage 1: Sending Email ->", { email: data.email });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCurrentStep("CONFIRMATION");
            toast.success("Reset code sent!");
        } catch (err) {
            toast.error("Could not send reset email.");
        }
    };

    // 2. Send Email + OTP
    const onOtpSubmit = async (data: ForgotPasswordValues) => {
        try {
            console.log("Stage 2: Verifying OTP ->", { email: data.email, otp: data.otp });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Identity Verified!");
            setCurrentStep("RESET_PASSWORD");
        } catch (err) {
            toast.error("Invalid code.");
        }
    };

    // 3. Send Email + New Password
    const onPasswordSubmit = async (data: ForgotPasswordValues) => {
        try {
            console.log("Stage 3: Resetting Password ->", { email: data.email, password: data.password });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Password Reset Successful!");
            router.push("/login");
        } catch (err) {
            toast.error("Failed to reset password.");
        }
    };

    // --- RENDER VIEWS ---

    if (currentStep === "CONFIRMATION") {
        return (
            <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full relative">
                        <MailCheck className="w-10 h-10 text-primary" />
                        <div className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-background">
                            {countdown}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tight">Check your inbox</h1>
                    <p className="text-muted-foreground text-sm">Sent to <span className="font-bold text-foreground">{getValues("email")}</span></p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest pt-4">Redirecting in {countdown}s...</p>
                </div>
                <ArenaButton onClick={() => setCurrentStep("VERIFY")} variant="outline">Verify Now</ArenaButton>
            </div>
        );
    }

    if (currentStep === "VERIFY") {
        return (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4"><ShieldCheck className="w-12 h-12 text-primary" /></div>
                    <h1 className="text-3xl font-black tracking-tight">Verify Identity</h1>
                    <p className="text-muted-foreground font-medium">Enter the 4-digit code sent to your email</p>
                </div>
                <form onSubmit={handleSubmit(onOtpSubmit)} className="space-y-6">
                    <ArenaInput
                        label="Security Code"
                        placeholder="0 0 0 0"
                        maxLength={4}
                        className="text-center text-2xl tracking-[1em] font-mono"
                        {...register("otp")}
                        error={errors.otp?.message}
                    />
                    <ArenaButton isLoading={isSubmitting} type="submit">Confirm Code</ArenaButton>
                    <button type="button" onClick={() => { setCurrentStep("EMAIL"); setCountdown(5); }} className="w-full text-xs text-muted-foreground hover:text-primary font-bold transition-colors">Resend Code</button>
                </form>
            </div>
        );
    }

    if (currentStep === "RESET_PASSWORD") {
        return (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4"><LockKeyhole className="w-12 h-12 text-primary" /></div>
                    <h1 className="text-3xl font-black tracking-tight">New Password</h1>
                    <p className="text-muted-foreground font-medium">Create a strong password for your account</p>
                </div>
                <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-5">
                    <ArenaInput
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        error={errors.password?.message}
                    />
                    <ArenaInput
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                    />
                    <div className="pt-2">
                        <ArenaButton isLoading={isSubmitting} type="submit">Update Password</ArenaButton>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-black capitalize text-foreground tracking-tight">Forgot Password?</h1>
                <p className="text-muted-foreground font-medium mt-2">Enter your email to get back into the Arena</p>
            </div>
            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-5">
                <ArenaInput label="Email" type="email" placeholder="name@company.com" {...register("email")} error={errors.email?.message} />
                <div className="pt-2"><ArenaButton isLoading={isSubmitting} type="submit">Send Reset Code</ArenaButton></div>
                <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
            </form>
        </div>
    );
}