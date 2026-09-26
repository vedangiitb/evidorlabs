'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Menu, X, ExternalLink, Terminal, ChevronRight } from 'lucide-react';
import { GithubIcon } from '@/components/GithubIcon';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080b]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all duration-300">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-base font-bold tracking-wider text-white group-hover:text-sky-300 transition-colors">
                {SITE_CONFIG.name.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-tight -mt-1 hidden sm:block">
                LLM HARNESS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <Link
              href="/#features"
              className="hover:text-white transition-colors py-1"
            >
              Features
            </Link>
            <Link
              href="/#philosophy"
              className="hover:text-white transition-colors py-1"
            >
              Philosophy
            </Link>
            <Link
              href="/#architecture"
              className="hover:text-white transition-colors py-1"
            >
              Architecture
            </Link>
            <Link
              href="/#context"
              className="hover:text-white transition-colors py-1"
            >
              Context
            </Link>
            <Link
              href="/#providers"
              className="hover:text-white transition-colors py-1"
            >
              Providers
            </Link>
            <Link
              href="/docs"
              className="hover:text-white transition-colors py-1 font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              Docs
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Right side status & external links */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Version Badge */}
            <a
              href={SITE_CONFIG.testPypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 hover:border-sky-500/40 text-slate-300 hover:text-sky-300 transition-all"
              title="View on TestPyPI"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>v{SITE_CONFIG.version}</span>
            </a>

            {/* GitHub */}
            <a
              href={SITE_CONFIG.githubCoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-[1.02]"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={SITE_CONFIG.testPypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
            >
              v{SITE_CONFIG.version}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0c12] border-b border-white/10 px-4 pt-3 pb-5 mt-3 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Philosophy
            </Link>
            <Link
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Architecture
            </Link>
            <Link
              href="/#context"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Context Management
            </Link>
            <Link
              href="/#providers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Providers
            </Link>
            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 font-medium"
            >
              Documentation →
            </Link>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href={SITE_CONFIG.githubCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-md bg-white/5 text-white text-xs font-medium"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href={SITE_CONFIG.testPypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-md bg-sky-600/20 text-sky-300 text-xs font-mono"
              >
                <span>TestPyPI Package (v{SITE_CONFIG.version})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
