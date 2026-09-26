import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { HeroVisual } from '@/components/HeroVisual';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ContextTimeline } from '@/components/ContextTimeline';
import { ProvidersSection } from '@/components/ProvidersSection';
import { CodeSection } from '@/components/CodeSection';
import { GithubIcon } from '@/components/GithubIcon';
import {
  ExternalLink,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Sliders,
  CheckCircle2,
  Workflow,
  Compass,
  Boxes,
  Eye,
  GitBranch,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden pt-24 sm:pt-32 pb-20">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none opacity-60" />
      <div className="absolute top-48 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16 sm:pb-24">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-sky-950/40 border border-sky-500/30 text-sky-300 mb-8 backdrop-blur-md shadow-lg shadow-sky-500/5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase text-[11px]">● UNDER DEVELOPMENT</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">v{SITE_CONFIG.version}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          The most powerful{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200">
            LLM harness.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-3">
          {SITE_CONFIG.tagline}
        </p>

        {/* Secondary Sentence */}
        <p className="text-sm sm:text-base text-slate-400 font-mono max-w-2xl mx-auto mb-10">
          {SITE_CONFIG.subtagline}
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={SITE_CONFIG.githubCoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-xl shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:scale-[1.02] active:scale-98"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Explore Evidor</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-200" />
          </a>

          <a
            href={SITE_CONFIG.testPypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-98"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Try the package</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
          >
            <span>Read Docs</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Version / Status Indicator Pill */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 mb-14">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>v{SITE_CONFIG.version} · Early development</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Pre-release preview</span>
        </div>

        {/* Hero Visual Component */}
        <HeroVisual />
      </section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT PHILOSOPHY SECTION */}
      {/* ========================================================================= */}
      <section id="philosophy" className="py-24 border-t border-white/5 relative bg-[#06070a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Core Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A harness, not another wrapper.
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Most AI libraries either lock you into proprietary SDK opinions or leave you to write brittle prompt-management glue code by hand. Evidor provides the infrastructure harness between an application and the underlying LLM providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Concept 1: Provider agnostic */}
            <div className="p-7 rounded-2xl bg-[#0a0c13] border border-white/10 hover:border-sky-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Provider agnostic
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Use a single, clean, consistent interface across model providers. Write your application logic once and swap between OpenAI, Anthropic, Gemini, or custom models without rewriting prompts or session handlers.
              </p>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Adapters:</span>
                <span className="text-sky-300">OpenAI</span>
                <span>•</span>
                <span className="text-indigo-300">Anthropic</span>
                <span>•</span>
                <span className="text-emerald-300">Gemini</span>
              </div>
            </div>

            {/* Concept 2: Context aware */}
            <div className="p-7 rounded-2xl bg-[#0a0c13] border border-white/10 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Context aware
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Never overflow the model window. Evidor automatically monitors conversation history against configurable token and message limits, compacting older context using model-generated summaries while preserving system prompts and recent turns.
              </p>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Defaults:</span>
                <span className="text-emerald-300">16,000 tokens</span>
                <span>•</span>
                <span className="text-emerald-300">50 messages</span>
              </div>
            </div>

            {/* Concept 3: Built for agents */}
            <div className="p-7 rounded-2xl bg-[#0a0c13] border border-white/10 hover:border-indigo-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Built for agents
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Autonomous AI systems require dependable foundations. Evidor gives you predictable state management, direct provider generation escape hatches, and extensibility hooks without imposing heavy agent-framework overhead.
              </p>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Direction:</span>
                <span className="text-indigo-300">Clean primitives</span>
                <span>•</span>
                <span className="text-slate-400">Autonomous future</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CURRENT CAPABILITIES SECTION */}
      {/* ========================================================================= */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified In evidor-core v{SITE_CONFIG.version}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What exists today
            </h2>
            <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
              Every capability listed below is implemented and tested in the core repository. We distinguish what is live right now from our future roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              14 Verified Core Features
            </span>
          </div>
        </div>

        {/* 14 verified capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Unified Agent Interface',
              desc: 'Single, high-level Agent class managing conversational state, provider generation, and memory compaction.',
              code: 'Agent(provider)',
            },
            {
              title: 'OpenAI Provider',
              desc: 'Official adapter supporting GPT-4, GPT-4o, and gpt-4.1-mini using the modern openai Python client.',
              code: 'OpenAIProvider(model="...")',
            },
            {
              title: 'Anthropic Provider',
              desc: 'Native adapter for Claude 3.5 Sonnet and Haiku via anthropic package with role translation.',
              code: 'AnthropicProvider(model="...")',
            },
            {
              title: 'Gemini Provider',
              desc: 'High-speed Gemini adapter built on the official google-genai SDK for Gemini 2.5 and Flash models.',
              code: 'GeminiProvider(model="...")',
            },
            {
              title: 'Multi-turn Conversations',
              desc: 'Session history persists across consecutive agent.send() calls with structured message sequences.',
              code: 'agent.send("Hello")',
            },
            {
              title: 'Persistent Session History',
              desc: 'Full immutable access to conversation turns via agent.messages property for inspection or serialization.',
              code: 'agent.messages',
            },
            {
              title: 'System Prompts Preservation',
              desc: 'Permanent developer guidance that remains anchored and intact throughout conversation resets and compaction.',
              code: 'system_prompt="..."',
            },
            {
              title: 'Automatic Context Management',
              desc: 'Dynamically bounds dialogue length against token constraints to prevent model window exhaustion errors.',
              code: 'context_window=16_000',
            },
            {
              title: 'Configurable Message Limits',
              desc: 'Enforce maximum message retention thresholds before triggering background conversation compaction.',
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
              code: 'summarization_model="..."',
            },
            {
              title: 'Direct Low-level Generation',
              desc: 'Bypass session state when needed with GenerationRequest and GenerationResponse for raw provider calls.',
              code: 'provider.generate(request)',
            },
            {
              title: 'Custom Provider Protocol',
              desc: 'Plug any self-hosted model or custom inference endpoint into Agent by fulfilling the ModelProvider protocol.',
              code: 'ModelProvider protocol',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#090b12] border border-white/10 hover:border-sky-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">#0{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <code className="text-[11px] font-mono text-sky-400/90 bg-sky-950/30 px-2 py-0.5 rounded border border-sky-500/20 block truncate">
                  {item.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ARCHITECTURE SECTION */}
      {/* ========================================================================= */}
      <section id="architecture" className="py-24 border-t border-white/5 bg-[#06070a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-3">
              <Workflow className="w-3.5 h-3.5" />
              <span>Harness Topology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Modular infrastructure between app and intelligence
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Evidor cleanly separates your application logic, stateful session memory, context compaction, and model communication. Below is the internal execution topology.
            </p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CODE SECTION */}
      {/* ========================================================================= */}
      <section id="quickstart" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simple on the surface. Powerful underneath.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Start with a single Agent. Swap providers without rewriting your application.
          </p>
        </div>

        <CodeSection />
      </section>

      {/* ========================================================================= */}
      {/* 6. CONTEXT MANAGEMENT SECTION */}
      {/* ========================================================================= */}
      <section id="context" className="py-24 border-t border-white/5 bg-[#06070a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>Context Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Never let context become your bottleneck.
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Conversations grow, token budgets drain, and LLMs degrade when context windows become saturated. Evidor automatically manages conversational history within configurable limits. When the conversation becomes too large:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Older messages are summarized via the model</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>The summary is retained as bounded context</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>The system prompt remains completely intact</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Recent conversation turns remain available for immediate context</span>
              </li>
            </ul>
          </div>

          <ContextTimeline />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PROVIDERS SECTION */}
      {/* ========================================================================= */}
      <section id="providers" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-3">
            <Boxes className="w-3.5 h-3.5" />
            <span>Ecosystem Adapters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One interface. Your model.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Install only what you need. Evidor isolates provider dependencies into clean package extras so your production containers stay lean.
          </p>
        </div>

        <ProvidersSection />
      </section>

      {/* ========================================================================= */}
      {/* 8. VERSION / RELEASE SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-white/5 bg-[#06070a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-sky-950/20 via-slate-900/40 to-indigo-950/20 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>v{SITE_CONFIG.version} · Development release · Available on TestPyPI</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Early, evolving, open to the future.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Evidor is actively developed using automated continuous deployment. Changes merged to <code className="text-sky-300 font-mono">dev</code> automatically publish prereleases to TestPyPI, while <code className="text-sky-300 font-mono">main</code> publishes stable releases to PyPI governed by Conventional Commits.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                  <span>fix: → patch</span>
                  <span>•</span>
                  <span>feat: → minor</span>
                  <span>•</span>
                  <span>feat!: / BREAKING CHANGE: → major</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                <a
                  href={SITE_CONFIG.testPypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition-all active:scale-98"
                >
                  <span>View package →</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/docs#release-model"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                >
                  <span>Release Docs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ROADMAP / VISION SECTION */}
      {/* ========================================================================= */}
      <section id="roadmap" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs mb-3 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>VISION &amp; ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Where Evidor is going
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            The items below represent our long-term trajectory and architectural roadmap. These are not present in <code className="text-slate-300 font-mono">v1.0.0-dev.2</code> today, but define the engineering milestones ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              title: 'Tool & Function Orchestration',
              desc: 'Native JSON schema validation, parallel tool dispatch, and sandboxed tool execution harnesses.',
            },
            {
              icon: Eye,
              tag: 'ROADMAP',
              title: 'Observability & Tracing',
              desc: 'OpenTelemetry integration, token expenditure waterfalls, and latency breakdown spans per turn.',
            },
            {
              icon: ShieldCheck,
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
                className="p-6 rounded-xl bg-[#090b12] border border-white/10 relative group hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
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
      <section className="py-20 border-t border-white/5 bg-gradient-to-b from-[#07080b] to-[#040407] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Build on a foundation that scales with model advancements.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Evidor is open-source under the MIT license. Check out the core repository on GitHub or test the package from TestPyPI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={SITE_CONFIG.githubCoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-semibold text-sm transition-all shadow-xl"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub (evidor-core)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-sm transition-all"
            >
              <span>Explore Documentation</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
