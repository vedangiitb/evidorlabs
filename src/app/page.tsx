'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { useReleaseInfo } from '@/lib/useReleaseInfo';
import { HeroVisual } from '@/components/HeroVisual';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ContextTimeline } from '@/components/ContextTimeline';
import { ProvidersSection } from '@/components/ProvidersSection';
import { CodeSection } from '@/components/CodeSection';
import { ToolsSection } from '@/components/ToolsSection';
import { LiveReleaseSection } from '@/components/LiveReleaseSection';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { GithubIcon } from '@/components/GithubIcon';
import {
  ArrowUpRight,
  ArrowRight,
  Terminal,
  Check,
  Copy,
  Layers,
  Database,
  Workflow,
  Cpu,
  Sliders,
  Eye,
  GitBranch,
  ShieldCheck,
  Wrench,
  Zap,
  Server,
  Activity,
  RotateCw,
} from 'lucide-react';

export default function HomePage() {
  const { version, pypiUrl } = useReleaseInfo();
  const effectivePypiUrl = pypiUrl || SITE_CONFIG.pypiUrl;
  const [copiedHero, setCopiedHero] = useState(false);

  const handleCopyHero = async () => {
    await navigator.clipboard.writeText('pip install "evidor[openai]"');
    setCopiedHero(true);
    setTimeout(() => setCopiedHero(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-black text-white pt-24 pb-20">
      {/* Subtle SV Top Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-spotlight-top pointer-events-none opacity-40" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-8 sm:pt-14 pb-16 sm:pb-24">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/80 border border-zinc-800 text-zinc-300 mb-8 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-medium tracking-wide">PUBLISHED ON PYPI</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">v{version.replace(/^v/, '')}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          Runtime harness for{' '}
          <span className="text-zinc-400 font-normal">
            building AI agents.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-3">
          {SITE_CONFIG.tagline}
        </p>

        {/* Secondary Sentence */}
        <p className="text-xs sm:text-sm text-zinc-500 font-mono max-w-xl mx-auto mb-8">
          {SITE_CONFIG.subtagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a
            href={SITE_CONFIG.githubCoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium text-xs bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub (evidor-core)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
          </a>

          <a
            href={effectivePypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>PyPI Package</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>

          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md font-medium text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>Read Docs</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>

        {/* Interactive Copyable Command Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-zinc-400 mb-12">
          <span className="text-zinc-600 select-none">$</span>
          <span className="text-zinc-200">pip install &quot;evidor[openai]&quot;</span>
          <button
            onClick={handleCopyHero}
            className="ml-1 p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Copy command"
            aria-label="Copy install command"
          >
            {copiedHero ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-500" />
            )}
          </button>
        </div>

        {/* Hero Visual Workstation */}
        <HeroVisual />
      </section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT PHILOSOPHY SECTION */}
      {/* ========================================================================= */}
      <section id="philosophy" className="py-20 border-t border-white/[0.08] bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              PHILOSOPHY
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              A runtime harness, not another wrapper.
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Evidor provides the operational runtime layer between your application and underlying LLM providers. Rather than masking provider APIs with bloated abstractions, it provides deterministic context compaction, MCP server connectivity, unified retries, and non-blocking telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Concept 1 */}
            <div className="p-5 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-4">
                  <Workflow className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  Two Execution Paradigms
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Stateful conversations (<code className="text-zinc-200 font-mono">Agent</code>) manage turn continuation and tool loops automatically. Stateless calls (<code className="text-zinc-200 font-mono">provider.generate</code>) give full control with zero hidden state.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                Agent.send() • provider.generate()
              </div>
            </div>

            {/* Concept 2 */}
            <div className="p-5 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-4">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  Native Provider Compaction
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Context management is offloaded directly to model providers at <code className="text-zinc-200 font-mono">compact_threshold</code> using server-side chaining on OpenAI and Gemini, and prompt caching on Claude.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                compact_threshold • Server-Side Chaining
              </div>
            </div>

            {/* Concept 3 */}
            <div className="p-5 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-4">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  Thinking &amp; Reasoning Flags
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  First-class reasoning configurations for GPT-6, Claude, and Gemini with internal scratchpad access via <code className="text-zinc-200 font-mono">response.thinking</code> and cryptographic signature replaying.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                thinking_level • effort • budget
              </div>
            </div>

            {/* Concept 4 */}
            <div className="p-5 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-4">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  Streaming &amp; Concurrent Tools
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Real-time token streaming with TTFT tracking, concurrent multi-tool turns via <code className="text-zinc-200 font-mono">asyncio.gather()</code>, persistent connection pooling, MCP, and a non-blocking &lt;1µs telemetry actor.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                stream=True • TTFT • asyncio.gather
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CURRENT CAPABILITIES SECTION */}
      {/* ========================================================================= */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              CORE SPECIFICATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Verified Capabilities
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl">
              Production capabilities implemented in <code className="text-zinc-200 font-mono">evidor-core v{version.replace(/^v/, '')}</code> and published on PyPI.
            </p>
          </div>

          <div className="text-xs font-mono text-emerald-400 border border-emerald-950 bg-emerald-950/20 px-2.5 py-1 rounded">
            Published PyPI Package v{version.replace(/^v/, '')}
          </div>
        </div>

        {/* Interactive Bento Grid & Simulators */}
        <CapabilitiesSection version={version} />
      </section>

      {/* ========================================================================= */}
      {/* 3.5 TOOLS & FUNCTION CALLING */}
      {/* ========================================================================= */}
      <section id="tools" className="py-20 border-t border-white/[0.08] bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              TOOLS &amp; MCP PROTOCOL
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Native tool execution &amp; MCP servers.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Equip your agents with Python functions using <code className="text-zinc-200 font-mono">@tool</code> or connect directly to external Model Context Protocol (MCP) servers. Evidor automatically handles schema derivation, timeouts, error recovery, and autonomous execution loops.
            </p>
          </div>

          <ToolsSection />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ARCHITECTURE SECTION */}
      {/* ========================================================================= */}
      <section id="architecture" className="py-20 border-t border-white/[0.08] bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-xl">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              ARCHITECTURE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Modular harness topology
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Clean separation between client application, conversational state, bounded context compaction, MCP subprocesses, and non-blocking telemetry.
            </p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CODE SECTION */}
      {/* ========================================================================= */}
      <section id="quickstart" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-8">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
            DEVELOPER EXPERIENCE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Simple on the surface. Powerful underneath.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Start with a single Agent. Add MCP servers, configure retries, or hook up OpenTelemetry without rewriting your application.
          </p>
        </div>

        <CodeSection />
      </section>

      {/* ========================================================================= */}
      {/* 6. CONTEXT MANAGEMENT SECTION */}
      {/* ========================================================================= */}
      <section id="context" className="py-20 border-t border-white/[0.08] bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              CONTEXT ENGINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Native provider compaction. Zero token bloat.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Evidor maps stateful conversations to each model provider&apos;s optimal native context mechanism instead of managing synthetic local summaries:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400 pt-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>OpenAI Responses API previous_response_id</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Gemini Interactions previous_interaction_id</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Claude Ephemeral Prompt Caching (90% savings)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Automated compact_threshold triggers</span>
              </div>
            </div>
          </div>

          <ContextTimeline />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PROVIDERS & ECOSYSTEM SECTION */}
      {/* ========================================================================= */}
      <section id="providers" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-8">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
            ADAPTERS &amp; ECOSYSTEM
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            One interface. Your stack.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Install only what you need with isolated package extras for models, MCP, and observability.
          </p>
        </div>

        <ProvidersSection />
      </section>

      {/* ========================================================================= */}
      {/* 8. LIVE VERSION / RELEASE SECTION */}
      {/* ========================================================================= */}
      <LiveReleaseSection />

      {/* ========================================================================= */}
      {/* 9. ROADMAP / PLANNED EXTENSIONS */}
      {/* ========================================================================= */}
      <section id="roadmap" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 border border-zinc-800 bg-zinc-900/60 mb-2">
            <span>ROADMAP &amp; FUTURE DIRECTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Where Evidor is headed
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Planned architectural enhancements building on top of the v{version.replace(/^v/, '')} runtime foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              tag: 'ROADMAP',
              title: 'Distributed Agent Clusters',
              desc: 'Cross-process supervision hierarchies, persistent task queues, and distributed checkpointing for large agent fleets.',
            },
            {
              icon: Workflow,
              tag: 'ROADMAP',
              title: 'Multi-Agent Topologies',
              desc: 'Coordination patterns for agent handoffs, supervisor orchestrations, and specialized worker delegations.',
            },
            {
              icon: Sliders,
              tag: 'ROADMAP',
              title: 'Structured Output Validation',
              desc: 'Native JSON schema and Pydantic model validation guarantees for deterministic agent response extraction.',
            },
            {
              icon: Cpu,
              tag: 'ROADMAP',
              title: 'Local Inference Adapters',
              desc: 'Dedicated high-performance adapters for local vLLM, Ollama, and specialized quantized engine endpoints.',
            },
            {
              icon: ShieldCheck,
              tag: 'ROADMAP',
              title: 'Sandboxed Tool Execution',
              desc: 'Isolated environments and containerized execution limits for executing untrusted tool code securely.',
            },
            {
              icon: Database,
              tag: 'ROADMAP',
              title: 'Pluggable State Persistence',
              desc: 'External serialization adapters to hydrate and persist conversation history into Redis, SQLite, or PostgreSQL.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#09090b] border border-white/[0.08] relative group hover:border-white/[0.16] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-800">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-white/[0.08] bg-black text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Build agents on an open, provider-agnostic runtime.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Evidor is open-source under the MIT license and published to PyPI. Check out the core repository on GitHub or install the package with pip.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={SITE_CONFIG.githubCoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-white text-black hover:bg-zinc-200 font-medium text-xs transition-colors shadow-sm"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub (evidor-core)</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-600" />
            </a>
            <a
              href={effectivePypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium text-xs transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>PyPI Package</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium text-xs transition-colors"
            >
              <span>Explore Documentation</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
