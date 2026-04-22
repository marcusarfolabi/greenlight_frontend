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
    role: "Corporate Leaders",
    useCase:
      "Turn dry training into high-stakes synchronized competitions. Boost retention with real-time pressure.",
    icon: Briefcase,
    color: "bg-blue-600",
    ariaLabel: "Explore GreenLight for corporate training and leadership",
  },
  {
    role: "Educators & Schools",
    useCase:
      "Gamify the classroom. Use the 5s Preview to build anticipation and reward accuracy with instant standings.",
    icon: GraduationCap,
    color: "bg-brand-primary",
    ariaLabel: "Explore GreenLight for classroom and educational gamification",
  },
  {
    role: "Event Organizers",
    useCase:
      "Live trivia for thousands. Use the Host Console to trigger rounds manually and crown champions.",
    icon: Mic2,
    color: "bg-orange-500",
    ariaLabel: "Explore GreenLight for large scale events and live trivia",
  },
  {
    role: "Community Hosts",
    useCase:
      "Run remote game nights. Seamless payout profiles ensure winners get their glory and rewards instantly.",
    icon: Users2,
    color: "bg-purple-600",
    ariaLabel:
      "Explore GreenLight for community game nights and remote hosting",
  },
];

export const FAQS = [
  {
    question: "Is the action actually in sync?",
    answer:
      "Every single heartbeat. We’ve perfected our sync so that every player, whether they're in the front row or across the globe, sees the clock tick and the questions drop at the exact same millisecond. No lag, no spoilers, just pure competition.",
  },
  {
    question: "What’s the deal with the '5s Preview'?",
    answer:
      "It’s the ultimate hype-builder. We give your players a 5-second 'sneak peek' at the question before the timer starts. It builds massive anticipation, levels the playing field, and gets the adrenaline pumping before the chaos begins.",
  },
  {
    question: "Can I reward my champions instantly?",
    answer:
      "Absolutely. Turn glory into gold. You can link your preferred payment method to send rewards and payouts the moment the final podium ceremony ends. Winning has never felt so real.",
  },
  {
    question: "Can it handle a massive crowd?",
    answer:
      "From a focused boardroom of 10 to a packed stadium of 10,000+, we don't blink. Our system is built to grow with your ambition, ensuring a smooth, high-stakes experience no matter how many people enter the arena.",
  },
  {
    question: "Can I make the arena look like my brand?",
    answer:
      "Your game, your rules. You can fully skin your arena with your own colors, logos, and custom themes. We even use AI to help you create unique visual styles that make your brand the star of the show.",
  },
  {
    question: "Who’s really in charge during the game?",
    answer:
      "You are. As the Host, you have the master controls. You decide when the next round starts, when to pause for a breather, and you even have the power to override the leaderboard. You aren't just a host; you're the director.",
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