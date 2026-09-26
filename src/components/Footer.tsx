import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Terminal, ExternalLink, ShieldAlert } from 'lucide-react';
import { GithubIcon } from '@/components/GithubIcon';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050609] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-mono text-base font-bold tracking-wider text-white">
                {SITE_CONFIG.name.toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-300">
              {SITE_CONFIG.positioning}
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Evidor provides a minimal, provider-agnostic harness between applications and foundation models with automated context management and compaction.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Currently under active development · {SITE_CONFIG.version}</span>
            </div>
          </div>

          {/* Core Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Documentation & Resources
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/docs" className="hover:text-sky-400 transition-colors">
                  Documentation Guide
                </Link>
              </li>
              <li>
                <Link href="/#quickstart" className="hover:text-sky-400 transition-colors">
                  Quickstart
                </Link>
              </li>
              <li>
                <Link href="/#architecture" className="hover:text-sky-400 transition-colors">
                  Architecture Overview
                </Link>
              </li>
              <li>
                <Link href="/#context" className="hover:text-sky-400 transition-colors">
                  Context Compaction Engine
                </Link>
              </li>
              <li>
                <Link href="/#capabilities" className="hover:text-sky-400 transition-colors">
                  Current Capabilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Repositories & Packages */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Repositories & Package
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href={SITE_CONFIG.githubCoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>evidor-core (GitHub)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.testPypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-sky-400 transition-colors font-mono text-xs"
                >
                  <span>TestPyPI Package</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.githubLandingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>evidorlabs (Landing Page)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={`${SITE_CONFIG.githubCoreUrl}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors"
                >
                  Issue Tracker
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.author}. Open-source under MIT License.</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-slate-400">
            <span>Version: {SITE_CONFIG.version}</span>
            <span>•</span>
            <span className="text-amber-400/90 font-medium">Early Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
