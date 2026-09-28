'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { HeroVisual } from '@/components/HeroVisual';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ContextTimeline } from '@/components/ContextTimeline';
import { ProvidersSection } from '@/components/ProvidersSection';
import { CodeSection } from '@/components/CodeSection';
import { ToolsSection } from '@/components/ToolsSection';
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
  ShieldAlert,
  Wrench,
} from 'lucide-react';

export default function HomePage() {
  const [copiedHero, setCopiedHero] = useState(false);

  const handleCopyHero = async () => {
    await navigator.clipboard.writeText('pip install "evidor[openai]"');
    setCopiedHero(true);
    setTimeout(() => setCopiedHero(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-black text-white pt-24 pb-20">
      {/* Subtle SV Top Spotlight (Stripe/Linear style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-spotlight-top pointer-events-none opacity-40" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-8 sm:pt-14 pb-16 sm:pb-24">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/80 border border-zinc-800 text-zinc-300 mb-8 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="font-medium tracking-wide">UNDER DEVELOPMENT</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">v{SITE_CONFIG.version}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          The most powerful{' '}
          <span className="text-zinc-400 font-normal">
            LLM harness.
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
            <span>Explore Evidor</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
          </a>

          <a
            href={SITE_CONFIG.testPypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Try the package</span>
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
              A harness, not another wrapper.
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Evidor provides the infrastructure layer between an application and the underlying LLM providers. Rather than masking provider APIs with leaky abstractions, it provides deterministic context compaction and standardized multi-turn execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Concept 1 */}
            <div className="p-6 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-5">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Provider agnostic
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Use a consistent interface across model providers. Swap between OpenAI, Anthropic, Gemini, or custom models without rewriting conversational prompt glue or state machines.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                OpenAI • Anthropic • Gemini
              </div>
            </div>

            {/* Concept 2 */}
            <div className="p-6 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-5">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Context aware
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Evidor automatically manages conversation history within configurable token and message limits, compacting older context using model-generated summaries while preserving system prompts and recent turns.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                16k token window • 50 turns
              </div>
            </div>

            {/* Concept 3 */}
            <div className="p-6 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-5">
                  <Workflow className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Built for agents
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Provides a clean foundation for increasingly sophisticated LLM and agent systems without tying application code to a single model provider or imposing bulky frameworks.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                Clean primitives • Extensible
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
              What exists today
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl">
              Verified capabilities implemented in <code className="text-zinc-200 font-mono">evidor-core v{SITE_CONFIG.version}</code>.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-500 border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 rounded">
            18 verified features
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            {
              title: 'Unified Agent Interface',
              desc: 'Single high-level Agent class managing conversational state, model calls, and turn compaction.',
              code: 'Agent(provider)',
            },
            {
              title: '@tool Decorator',
              desc: 'Transform standard Python functions into provider-neutral tools with docstring & type extraction.',
              code: '@tool def search(...)',
            },
            {
              title: 'Automatic Schema Derivation',
              desc: 'Derives compliant JSON Schema for parameters automatically from type hints and docstring descriptions.',
              code: 'get_weather(loc: str, unit: str)',
            },
            {
              title: 'Autonomous Tool Loop',
              desc: 'Executes tool calls requested by models, feeds results back as role="tool", and loops until completion.',
              code: 'Agent(tools=[...], max_tool_iterations=10)',
            },
            {
              title: 'Programmatic Tool Class',
              desc: 'Instantiate Tool directly for dynamic schemas or lambdas without standard Python function signatures.',
              code: 'Tool(name=..., parameters=...)',
            },
            {
              title: 'OpenAI Provider',
              desc: 'Native adapter for GPT-4, GPT-4o, and gpt-4.1-mini with automatic tool call conversion.',
              code: 'OpenAIProvider()',
            },
            {
              title: 'Anthropic Provider',
              desc: 'Official adapter for Claude 3.5 Sonnet and Haiku with native tool format mapping.',
              code: 'AnthropicProvider()',
            },
            {
              title: 'Gemini Provider',
              desc: 'High-speed Gemini adapter built on the official google-genai SDK with function declarations.',
              code: 'GeminiProvider()',
            },
            {
              title: 'Multi-turn Conversations',
              desc: 'Session history persists across consecutive agent.send() calls with structured message sequences.',
              code: 'agent.send("...")',
            },
            {
              title: 'Persistent Session History',
              desc: 'Read-only access to conversation turns via agent.messages property for inspection or caching.',
              code: 'agent.messages',
            },
            {
              title: 'System Prompts',
              desc: 'Permanent developer instructions preserved throughout compaction resets and turn cycles.',
              code: 'system_prompt="..."',
            },
            {
              title: 'Automatic Context Management',
              desc: 'Dynamically tracks dialogue length against token limits to prevent model context window overflow.',
              code: 'context_window=16_000',
            },
            {
              title: 'Configurable Message History',
              desc: 'Enforce maximum message retention thresholds before triggering background compaction.',
              code: 'max_messages=50',
            },
            {
              title: 'Automatic Compaction',
              desc: 'Seamlessly collapses older conversational turns into a concise summary while maintaining recent context.',
              code: 'ConversationContext',
            },
            {
              title: 'Model-based Summarization',
              desc: 'Preserves essential conversational nuance by synthesizing dialogue with LLM intelligence.',
              code: 'is_summary=True',
            },
            {
              title: 'Configurable Summarizer Model',
              desc: 'Assign a lighter model string or an entirely different ModelProvider to execute compaction cheaply.',
              code: 'summarization_model',
            },
            {
              title: 'Low-level Generation',
              desc: 'Bypass session state when needed with GenerationRequest and GenerationResponse for raw provider calls.',
              code: 'GenerationRequest',
            },
            {
              title: 'Custom Provider Support',
              desc: 'Plug any self-hosted model or custom endpoint into Agent by fulfilling the ModelProvider protocol.',
              code: 'ModelProvider protocol',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xs font-semibold text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800/80">
                <code className="text-[10px] font-mono text-zinc-400 block truncate">
                  {item.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3.5 TOOLS & FUNCTION CALLING */}
      {/* ========================================================================= */}
      <section id="tools" className="py-20 border-t border-white/[0.08] bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              TOOL PRIMITIVES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Native tool primitives &amp; autonomous loops.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Equip your agents with Python functions using <code className="text-zinc-200 font-mono">@tool</code>. Evidor automatically derives JSON Schema from type hints and docstrings, translates tool definitions across providers, and executes multi-turn tool loops until final response completion.
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
              Clean separation between client application, conversational state, bounded context compaction, and model execution.
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
            Start with a single Agent. Swap providers without rewriting your application.
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
              DIFFERENTIATOR
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Never let context become your bottleneck.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Evidor tracks conversation history against configurable token and message limits. When the conversation becomes too large:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400 pt-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>Older messages are summarized</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>Summary retained as bounded context</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>System prompt remains intact</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>Recent turns remain available</span>
              </div>
            </div>
          </div>

          <ContextTimeline />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PROVIDERS SECTION */}
      {/* ========================================================================= */}
      <section id="providers" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-8">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
            ADAPTERS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            One interface. Your model.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Install only what you need with isolated package extras.
          </p>
        </div>

        <ProvidersSection />
      </section>

      {/* ========================================================================= */}
      {/* 8. VERSION / RELEASE SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 border-t border-white/[0.08] bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-xl bg-zinc-950 border border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>v{SITE_CONFIG.version} · Development release · Available on TestPyPI</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Early, evolving, open to the future.
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Changes merged to <code className="text-zinc-200 font-mono">dev</code> automatically publish prereleases to TestPyPI. Merges to <code className="text-zinc-200 font-mono">main</code> trigger stable releases to PyPI governed by Conventional Commits.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-zinc-500 pt-1">
                <span>fix: → patch</span>
                <span>•</span>
                <span>feat: → minor</span>
                <span>•</span>
                <span>feat!: → major</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={SITE_CONFIG.testPypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-medium text-xs bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm"
              >
                <span>View package →</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
              </a>
              <Link
                href="/docs#release-model"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <span>Release Docs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ROADMAP / VISION SECTION */}
      {/* ========================================================================= */}
      <section id="roadmap" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 border border-zinc-800 bg-zinc-900/60 mb-2">
            <span>VISION &amp; ROADMAP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Where Evidor is going
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Architectural milestones defining future releases. These capabilities are not implemented in <code className="text-zinc-300 font-mono">v1.0.0-dev.2</code> today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Cpu,
              tag: 'VISION',
              title: 'Richer Agent Primitives',
              desc: 'Structured reasoning loops, multi-agent communication channels, and declarative execution states.',
            },
            {
              icon: Database,
              tag: 'VISION',
              title: 'Persistent Memory & Vector Store',
              desc: 'Pluggable semantic memory backends to search cross-session facts beyond in-flight context compaction.',
            },
            {
              icon: Sliders,
              tag: 'ROADMAP',
              title: 'Model Context Protocol (MCP)',
              desc: 'Standardized client harness for remote MCP servers, sandboxed execution, and distributed agent toolkits.',
            },
            {
              icon: Eye,
              tag: 'ROADMAP',
              title: 'Observability & Tracing',
              desc: 'OpenTelemetry integration, token expenditure waterfalls, and latency breakdown spans per turn.',
            },
            {
              icon: ShieldAlert,
              tag: 'VISION',
              title: 'Robust Execution & Rate Limiting',
              desc: 'Exponential backoff, automatic provider fallback routes, and intelligent token throttle guards.',
            },
            {
              icon: GitBranch,
              tag: 'ROADMAP',
              title: 'Expanded Provider Matrix',
              desc: 'Additional adapters for Mistral, Bedrock, Groq, Ollama, and local vLLM endpoints.',
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
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-zinc-500 border border-zinc-800">
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
            Build on a foundation that scales with model advancements.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Evidor is open-source under the MIT license. Check out the core repository on GitHub or test the package from TestPyPI.
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
