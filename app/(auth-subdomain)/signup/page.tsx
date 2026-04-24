"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { ArenaButton } from "@/app/components/common/ArenaButton";
import { ArenaInput } from "@/app/components/common/ArenaInput";
import { SocialProvider } from "@/app/components/common/SocialButton";
import { HostSignupValues, hostSignupSchema } from "@/app/lib/validations/auth";
import { INDUSTRY_OPTIONS } from "@/settings";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Added role to the schema
const extendedSignupSchema = hostSignupSchema.extend({
    otp: z.string(),
    role: z.enum(["USER", "HOST"]),
    username: z.string().min(3, "Username required"),
});

type ExtendedSignupValues = HostSignupValues & { otp: string; role: "USER" | "HOST"; username: string };
// New Step: ROLE_SELECTION
type Step = "ROLE_SELECTION" | "EMAIL" | "VERIFY" | "INDUSTRY" | "DETAILS";

export default function SignupForm() {
    const [currentStep, setCurrentStep] = useState<Step>("ROLE_SELECTION");
    const [activeProvider, setActiveProvider] = useState<SocialProvider | null>(null);

    const router = useRouter();

    const {
        control,
        register,
        handleSubmit,
        trigger,
        getValues,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ExtendedSignupValues>({
        resolver: zodResolver(extendedSignupSchema),
        mode: "onChange",
        defaultValues: {
            role: "USER",
            email: "",
            otp: "",
            password: "",
            username: "",
            organizationName: "",
            subdomain: "",
            industry: ""
        },
    });

    const selectedIndustry = useWatch({ control, name: "industry" });
    const selectedRole = useWatch({ control, name: "role" });

    const handleRoleSelect = (role: "USER" | "HOST") => {
        setValue("role", role);
        setCurrentStep("EMAIL");
    };

    const handleSocialSignup = async (provider: SocialProvider) => {
        setActiveProvider(provider);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setValue("email", "user@example.com"); // Mock
        setCurrentStep("INDUSTRY");
        setActiveProvider(null);
    };

    const goToVerify = async () => {
        if (await trigger("email")) {
            setCurrentStep("VERIFY");
            toast.success("Code sent!");
        }
    };

    const goToIndustry = () => {
        if (getValues("otp").length === 4) setCurrentStep("INDUSTRY");
        else toast.error("Enter valid code");
    };

    const goToDetails = () => {
        if (selectedIndustry) setCurrentStep("DETAILS");
        else toast.error("Please select an industry");
    };

    const handleVerification = () => {
        if (getValues("otp").length === 4) {
            if (selectedRole === "USER") {
                // If it's a USER, they are done after verification
                onSubmit(getValues());
            } else {
                // If it's a HOST, proceed to industry selection
                setCurrentStep("INDUSTRY");
            }
        } else {
            toast.error("Enter valid 4-digit code");
        }
    };

    const onSubmit = async (data: ExtendedSignupValues) => {
        try {
            // API Call logic here (UserService.create_user or OrganizationService.create_host)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success(data.role === "HOST" ? "Arena Launched!" : "Welcome to the Arena!");
            router.push(data.role === "HOST" ? "/arena" : "/player");
        } catch (err) {
            toast.error("Signup failed");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="text-center">
                <h1 className="text-3xl font-black text-foreground tracking-tight">
                    {currentStep === "ROLE_SELECTION" && "How will you play?"}
                    {currentStep === "EMAIL" && (selectedRole === "HOST" ? "Ignite your crowd!" : "Join the Arena!")}
                    {currentStep === "VERIFY" && "Verify your email"}
                    {currentStep === "INDUSTRY" && "Choose your sector"}
                    {currentStep === "DETAILS" && "Almost there!"}
                </h1>
            </div>

            {/* STEP 0: ROLE SELECTION */}
            {currentStep === "ROLE_SELECTION" && (
                <div className="grid grid-cols-1 gap-4">
                    <button
                        onClick={() => handleRoleSelect("USER")}
                        className="p-6 bg-brand-primary text-white rounded-xl border-b-4 border-black/20 hover:brightness-110 transition-all font-black text-xl"
                    >
                        I&apos;M A PLAYER
                    </button>
                    <button
                        onClick={() => handleRoleSelect("HOST")}
                        className="p-6 bg-[#1368CE] text-white rounded-xl border-b-4 border-black/20 hover:brightness-110 transition-all font-black text-xl"
                    >
                        I&apos;M A HOST
                    </button>
                </div>
            )}

            {/* STEP 1: ACCOUNT BASICS (Username, Email, Password) */}
            {currentStep === "EMAIL" && (
                <div className="space-y-4">
                    <ArenaInput label="Username" {...register("username")} error={errors.username?.message} />
                    <ArenaInput label="Email" {...register("email")} error={errors.email?.message} />
                    <ArenaInput label="Password" type="password" {...register("password")} error={errors.password?.message} />
                    <ArenaButton onClick={goToVerify}>Continue</ArenaButton>
                    <button onClick={() => setCurrentStep("ROLE_SELECTION")} className="text-xs opacity-50 w-full">Change Role</button>
                </div>
            )}

            {/* STEP 2: VERIFY (OTP) */}
            {currentStep === "VERIFY" && (
                <div className="space-y-6">
                    <p className="text-center text-sm opacity-60">Enter the OTP sent to your email</p>
                    <ArenaInput label="4-Digit Code" max={4} maxLength={4} className="text-center text-2xl tracking-widest" {...register("otp")} />
                    <ArenaButton isLoading={isSubmitting && selectedRole === "USER"} onClick={handleVerification}>
                        {selectedRole === "USER" ? "Complete Signup" : "Verify & Continue"}
                    </ArenaButton>
                </div>
            )}

            {/* STEP 3: INDUSTRY (HOST ONLY) */}
            {currentStep === "INDUSTRY" && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        {INDUSTRY_OPTIONS.map((option, index) => {
                            const colors = [
                                "bg-[#E21B3C]",
                                "bg-[#1368CE]",
                                "bg-[#D89E00]",
                                "bg-[#26890C]",
                            ];
                            const cardColor = colors[index % colors.length];

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setValue("industry", option.value)}
                                    className={clsx(
                                        "relative flex items-center justify-center p-3 rounded-lg border-b-4 transition-all active:scale-95 active:border-b-0 active:mt-1",
                                        selectedIndustry === option.value
                                            ? `${cardColor} border-black/20 text-white`
                                            : "bg-card border-muted text-card-foreground hover:bg-muted/50"
                                    )}
                                >

                                    <div className={clsx(
                                        "absolute left-3 w-3 h-3 opacity-40",
                                        index % 4 === 0 && "rotate-45 border-2 border-current",
                                        index % 4 === 1 && "rounded-full border-2 border-current",
                                        index % 4 === 2 && "border-2 border-current",
                                        index % 4 === 3 && "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-bottom-[10px] border-bottom-current" // Triangle
                                    )} />

                                    <span className="text-xs font-black uppercase tracking-wider pl-4">
                                        {option.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <ArenaButton
                        onClick={goToDetails}
                        disabled={!selectedIndustry}
                        className="mt-2"
                    >
                        Next Step
                    </ArenaButton>
                </div>
            )}

            {/* STEP 4: ORG DETAILS (HOST ONLY) */}
            {currentStep === "DETAILS" && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <ArenaInput label="Organization Name" {...register("organizationName")} error={errors.organizationName?.message} />
                    <ArenaInput
                        label="Workspace URL"
                        {...register("subdomain")}
                        rightElement={<span className="pr-4 text-xs opacity-40">.greenlight.app</span>}
                        error={errors.subdomain?.message}
                    />
                    <div className="flex gap-3 pt-2">
                        <ArenaButton type="button" variant="outline" onClick={() => setCurrentStep("INDUSTRY")}>Back</ArenaButton>
                        <ArenaButton isLoading={isSubmitting} type="submit">Setup Arena</ArenaButton>
                    </div>
                </form>
            )}

            {/* Footer */}
            <div className="text-center pt-2">
                <p className="text-sm font-bold text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-brand-primary hover:underline font-black">Log in</Link>
                </p>
            </div>
        </div>
    );
}