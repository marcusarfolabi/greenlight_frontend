"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { ArenaButton } from "@/app/components/common/ArenaButton";
import { ArenaInput } from "@/app/components/common/ArenaInput";
import { ArenaSelect } from "@/app/components/common/ArenaSelect";
import { HostSignupValues, hostSignupSchema } from "@/app/lib/validations/auth";
import { INDUSTRY_OPTIONS } from "@/settings";

export default function HostSignupForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<HostSignupValues>({
        resolver: zodResolver(hostSignupSchema),
        defaultValues: {
            organizationName: "",
            subdomain: "",
            industry: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: HostSignupValues) => {
        try {
            // Logic for creating the tenant and Stripe Connect account goes here
            console.log("Global Onboarding Data:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            toast.success("Arena Created! Redirecting to your subdomain...");
        } catch (error) {
            toast.error("Failed to launch. Please check your connection.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <ArenaInput
                label="Organization Name"
                placeholder="e.g. ABC Corp"
                {...register("organizationName")}
                error={errors.organizationName?.message}
            />

            <ArenaInput
                label="Workspace URL"
                placeholder="my-arena"
                {...register("subdomain", {
                    onChange: (e) => {
                        e.target.value = e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "");
                    }
                })}
                error={errors.subdomain?.message}
                rightElement={
                    <span className="text-[10px] font-black text-muted-foreground/40 pr-4">
                        .greenlight.app
                    </span>
                }
            />

            <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                    <ArenaSelect
                        label="Industry"
                        placeholder="Select Sector"
                        options={INDUSTRY_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.industry?.message}
                    />
                )}
            />

            <ArenaInput
                label="Work Email"
                type="email"
                placeholder="admin@abccoprs.com"
                {...register("email")}
                error={errors.email?.message}
            />

            <ArenaInput
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
            />

            <div className="pt-2">
                <ArenaButton isLoading={isSubmitting} type="submit">
                    Initialize My Arena
                </ArenaButton>
            </div>
        </form>
    );
}