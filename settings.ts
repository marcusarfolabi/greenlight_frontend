import {
  Compass,
  GraduationCap,
  PlayCircle,
  PencilLine,
  LayoutGrid,
  Briefcase,
  Mic2,
  Users2,
  LucideProps,
  Zap,
  Timer,
  BarChart3,
  Settings2,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export const FOOTER_ACTIONS = [
  {
    name: "Discover",
    desc: "The best content",
    icon: Compass,
    color: "bg-brand-primary",
  },
  {
    name: "Learn",
    desc: "Self-study & solo play",
    icon: GraduationCap,
    color: "bg-brand-vegetable",
  },
  {
    name: "Present",
    desc: "Engage your audience",
    icon: PlayCircle,
    color: "bg-blue-600",
  },
  {
    name: "Make",
    desc: "Engaging content",
    icon: PencilLine,
    color: "bg-red-600",
  },
  { name: "Join", desc: "Enter PIN", icon: LayoutGrid, color: "bg-brand-navy" },
];

export const FOOTER_SECTIONS = [
  {
    title: "About",
    links: [
      { name: "Contact us", href: "#" },
      { name: "Company", href: "#" },
      { name: "Careers", href: "#" },
      { name: "News", href: "#" },
      { name: "Press", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "For Businesses", href: "#" },
      { name: "Actimo", href: "#" },
      { name: "Motimate", href: "#" },
      { name: "For Schools", href: "#" },
      { name: "Whiteboard.fi", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Webinars", href: "#" },
      { name: "Safety center", href: "#" },
      { name: "GreenLight Certified", href: "#" },
    ],
  },
  {
    title: "Legal and Compliance",
    links: [
      { name: "Terms and Conditions", href: "#" },
      { name: "Privacy Notice", href: "#" },
      { name: "Trust Center", href: "#" },
      { name: "Acceptable Use Policy", href: "#" },
      { name: "Cookie Notice", href: "#" },
    ],
  },
];

export const NAV_LINKS = [
  { name: "Work", href: "#" },
  { name: "School", href: "#" },
  { name: "Home", href: "#" },
  { name: "Study", href: "#" },
];

interface AudienceItem {
  role: string;
  useCase: string;
  icon: React.ElementType;
  color: string;
  ariaLabel: string;
}

export const AUDIENCE_LIST: AudienceItem[] = [
  {
    role: "Corporate Teams",
    useCase:
      "Transform boring training into high-energy showdowns. Perfect for remote teams who need a real reason to engage.",
    icon: Briefcase,
    color: "bg-blue-600",
    ariaLabel: "Host corporate team building sessions",
  },
  {
    role: "Modern Educators",
    useCase:
      "Stop competing with phone screens. Turn your lessons into a game your students actually want to win.",
    icon: GraduationCap,
    color: "bg-brand-primary",
    ariaLabel: "Host gamified classroom sessions",
  },
  {
    role: "Event Pros",
    useCase:
      "Run live trivia for 10 or 10,000. Use our pro tools to control the stage and crown your champions live.",
    icon: Mic2,
    color: "bg-orange-500",
    ariaLabel: "Host large scale live events",
  },
  {
    role: "Community Creators",
    useCase:
      "Host the ultimate game night. Send rewards to winners instantly and keep the hype going round after round.",
    icon: Users2,
    color: "bg-purple-600",
    ariaLabel: "Host community game nights",
  },
];

export const FAQS = [
  {
    question: "How do I know there won't be any lag?",
    answer:
      "We’ve built this for the 'split-second' moments. Whether your players are in the same room or across the globe, every clock ticks and every question drops at the exact same millisecond. No spoilers from the fast-internet crowd—just a fair, high-speed race to the top.",
  },
  {
    question: "Will this actually keep my audience's attention?",
    answer:
      "Yes—because we don't just show questions, we build tension. Our signature 5-second 'Sneak Peek' gets the adrenaline pumping before the timer even starts. It turns a simple quiz into a high-stakes show that people can't look away from.",
  },
  {
    question: "Can I really pay out winners the moment they win?",
    answer:
      "Real glory deserves real rewards. You can link your payout profiles to send cash or prizes instantly after the final podium ceremony. It turns 'good job' into a life-changing win, instantly.",
  },
  {
    question: "Is it going to crash if I have thousands of players?",
    answer:
      "We don't blink at big crowds. From a private team of 10 to a stadium of 10,000+, our system scales automatically. Your only job is to host; we handle the heavy lifting to keep the experience smooth and fast.",
  },
  {
    question: "Does it look like a generic app or MY brand?",
    answer:
      "This is your arena. You can fully customize the colors, upload your logos, and even use our AI to generate a theme that matches your brand’s vibe perfectly. Your audience stays in your world from the first question to the last.",
  },
  {
    question: "What if I need to pause or change things mid-game?",
    answer:
      "You have the Master Controls. As the Host, you are the Director. You decide when to start the next round, when to take a break, and you even have the power to manually adjust the leaderboard. You stay in total control of the energy.",
  },
];

interface FeatureItem {
  title: string;
  desc: string;
  icon: React.ComponentType<LucideProps>;
  aria: string;
  color: string;
}

export const FEATURES: FeatureItem[] = [
  {
    title: "Dead-Simple Sync",
    desc: "No lag. No cheating. Every player sees the same question at the exact same time, whether they are next to you or across the ocean.",
    icon: Zap,
    aria: "Fast lightning bolt icon",
    color: "bg-blue-500",
  },
  {
    title: "The 5-Second Hype",
    desc: "Build massive tension with a quick sneak peek of the question before the timer starts. It keeps everyone glued to their screens.",
    icon: Timer,
    aria: "Timer icon",
    color: "bg-purple-500",
  },
  {
    title: "Instant Cash-Outs",
    desc: "Send winnings directly to your champions' accounts the moment the game ends. Secure, fast, and completely automated.",
    icon: Wallet,
    aria: "Wallet icon",
    color: "bg-brand-primary",
  },
  {
    title: "Total Host Power",
    desc: "You are the director. Control the flow, pause the action, or kick off the next round with one tap from your private console.",
    icon: Settings2,
    aria: "Settings icon",
    color: "bg-orange-500",
  },
  {
    title: "Live Leaderboards",
    desc: "Watch the rankings shift in real-time. Every point counts, and every player knows exactly where they stand after every question.",
    icon: BarChart3,
    aria: "Bar chart icon",
    color: "bg-pink-500",
  },
  {
    title: "Verified Wins",
    desc: "Every result is tracked and proofed. Get a full breakdown of speed and accuracy so there’s never a doubt who the real champion is.",
    icon: ShieldCheck,
    aria: "Shield icon",
    color: "bg-cyan-500",
  },
];