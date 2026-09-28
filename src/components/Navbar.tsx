'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/GithubIcon';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-5 h-5 rounded-[4px] bg-white flex items-center justify-center text-black font-mono font-bold text-xs shadow-sm">
              E
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
              evidor
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 rounded ml-1 hidden sm:inline-block">
              core
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-zinc-400">
            <Link
              href="/#features"
              className="hover:text-white transition-colors"
            >
              Capabilities
            </Link>
            <Link
              href="/#tools"
              className="hover:text-white transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/#architecture"
              className="hover:text-white transition-colors"
            >
              Architecture
            </Link>
            <Link
              href="/#context"
              className="hover:text-white transition-colors"
            >
              Context Engine
            </Link>
            <Link
              href="/#providers"
              className="hover:text-white transition-colors"
            >
              Providers
            </Link>
            <Link
              href="/docs"
              className="hover:text-white transition-colors"
            >
              Docs
            </Link>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Version status pill */}
            <a
              href={SITE_CONFIG.testPypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
              title="View distribution on TestPyPI"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
              <span>v{SITE_CONFIG.version}</span>
            </a>

            {/* GitHub Link */}
            <a
              href={SITE_CONFIG.githubCoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors font-sans shadow-sm"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-600" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={SITE_CONFIG.testPypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400"
            >
              v{SITE_CONFIG.version}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 px-4 py-4 space-y-3 animate-fade-in text-[13px]">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white py-1.5"
          >
            Capabilities
          </Link>
          <Link
            href="/#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white py-1.5"
          >
            Tools &amp; Functions
          </Link>
          <Link
            href="/#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white py-1.5"
          >
            Architecture
          </Link>
          <Link
            href="/#context"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white py-1.5"
          >
            Context Engine
          </Link>
          <Link
            href="/#providers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white py-1.5"
          >
            Providers
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-medium py-1.5"
          >
            Documentation →
          </Link>
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href={SITE_CONFIG.githubCoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 rounded-md bg-white text-black font-medium text-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <a
              href={SITE_CONFIG.testPypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs"
            >
              <span>TestPyPI (v{SITE_CONFIG.version})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
