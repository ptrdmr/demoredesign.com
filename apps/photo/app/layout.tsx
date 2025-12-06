import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Menu, Grid as GridIcon, Maximize2, Sun, Moon, Instagram, Twitter } from "lucide-react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demore Photo Portfolio",
  description: "Photography portfolio inspired by Bryan Minear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        {/* Background Grid Lines */}
        <div className="fixed inset-0 z-0 pointer-events-none flex justify-between px-4 md:px-0 max-w-[1800px] mx-auto w-full">
          <div className="w-px h-full bg-zinc-900/50"></div>
          <div className="w-px h-full bg-zinc-900/50 hidden md:block"></div>
          <div className="w-px h-full bg-zinc-900/50 hidden md:block"></div>
          <div className="w-px h-full bg-zinc-900/50"></div>
        </div>

        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 bg-black/80 backdrop-blur-sm border-b border-zinc-900">
          {/* Logo */}
          <div className="w-12 h-12 border border-white flex items-center justify-center font-display text-2xl tracking-tighter">
            DM
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest font-display">
            <a href="#" className="hover:text-zinc-400 transition-colors">HOME</a>
            <a href="#prints" className="hover:text-zinc-400 transition-colors">PRINTS</a>
            <a href="#journal" className="hover:text-zinc-400 transition-colors">JOURNAL</a>
            <a href="#portfolio" className="hover:text-zinc-400 transition-colors">PORTFOLIO</a>
            <a href="#gear" className="hover:text-zinc-400 transition-colors">GEAR</a>
            <a href="#about" className="hover:text-zinc-400 transition-colors">ABOUT</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="p-2 hover:text-zinc-400 transition-colors">
              <Maximize2 size={20} />
            </button>
            <div className="w-px h-8 bg-zinc-800"></div>
            <button className="p-2 hover:text-zinc-400 transition-colors">
              <GridIcon size={20} />
            </button>
          </div>
        </header>

        {/* Left Fixed Sidebar (Theme Toggle) */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pl-2">
          <div className="bg-zinc-900/80 p-1 rounded-full flex flex-col gap-2 backdrop-blur-sm border border-zinc-800">
            <button className="p-2 rounded-full bg-zinc-800 text-white">
              <Moon size={16} />
            </button>
            <button className="p-2 rounded-full text-zinc-500 hover:text-white">
              <Sun size={16} />
            </button>
          </div>
        </div>

        {/* Right Fixed Sidebar (Socials) */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-8 pr-2">
          <a href="#" className="vertical-text text-xs font-bold tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2 transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <Instagram size={14} className="rotate-90 mb-2" /> INSTAGRAM
          </a>
          <a href="#" className="vertical-text text-xs font-bold tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2 transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <Twitter size={14} className="rotate-90 mb-2" /> TWITTER
          </a>
        </div>

        {/* Main Content */}
        <main className="relative z-10 pt-20 min-h-screen">
           {children}
        </main>
      </body>
    </html>
  );
}
