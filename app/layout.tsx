import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/landingPage/Navbar";
import { Footer } from "./components/landingPage/Footer";
import { InstallPrompt } from "./components/InstallPrompt";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],

});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a5c2e" },
    { media: "(prefers-color-scheme: light)", color: "#0f172a" }
  ],

  colorScheme: "dark"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://greenlightquiz.com"),
  manifest: "/manifest.json",
  title: {
    default: "GreenLight Quiz | Ignite Your Learning",
    template: "%s | GreenLight Quiz",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GreenLight",
  },
  description: "The ultimate high-energy quiz platform for competitive learning. Real-time sync, instant rewards, and branded arenas.",
  keywords: ["Quiz Platform", "Competitive Learning", "Gamified Education", "Real-time Trivia", "GreenLight"],
  authors: [{ name: "Moses Oyelere" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GreenLight Quiz | Ignite Your Learning",
    description: "The ultimate high-energy quiz platform for competitive learning.",
    url: "https://greenlightquiz.com",
    siteName: "GreenLight Quiz",

    images: [
      {
        url: "/og-image.jpg",  
        width: 1200,
        height: 630,
        alt: "GreenLight Arena Preview",
      },
    ],
    locale: "en_UK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenLight Quiz | Ignite Your Learning",
    description: "Host high-stakes synchronized quizzes anywhere.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lexend.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased selection:bg-brand-primary selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="grow">
            {children}
          </main>
          <InstallPrompt /> {/* <--- It lives here */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}