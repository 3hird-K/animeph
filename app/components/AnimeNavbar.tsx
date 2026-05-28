'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface NavSection {
  id: string;
  title: string;
}

interface AnimeNavbarProps {
  sections?: ReadonlyArray<NavSection>;
  initialQuery?: string;
}

export default function AnimeNavbar({ sections = [], initialQuery = '' }: AnimeNavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(sections[0]?.id || '');
  const [query, setQuery] = useState(initialQuery);
  const [shortcutText, setShortcutText] = useState("Ctrl+K");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      setShortcutText(isMac ? "⌘K" : "Ctrl+K");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // If pressing Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Only search if user typed something new (different from initialQuery to prevent infinite re-renders on mount)
    if (query !== initialQuery) {
      const timeoutId = setTimeout(() => {
        if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
        } else {
          router.push('/');
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [query, initialQuery, router]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent backdrop-blur-none'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 md:px-12 md:py-4">
        {/* Left Section: Menu trigger & Logo */}
        <div className="flex items-center gap-6 md:gap-10 select-none">
          <a
            href="/"
            className="select-none cursor-pointer focus:outline-none transition hover:scale-105 active:scale-95 duration-200"
            onClick={() => setActiveTab('')}
          >
            <span className="font-display text-2xl tracking-[0.3em] text-red-600 sm:text-3xl">
              ANIMEFLIX
            </span>
          </a>

          {/* Sleek inline navigation links */}
          <ul className="hidden md:flex items-center gap-5 text-[13px] font-medium tracking-wide">
            {sections.map((section) => {
              const isActive = activeTab === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setActiveTab(section.id)}
                    className={`relative cursor-pointer py-1.5 focus:outline-none font-bold tracking-wide transition-colors duration-300 ease-in-out ${
                      isActive
                        ? "text-white"
                        : "text-white/55 hover:text-white/90"
                    }`}
                  >
                    {section.title}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] rounded bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.9)] transition-all duration-300 ease-in-out ${
                        isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Section: Search & Pill Action / Profile Avatar Menu */}
        <div className="flex items-center gap-4 text-white select-none">
          {/* Pill Search Bar */}
          <div className="flex items-center overflow-hidden rounded-full bg-zinc-800/40 ring-1 ring-white/10 backdrop-blur-sm px-3 py-1 w-32 sm:w-48 md:w-64 transition-all duration-300 focus-within:ring-primary focus-within:bg-zinc-800/80">
            <svg className="h-3.5 w-3.5 text-white/50 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anime..."
              className="h-6 w-full bg-transparent border-none shadow-none px-0 text-xs text-white outline-none placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
            />
            <span className="hidden sm:inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8px] font-bold text-white/30 tracking-tight shrink-0 select-none">
              {shortcutText}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}