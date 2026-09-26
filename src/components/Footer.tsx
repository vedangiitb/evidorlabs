import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/GithubIcon';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-black text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[4px] bg-white flex items-center justify-center text-black font-mono font-bold text-xs">
                E
              </div>
              <span className="font-mono text-sm font-semibold tracking-tight text-white">
                evidor
              </span>
            </div>
            <p className="text-zinc-400 font-medium text-xs">
              {SITE_CONFIG.positioning}
            </p>
            <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
              Provider-agnostic foundation for reliable LLM applications and autonomous AI systems with built-in context window management.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-500 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
              <span>Currently under development · v{SITE_CONFIG.version}</span>
            </div>
          </div>

          {/* Documentation Links */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Documentation
            </div>
            <ul className="space-y-2 text-zinc-500">
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Overview &amp; Guide
                </Link>
              </li>
              <li>
                <Link href="/docs#installation" className="hover:text-white transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/docs#quickstart" className="hover:text-white transition-colors">
                  Quickstart
                </Link>
              </li>
              <li>
                <Link href="/docs#context-management" className="hover:text-white transition-colors">
                  Context Compaction
                </Link>
              </li>
              <li>
                <Link href="/docs#release-model" className="hover:text-white transition-colors">
                  Release Lifecycle
                </Link>
              </li>
            </ul>
          </div>

          {/* External Repositories */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Repositories
            </div>
            <ul className="space-y-2 text-zinc-500">
              <li>
                <a
                  href={SITE_CONFIG.githubCoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>evidor-core</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.testPypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors font-mono"
                >
                  <span>TestPyPI package</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600" />
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
                  <span>evidorlabs</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
              <li>
                <a
                  href={`${SITE_CONFIG.githubCoreUrl}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Issues &amp; Discussions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-600 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.author}. MIT License.
          </div>
          <div>
            Package status: <span className="text-zinc-400">Pre-release (v{SITE_CONFIG.version})</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
