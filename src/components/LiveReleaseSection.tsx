'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { useReleaseInfo } from '@/lib/useReleaseInfo';
import {
  ArrowUpRight,
  GitBranch,
  RefreshCw,
  GitCommit,
  Tag,
  Check,
  Copy,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export function LiveReleaseSection() {
  const {
    version,
    publishedDate,
    pypiUrl,
    changelog,
    recentCommits,
    source,
    isLoading,
    isRefreshing,
    refresh,
  } = useReleaseInfo();

  const effectivePypiUrl = pypiUrl || SITE_CONFIG.pypiUrl;
  const [activeTab, setActiveTab] = useState<'changelog' | 'commits'>('changelog');
  const [copiedPip, setCopiedPip] = useState(false);

  const exactInstallCmd = `pip install "evidor==${version.replace(/^v/, '')}"`;

  const handleCopyPip = async () => {
    await navigator.clipboard.writeText(exactInstallCmd);
    setCopiedPip(true);
    setTimeout(() => setCopiedPip(false), 2000);
  };

  return (
    <section id="releases" className="py-20 border-t border-white/[0.08] bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LIVE PYPI RELEASES &amp; CHANGELOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Published on PyPI, actively evolving.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Evidor is officially published to PyPI as <code className="text-zinc-200 font-mono">evidor</code>. Stable releases are published from <code className="text-zinc-200 font-mono">main</code> via trusted publishing.
            </p>
          </div>

          {/* Dynamic Status Bar & Refresh */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#09090b] border border-white/[0.08] text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white font-medium">v{version.replace(/^v/, '')}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">
                {source === 'live' ? 'Live PyPI' : 'PyPI Release'}
              </span>
              {publishedDate && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-500 text-[11px]">{publishedDate}</span>
                </>
              )}
            </div>

            <button
              onClick={refresh}
              disabled={isRefreshing || isLoading}
              className="p-1.5 rounded-md bg-[#09090b] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors disabled:opacity-50"
              title="Refresh version and changelog from PyPI / GitHub"
              aria-label="Refresh live release data"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Release Model & Exact PyPI Pin */}
          <div className="lg:col-span-5 space-y-4">
            {/* Release Model Card */}
            <div className="p-5 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-medium">
                  <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Automated CI/CD Pipeline</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  python-semantic-release
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-black/60 border border-white/[0.04] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-zinc-200 font-medium">main Branch</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.2 rounded border border-emerald-400/20">
                      PyPI Stable
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Production releases published to PyPI via GitHub Actions trusted publishing using Conventional Commits.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-white/[0.04] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-zinc-200 font-medium">dev Branch</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
                      TestPyPI Prerelease
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    PR merges to <code className="text-zinc-300 font-mono">dev</code> build and publish <code className="text-zinc-300 font-mono">-dev.N</code> candidate tags to TestPyPI.
                  </p>
                </div>
              </div>

              {/* Conventional Commits Legend */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-400 font-medium">
                  Conventional Commits SemVer Rules
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <div className="text-zinc-300 font-semibold">fix:</div>
                    <div className="text-zinc-500 mt-0.5">PATCH</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <div className="text-zinc-300 font-semibold">feat:</div>
                    <div className="text-zinc-500 mt-0.5">MINOR</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <div className="text-zinc-300 font-semibold">feat!:</div>
                    <div className="text-zinc-500 mt-0.5">MAJOR</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={effectivePypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  <span>View on PyPI</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
                </a>
                <Link
                  href="/docs#release-model"
                  className="inline-flex items-center gap-1 py-2 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Docs</span>
                </Link>
              </div>
            </div>

            {/* Exact Pin Command Card */}
            <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-zinc-500" />
                  <span>Install specific PyPI release</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">v{version.replace(/^v/, '')}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-black border border-white/[0.06] font-mono text-[11px] text-zinc-300 overflow-x-auto">
                <span className="text-zinc-600 select-none">$</span>
                <span className="truncate">{exactInstallCmd}</span>
                <button
                  onClick={handleCopyPip}
                  className="ml-auto p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors shrink-0"
                  title="Copy exact PyPI install command"
                >
                  {copiedPip ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Changelog & Commit Feed Tabs */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-xl bg-[#09090b] border border-white/[0.08] flex flex-col overflow-hidden">
              {/* Card Tab Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-zinc-950/60">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('changelog')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                      activeTab === 'changelog'
                        ? 'bg-zinc-900 text-white font-medium border border-zinc-700/80 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CHANGELOG.md</span>
                    <span className="text-[10px] text-zinc-500">
                      ({changelog.length})
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('commits')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                      activeTab === 'commits'
                        ? 'bg-zinc-900 text-white font-medium border border-zinc-700/80 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <GitCommit className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Recent Commits</span>
                    <span className="text-[10px] text-zinc-500">
                      ({recentCommits.length})
                    </span>
                  </button>
                </div>

                <a
                  href="https://github.com/vedangiitb/evidor-core/commits/main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <span>evidor-core:main</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Tab Contents: Scrollable */}
              <div className="p-5 overflow-y-auto max-h-[460px] space-y-6">
                {activeTab === 'changelog' ? (
                  <div className="space-y-6">
                    {changelog.map((entry, idx) => (
                      <div
                        key={idx}
                        className="relative pl-6 pb-6 border-l border-white/[0.08] last:border-l-0 last:pb-0"
                      >
                        {/* Timeline Node */}
                        <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                          <div className={`w-1 h-1 rounded-full ${idx === 0 ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                        </div>

                        {/* Version Header */}
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <span className="text-xs font-mono font-semibold text-white bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                            {entry.version}
                          </span>
                          {entry.date && (
                            <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-600" />
                              {entry.date}
                            </span>
                          )}
                          {idx === 0 && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded">
                              Current PyPI
                            </span>
                          )}
                        </div>

                        {/* Sections within Version */}
                        <div className="space-y-3">
                          {entry.sections.map((sec, sIdx) => (
                            <div key={sIdx} className="space-y-1.5">
                              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                                {sec.category}
                              </div>
                              <ul className="space-y-1.5 text-xs text-zinc-300">
                                {sec.items.map((item, iIdx) => (
                                  <li
                                    key={iIdx}
                                    className="flex items-start gap-2 leading-relaxed"
                                  >
                                    <span className="text-zinc-600 select-none mt-1">•</span>
                                    <div className="flex-1">
                                      <span>{item.text}</span>
                                      {item.commitHash && item.commitUrl && (
                                        <a
                                          href={item.commitUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-0.5 ml-2 font-mono text-[10px] text-zinc-500 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 px-1 py-0.2 rounded transition-colors"
                                        >
                                          <code>{item.commitHash}</code>
                                          <ArrowUpRight className="w-2.5 h-2.5" />
                                        </a>
                                      )}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentCommits.map((commit, cIdx) => (
                      <a
                        key={cIdx}
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-black/60 border border-white/[0.04] hover:border-white/[0.12] hover:bg-zinc-900/40 transition-all flex items-start justify-between gap-3 group"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-medium text-white group-hover:text-zinc-200 truncate">
                              {commit.message}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
                            <span>{commit.author}</span>
                            <span>•</span>
                            <span>{commit.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 font-mono text-xs text-zinc-400 group-hover:text-white bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded shrink-0 transition-colors">
                          <code>{commit.shortHash}</code>
                          <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="p-3 border-t border-white/[0.06] bg-zinc-950/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>
                  Source: {source === 'live' ? 'PyPI API & GitHub sync' : 'Static PyPI data'}
                </span>
                <a
                  href="https://github.com/vedangiitb/evidor-core/blob/main/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
                >
                  <span>View CHANGELOG.md on GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
