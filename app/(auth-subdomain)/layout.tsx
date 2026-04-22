import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const host = (await headers()).get("host");

    if (process.env.NODE_ENV === "production" && host === "greenlight-quiz.vercel.app") {
        redirect(`https://auth.greenlight-quiz.vercel.app`);
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0"
                aria-hidden="true"
            />

            <header className="p-6 flex justify-center relative z-10">
                <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Image
                        src="/greenlight.png"
                        alt="GreenLight Logo"
                        width={40}
                        height={40}
                        className="h-8 w-8 md:h-10 md:w-10 object-contain"
                        priority
                    />
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-foreground">
                        Green<span className="text-brand-leaf">Light</span>
                    </span>
                </Link>
            </header>

            <main className="grow flex items-center justify-center px-4 pb-12 relative z-10">
                <div className="w-full max-w-md">
                    <div className="bg-card dark:bg-brand-navy border border-border rounded-3xl md:rounded-4xl p-6 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}