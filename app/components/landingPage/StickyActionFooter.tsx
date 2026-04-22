"use client";

import Link from "next/link";
import { FOOTER_ACTIONS } from "@/settings";
import Image from "next/image"

export function StickyActionFooter() {
    return (
        // <div className="sticky bottom-4 left-0 right-0 z-50 w-full px-4 pointer-events-none flex justify-center">
        //     <div className="max-w-fit mx-auto">
        //         <div className="pointer-events-auto bg-brand-navy/95 dark:bg-brand-navy/90 backdrop-blur-xl rounded-2xl md:rounded-full p-1.5 md:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col md:flex-row items-center gap-2 md:gap-4">

        //             <div className="flex items-center justify-between w-full md:w-auto gap-4 px-3 md:border-r border-white/10 pb-2 md:pb-0">
                       
        //                 <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity">
        //                     <Image
        //                         src="/greenlight.png"
        //                         alt="Logo"
        //                         width={32}
        //                         height={32}
        //                         className="h-8 w-8 object-contain"
        //                         priority
        //                     />
        //                     <span className="text-xs sm:text-lg lg:text-xl font-black tracking-tighter text-foreground">
        //                         Green<span className="text-btn-primary ">Light</span>
        //                     </span>
        //                 </Link>
        //             </div>

        //             <div className="flex items-center justify-center gap-4 md:gap-6 px-2 py-1">
        //                 {FOOTER_ACTIONS.map((action) => (
        //                     <div key={action.name} className="relative group flex flex-col items-center">
        //                         <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-background bg-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl translate-y-1 group-hover:translate-y-0">
        //                             {action.name}
        //                             <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
        //                         </span>

        //                         <button
        //                             type="button"
        //                             className="flex flex-col items-center gap-1 transition-transform hover:-translate-y-0.5 active:scale-95"
        //                             aria-label={`Open ${action.name}`}
        //                         >
        //                             <div className={`${action.color} h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-lg shadow-lg group-hover:brightness-110 transition-all`}>
        //                                 <action.icon className="text-white h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
        //                             </div>

        //                             <p className="text-white font-bold text-[8px] md:text-[9px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
        //                                 {action.name}
        //                             </p>
        //                         </button>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div> 
            <div className="sticky bottom-18 left-0 right-0 z-50 w-full px-4 pointer-events-none flex justify-center">
            <div className="max-w-fit mx-auto">
                <div className="pointer-events-auto bg-brand-navy/95 dark:bg-brand-navy/90 backdrop-blur-xl rounded-full p-1.5 md:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 flex flex-row items-center gap-2 md:gap-4">

                    {/* Logo Section - Now always inline */}
                    <div className="flex items-center gap-3 px-3 border-r border-white/10 py-1">
                        <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity">
                            <Image
                                src="/greenlight.png"
                                alt="Logo"
                                width={24}
                                height={24}
                                className="h-6 w-6 md:h-7 md:w-7 object-contain"
                                priority
                            />
                            <span className="  sm:block text-sm md:text-base font-black tracking-tighter text-white">
                                Green<span className="text-brand-leaf">Light</span>
                            </span>
                        </Link>
                    </div>

                    {/* Actions Grid - Perfectly Centered Row */}
                    <div className="flex items-center gap-3 md:gap-5 px-2">
                        {FOOTER_ACTIONS.map((action) => (
                            <div key={action.name} className="relative group flex flex-col items-center">
                                {/* Floating Tooltip */}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-background bg-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl translate-y-1 group-hover:translate-y-0">
                                    {action.name}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
                                </span>

                                <button
                                    type="button"
                                    className="flex flex-col items-center gap-0.5 transition-transform hover:-translate-y-0.5 active:scale-95"
                                    aria-label={`Open ${action.name}`}
                                >
                                    <div className={`${action.color} h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-lg shadow-lg group-hover:brightness-110 transition-all`}>
                                        <action.icon className="text-white h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                                    </div>

                                    {/* Labels only show on desktop to keep mobile row ultra-slim */}
                                    <p className="  md:block text-white font-bold text-[8px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
                                        {action.name}
                                    </p>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div> 
    );
}