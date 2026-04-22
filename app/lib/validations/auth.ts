import * as z from "zod";

export const hostSignupSchema = z.object({
  organizationName: z.string().min(2, "Name must be at least 2 characters"),
  subdomain: z
    .string()
    .min(3, "Subdomain is too short")
    .regex(/^[a-z0-9-]+$/, "Use only lowercase, numbers, and hyphens")
    .transform((val) => val.toLowerCase()), 
  industry: z.string().min(1, "Please select your industry"),
  email: z.string().email("Enter a valid work email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
});

export type HostSignupValues = z.infer<typeof hostSignupSchema>;
