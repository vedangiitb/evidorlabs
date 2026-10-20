'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, CODE_EXAMPLES } from '@/lib/constants';
import { useReleaseInfo } from '@/lib/useReleaseInfo';
import { CodeBlock } from '@/components/CodeBlock';
import { GithubIcon } from '@/components/GithubIcon';
import {
  ArrowUpRight,
  ChevronRight,
  GitBranch,
  Terminal,
  ShieldCheck,
  FolderTree,
  Globe,
  Zap,
  Server,
  Activity,
  RotateCw,
  EyeOff,
  Search,
  X,
  List,
  BrainCircuit,
  Boxes,
  Workflow,
  Database,
  Cpu,
  Radio,
  Network,
} from 'lucide-react';

const DOCS_SECTIONS = [
  {
    category: 'Getting Started',
    items: [
      { id: 'overview', title: 'Overview' },
      { id: 'installation', title: 'Installation' },
      { id: 'quickstart', title: 'Quickstart' },
    ],
  },
  {
    category: 'Two Execution Paradigms',
    items: [
      { id: 'two-paradigms', title: 'Core Architecture: Two Paradigms' },
      { id: 'stateful-conversations', title: 'Stateful Multi-Turn (Agent)' },
      { id: 'system-prompts', title: 'System Prompts' },
      { id: 'context-architecture', title: 'Context Under The Hood' },
      { id: 'native-compaction', title: 'Native Provider Compaction' },
      { id: 'inspecting-state', title: 'Inspecting & Resetting State' },
    ],
  },
  {
    category: 'Stateless LLM Calls',
    items: [
      { id: 'stateless-calls', title: 'Stateless provider.generate()' },
      { id: 'user-managed-history', title: 'User-Managed Message History' },
      { id: 'stateless-tools', title: 'Stateless Tool Calling' },
    ],
  },
  {
    category: 'Streaming Responses',
    items: [
      { id: 'streaming-overview', title: 'Unified Streaming Architecture' },
      { id: 'streaming-sync', title: 'Synchronous Streaming (agent.send)' },
      { id: 'streaming-async', title: 'Asynchronous Streaming (send_async)' },
      { id: 'streaming-tools', title: 'Streaming with Autonomous Tools' },
      { id: 'streaming-thinking', title: 'Streaming Thinking & Reasoning Tokens' },
      { id: 'streaming-stateless', title: 'Stateless Provider Streaming' },
      { id: 'streaming-cleanup', title: 'Context Managers & TTFT Telemetry' },
    ],
  },
  {
    category: 'Reasoning & Thinking Mode',
    items: [
      { id: 'thinking-mode', title: 'Configurable Thinking Flags' },
      { id: 'thinking-inspection', title: 'Inspecting Reasoning Steps' },
      { id: 'thinking-signatures', title: 'Cryptographic Signatures' },
    ],
  },
  {
    category: 'Async Execution Engine',
    items: [
      { id: 'async-conversations', title: 'Native Async Conversations' },
      { id: 'concurrent-tools', title: 'Concurrent Multi-Tool Gather' },
      { id: 'connection-pooling', title: 'Persistent Connection Pooling' },
      { id: 'loop-guards', title: 'Event Loop Guards & Teardown' },
    ],
  },
  {
    category: 'Tools & Functions',
    items: [
      { id: 'tool-definition', title: 'Defining Tools with @tool' },
      { id: 'agent-tools', title: 'Equipping Agents with Tools' },
      { id: 'async-tools', title: 'Async Tools & Timeouts' },
      { id: 'manual-tools', title: 'Manual Tool Definition' },
    ],
  },
  {
    category: 'Built-in Toolkits',
    items: [
      { id: 'builtin-tools', title: 'Calculator & Current Time' },
      { id: 'filesystem-tools', title: 'Scoped Filesystem Tools' },
      { id: 'web-search', title: 'Provider-Neutral Web Search' },
      { id: 'webpage-reader', title: 'Webpage Reader (read_webpage)' },
      { id: 'evidence-store', title: 'Evidence Store (EvidenceStore)' },
    ],
  },
  {
    category: 'Model Context Protocol (MCP)',
    items: [
      { id: 'mcp-overview', title: 'MCP Overview & Stdio' },
      { id: 'mcp-async', title: 'Async MCP with send_async' },
      { id: 'mcp-remote', title: 'Streamable HTTP & SSE Transports' },
      { id: 'mcp-multiple', title: 'Connecting Multiple MCP Servers' },
      { id: 'mcp-shared', title: 'Shared MCPClient Across Agents' },
      { id: 'mcp-standalone', title: 'Standalone MCPClient Usage' },
    ],
  },
  {
    category: 'Telemetry & Observability',
    items: [
      { id: 'telemetry-overview', title: 'Decoupled Actor Runtime' },
      { id: 'telemetry-adapters', title: 'OpenTelemetry, Langfuse, Phoenix, Prometheus' },
      { id: 'telemetry-thinking', title: 'Thinking Visibility (capture_thinking)' },
      { id: 'telemetry-privacy', title: 'Privacy & PII (capture_content=False)' },
      { id: 'custom-sinks', title: 'Custom Sinks & Tuning' },
    ],
  },
  {
    category: 'Providers & Low-Level API',
    items: [
      { id: 'supported-providers', title: 'Supported Providers & Modern APIs' },
      { id: 'custom-providers', title: 'Custom ModelProvider Protocol' },
      { id: 'optional-extras', title: 'Optional Package Extras' },
    ],
  },
  {
    category: 'Release & Build',
    items: [
      { id: 'release-model', title: 'PyPI Release Model' },
      { id: 'local-build', title: 'Local Build & Testing' },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { version, pypiUrl } = useReleaseInfo();
  const effectivePypiUrl = pypiUrl || SITE_CONFIG.pypiUrl;

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return DOCS_SECTIONS;
    const q = searchQuery.toLowerCase().trim();
    return DOCS_SECTIONS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          group.category.toLowerCase().includes(q)
      ),
    })).filter((group) => group.items.length > 0);
  }, [searchQuery]);

  // Scroll spy: automatically sync active section as user scrolls
  useEffect(() => {
    const sectionIds = DOCS_SECTIONS.flatMap((g) => g.items.map((i) => i.id));
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-20 pb-20 min-h-screen bg-black text-white">
      {/* Top Banner: Status */}
      <div className="border-b border-zinc-800/80 bg-zinc-950 px-4 py-2 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              Documentation for <strong>evidor v{version.replace(/^v/, '')}</strong>. Published on PyPI.
            </span>
          </div>
          <a
            href={effectivePypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 hover:text-white"
          >
            <span>PyPI Package</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Mobile Navigation Dropdown (< lg) */}
        <div className="lg:hidden mb-6 sticky top-16 z-30 bg-black/90 backdrop-blur-md border border-zinc-800/80 rounded-xl p-2.5 shadow-lg">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono"
          >
            <div className="flex items-center gap-2 truncate">
              <List className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="text-zinc-500">Jump to:</span>
              <span className="text-white font-medium truncate">
                {DOCS_SECTIONS.flatMap((g) => g.items).find((i) => i.id === activeSection)?.title || 'Overview'}
              </span>
            </div>
            <ChevronRight className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`} />
          </button>

          {mobileMenuOpen && (
            <div className="mt-2 p-3 rounded-lg bg-[#09090b] border border-zinc-800 max-h-80 overflow-y-auto space-y-4 text-xs sidebar-scroll">
              {DOCS_SECTIONS.map((group) => (
                <div key={group.category} className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-zinc-500 font-semibold px-2">
                    {group.category}
                  </div>
                  {group.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`block px-2.5 py-1.5 rounded transition-colors ${
                        activeSection === item.id
                          ? 'bg-zinc-800 text-white font-medium'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: Sticky, Independently Scrollable Table of Contents */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20 self-start max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain pr-2.5 pb-8 space-y-4 sidebar-scroll">
            <div className="p-3.5 rounded-lg bg-[#09090b] border border-white/[0.08]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                DOCUMENTATION
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Stateful &amp; stateless paradigms, native compaction, thinking flags, async engine, MCP, and telemetry.
              </p>
            </div>

            {/* Quick Section Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter 32 sections..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-zinc-950 border border-white/[0.08] focus:border-white/20 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  aria-label="Clear filter"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <nav className="space-y-5 text-xs">
              {filteredSections.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold px-2">
                    {group.category}
                  </h4>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            onClick={() => setActiveSection(item.id)}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                              isActive
                                ? 'bg-zinc-800 text-white font-medium border-l-2 border-white pl-2'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                            }`}
                          >
                            <span className="truncate">{item.title}</span>
                            {isActive && <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0 ml-1" />}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {filteredSections.length === 0 && (
                <div className="px-2 py-4 text-xs text-zinc-500 text-center font-mono">
                  No matching sections
                </div>
              )}
            </nav>

            {/* Quick links box */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
              <a
                href={effectivePypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors font-mono"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                  <span>PyPI v{version.replace(/^v/, '')}</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
              <a
                href={SITE_CONFIG.githubCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* MAIN DOCUMENTATION CONTENT */}
          {/* ========================================================================= */}
          <main className="lg:col-span-9 space-y-14 text-zinc-300">
            {/* 1. OVERVIEW */}
            <section id="overview" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                GETTING STARTED
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Evidor Documentation
              </h1>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Evidor is an open-source, provider-agnostic runtime for building AI agents. It provides a clean, modern interface for conversational agents across multiple model providers, with first-class support for stateful and stateless conversations, native context compaction, thinking flags, async-first concurrent execution, MCP, and decoupled telemetry.
              </p>

              <div className="p-4 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-zinc-400 leading-relaxed">
                <strong className="text-white block mb-1">Runtime Harness Architecture</strong>
                Unlike simple SDK wrappers that merely standardize request formats, Evidor acts as an operational runtime: coordinating conversational session state, delegating native context compaction to provider engines, executing concurrent async tool loops via <code className="text-zinc-200 font-mono">asyncio.gather()</code>, bridging external MCP servers, managing retry budgets, and dispatching non-blocking telemetry trace trees.
              </div>
            </section>

            {/* 2. INSTALLATION */}
            <section id="installation" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Installation
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Install Evidor from PyPI with the provider adapter(s) and extras needed for your stack:
              </p>

              <CodeBlock
                code={`# Install provider adapters
pip install "evidor[openai]"
pip install "evidor[anthropic]"
pip install "evidor[gemini]"

# Install MCP and telemetry extras
pip install "evidor[mcp]"
pip install "evidor[otel]"
pip install "evidor[langfuse]"
pip install "evidor[phoenix]"
pip install "evidor[prometheus]"

# Install all adapters, tools, and telemetry dependencies
pip install "evidor[all]"`}
                language="bash"
                filename="terminal"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="text-white font-semibold">Published on PyPI:</span> Package is published at{' '}
                <a
                  href={effectivePypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 underline hover:text-white"
                >
                  pypi.org/project/evidor/
                </a>
                . Compatible with Python 3.10 through Python 3.14.
              </div>
            </section>

            {/* 3. QUICKSTART */}
            <section id="quickstart" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Quickstart
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Create an <code className="text-zinc-200 font-mono">Agent</code> with any provider and send a message:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.quickstart}
                filename="quickstart.py"
                language="python"
              />

              <p className="text-xs text-zinc-500">
                Response objects expose <code className="text-zinc-300 font-mono">response.text</code> (assistant response string) and <code className="text-zinc-300 font-mono">response.model</code> (model identifier).
              </p>
            </section>

            {/* 4. TWO EXECUTION PARADIGMS */}
            <section id="two-paradigms" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                CORE ARCHITECTURE
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Core Architecture: Two Execution Paradigms
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor cleanly separates AI execution into two distinct paradigms:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>1. Stateful Conversations (Agent) — Recommended</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    Conversations maintain state automatically across turns—<strong>you do not have to pass the entire message history each time</strong>. Evidor manages session state, context continuation, and tool execution loops cleanly behind the scenes.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>2. Stateless LLM Calls (provider.generate)</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    Direct single-turn or user-managed requests with tools, structured outputs, and raw message histories. Available when your application manages its own database storage and persistence.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. STATEFUL CONVERSATIONS */}
            <section id="stateful-conversations" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Stateful Multi-Turn Conversations (Agent)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Use <code className="text-zinc-200 font-mono">send()</code> (or <code className="text-zinc-200 font-mono">send_async()</code>) to advance the conversation. Previous turns are remembered without re-passing the conversation history:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.statefulMultiTurn}
                filename="stateful_agent.py"
                language="python"
              />
            </section>

            {/* 6. SYSTEM PROMPTS */}
            <section id="system-prompts" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                System Prompts
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Configure an initial system prompt when creating an <code className="text-zinc-200 font-mono">Agent</code>. Evidor delivers the instructions natively across subsequent turns:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.systemPrompt}
                filename="system_prompt.py"
                language="python"
              />
            </section>

            {/* 7. CONTEXT UNDER THE HOOD */}
            <section id="context-architecture" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                How State and Context Are Handled Under the Hood
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Under the hood, Evidor transparently maps stateful conversations to each model provider&apos;s optimal context mechanism, ensuring efficient token usage without requiring you to manually re-send past messages:
              </p>

              <div className="overflow-x-auto text-xs font-mono">
                <table className="w-full border border-zinc-800 text-left">
                  <thead className="bg-zinc-900 text-zinc-300">
                    <tr>
                      <th className="p-2.5 border-b border-zinc-800">Provider</th>
                      <th className="p-2.5 border-b border-zinc-800">Strategy</th>
                      <th className="p-2.5 border-b border-zinc-800">Architecture</th>
                      <th className="p-2.5 border-b border-zinc-800">Compaction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-400">
                    <tr>
                      <td className="p-2.5 font-semibold text-white">OpenAIProvider</td>
                      <td className="p-2.5 text-emerald-400">&quot;response_chain&quot;</td>
                      <td className="p-2.5">Responses API previous_response_id</td>
                      <td className="p-2.5">Server-side at compact_threshold</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">GeminiProvider</td>
                      <td className="p-2.5 text-blue-400">&quot;interaction_chain&quot;</td>
                      <td className="p-2.5">Interactions API previous_interaction_id</td>
                      <td className="p-2.5">Managed in Interactions API</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">AnthropicProvider</td>
                      <td className="p-2.5 text-purple-400">&quot;stateless_replay&quot;</td>
                      <td className="p-2.5">Ephemeral Prompt Caching (KV-cache)</td>
                      <td className="p-2.5">Native compaction summary blocks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 8. NATIVE PROVIDER COMPACTION */}
            <section id="native-compaction" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Native Provider Compaction (compact_threshold)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For long-running agents and multi-turn workflows, both OpenAI and Anthropic provide native compaction to summarize older context at a token threshold rather than hitting context window limits:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.nativeCompaction}
                filename="native_compaction.py"
                language="python"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <strong className="text-white block">Compaction Lifecycle:</strong>
                <div>• <strong>OpenAI:</strong> Server-side compaction creates an opaque compaction item in the response stream. In <code className="text-zinc-200 font-mono">response_chain</code> mode, passing <code className="text-zinc-200 font-mono">previous_response_id</code> carries this compaction forward seamlessly.</div>
                <div>• <strong>Anthropic:</strong> Claude produces a native <code className="text-zinc-200 font-mono">compaction</code> block. Evidor preserves this compaction block and formats it into subsequent turns so Claude automatically drops older history.</div>
              </div>
            </section>

            {/* 9. INSPECTING & RESETTING STATE */}
            <section id="inspecting-state" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Inspecting and Resetting State
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Inspect provider identifiers, strategy, message history, or reset the conversation at any time:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.inspectingState}
                filename="inspect_state.py"
                language="python"
              />
            </section>

            {/* 10. STATELESS LLM CALLS */}
            <section id="stateless-calls" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                STATELESS PARADIGM
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Stateless LLM Calls (provider.generate)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                In the stateless paradigm, you interact directly with the underlying <code className="text-zinc-200 font-mono">ModelProvider</code> using <code className="text-zinc-200 font-mono">GenerationRequest</code>. Evidor executes the call directly against modern provider endpoints without maintaining or mutating any hidden conversation state:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.statelessCalls}
                filename="stateless_calls.py"
                language="python"
              />
            </section>

            {/* 11. USER-MANAGED HISTORY */}
            <section id="user-managed-history" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                User-Managed Message History
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                When your application handles its own persistence (e.g. database, chat storage, or custom state machine), you maintain the message list and pass it directly to <code className="text-zinc-200 font-mono">provider.generate()</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.userManagedHistory}
                filename="user_managed_history.py"
                language="python"
              />
            </section>

            {/* 12. STATELESS TOOLS */}
            <section id="stateless-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Stateless Tool Calling
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Supply tool definitions directly in a <code className="text-zinc-200 font-mono">GenerationRequest</code>. The model emits tool calls if needed, which you can execute statelessly in your own application loop:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.statelessTools}
                filename="stateless_tools.py"
                language="python"
              />
            </section>

            {/* STREAMING RESPONSES: OVERVIEW */}
            <section id="streaming-overview" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                STREAMING ENGINE
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Streaming Responses: Unified Architecture
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor provides a provider-agnostic streaming interface across all supported model providers (<strong>OpenAI</strong>, <strong>Google Gemini</strong>, and <strong>Anthropic Claude</strong>). By passing <code className="text-zinc-200 font-mono">stream=True</code>, you receive an iterable stream of lightweight chunks that emit tokens in real time while maintaining 100% compatibility with conversation memory, tool execution loops, and observability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Clean Stringification</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Chunks stringify directly to their text (<code className="text-zinc-300 font-mono">str(chunk)</code> returns <code className="text-zinc-300 font-mono">chunk.text</code>), so standard printing works out of the box: <code className="text-zinc-300 font-mono">print(chunk, end=&quot;&quot;, flush=True)</code>.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Silent Argument Buffering</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Tool arguments stream silently behind the scenes without polluting <code className="text-zinc-300 font-mono">chunk.text</code>. When tool execution finishes, the final synthesized response streams to the caller.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Automatic State Commit</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    At stream completion, message history, compaction summaries, and server-side state (<code className="text-zinc-300 font-mono">last_response_id</code>) are automatically updated and persisted.
                  </p>
                </div>
              </div>
            </section>

            {/* STREAMING: SYNCHRONOUS */}
            <section id="streaming-sync" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Synchronous Streaming (agent.send)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Call <code className="text-zinc-200 font-mono">agent.send(prompt, stream=True)</code> to receive an iterable stream. After consuming tokens, inspect the final accumulated response, token usage, and latency metrics:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.streamingSync}
                filename="streaming_sync.py"
                language="python"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <strong className="text-white block mb-1">Stream Inspection:</strong>
                <code className="text-zinc-200 font-mono">stream.response</code> provides the fully accumulated <code className="text-zinc-200 font-mono">GenerationResponse</code> object, including total tokens, finish reason, and model metadata.
              </div>
            </section>

            {/* STREAMING: ASYNCHRONOUS */}
            <section id="streaming-async" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Asynchronous Streaming (agent.send_async)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                In async environments (FastAPI, Starlette, Tornado, async background workers), use <code className="text-zinc-200 font-mono">await agent.send_async(..., stream=True)</code> and iterate with <code className="text-zinc-200 font-mono">async for chunk in stream:</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.streamingAsync}
                filename="streaming_async.py"
                language="python"
              />
            </section>

            {/* STREAMING: TOOLS */}
            <section id="streaming-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Streaming with Tools: Seamless Background Execution
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                When an agent needs to execute tools during a streaming turn:
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-zinc-400 leading-relaxed pl-2">
                <div>1. <strong>Clean Text Output:</strong> Tool arguments stream and accumulate silently behind the scenes. <code className="text-zinc-200 font-mono">chunk.text</code> remains empty string (<code className="text-zinc-200 font-mono">&quot;&quot;</code>), ensuring raw JSON arguments never pollute the client stream.</div>
                <div>2. <strong>Automatic Execution:</strong> The agent detects and executes the tool function (concurrently via <code className="text-zinc-200 font-mono">asyncio.gather()</code> if multiple tools were invoked) and updates the conversation history with the tool result.</div>
                <div>3. <strong>Follow-Up Stream:</strong> The model automatically streams its final synthesized answer as text chunks to the caller.</div>
                <div>4. <strong>Optional UI Indicators:</strong> If you are building a user interface and want to show a loading badge or status indicator when a tool is called, inspect <code className="text-zinc-200 font-mono">chunk.tool_calls</code>:</div>
              </div>

              <CodeBlock
                code={CODE_EXAMPLES.streamingTools}
                filename="streaming_tools.py"
                language="python"
              />
            </section>

            {/* STREAMING: THINKING */}
            <section id="streaming-thinking" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Streaming Thinking &amp; Reasoning Tokens
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For reasoning models (<strong>OpenAI</strong> <code className="text-zinc-200 font-mono">gpt-6-astra</code>, <strong>Anthropic</strong> <code className="text-zinc-200 font-mono">claude-3-7-sonnet-20250219</code>, or <strong>Gemini</strong> <code className="text-zinc-200 font-mono">gemini-3.8-flash</code> with thinking enabled), intermediate thought tokens stream via <code className="text-zinc-200 font-mono">chunk.thinking</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.streamingThinking}
                filename="streaming_thinking.py"
                language="python"
              />
            </section>

            {/* STREAMING: STATELESS */}
            <section id="streaming-stateless" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Stateless Provider Streaming
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Stream direct single-turn LLM calls without agent wrappers using <code className="text-zinc-200 font-mono">provider.generate()</code> or <code className="text-zinc-200 font-mono">provider.generate_async()</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.streamingStateless}
                filename="streaming_stateless.py"
                language="python"
              />
            </section>

            {/* STREAMING: CONTEXT MANAGERS & TTFT */}
            <section id="streaming-cleanup" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Context Managers &amp; TTFT Telemetry
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Streams implement context manager protocols (<code className="text-zinc-200 font-mono">with</code> / <code className="text-zinc-200 font-mono">async with</code>) for deterministic cleanup if you break out of iteration early:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.streamingContextManager}
                filename="streaming_cleanup.py"
                language="python"
              />

              <div className="space-y-2 text-xs text-zinc-400 leading-relaxed p-4 rounded-lg bg-[#09090b] border border-white/[0.08]">
                <strong className="text-white block">Time to First Token (TTFT) &amp; Zero-Flooding Telemetry:</strong>
                <div>• <strong>time_to_first_token_ms:</strong> Measured precisely from the moment the HTTP stream request starts until the first content or thinking token arrives. Accessible on <code className="text-zinc-200 font-mono">stream.time_to_first_token_ms</code> and recorded on <code className="text-zinc-200 font-mono">LLMCallEndEvent</code>.</div>
                <div>• <strong>is_streaming:</strong> Boolean flag set to <code className="text-zinc-200 font-mono">True</code> on <code className="text-zinc-200 font-mono">LLMCallStartEvent</code> and <code className="text-zinc-200 font-mono">LLMCallEndEvent</code>.</div>
                <div>• <strong>Zero-Flooding Architecture:</strong> Evidor does not emit telemetry events per token. Lifecycle events are recorded at the call boundaries, preserving maximum streaming throughput without queue saturation.</div>
                <div>• <strong>stream.get_final_response():</strong> Retrieve the final accumulated <code className="text-zinc-200 font-mono">GenerationResponse</code> without consuming remaining chunks manually.</div>
              </div>
            </section>

            {/* 13. THINKING & REASONING MODE */}
            <section id="thinking-mode" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                REASONING CAPABILITIES
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Configurable Thinking &amp; Reasoning Mode
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor provides first-class support for reasoning models across <strong>OpenAI</strong> (<code className="text-zinc-200 font-mono">gpt-6-astra</code>, <code className="text-zinc-200 font-mono">gpt-6.1-sol</code>), <strong>Anthropic</strong> (<code className="text-zinc-200 font-mono">claude-3-7-sonnet-20250219</code>), and <strong>Gemini</strong> (<code className="text-zinc-200 font-mono">gemini-3.8-flash</code>). Configure thinking using provider-specific typed configuration classes or intuitive shorthands:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.thinkingConfig}
                filename="thinking_configs.py"
                language="python"
              />
            </section>

            {/* 14. INSPECTING REASONING */}
            <section id="thinking-inspection" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Inspecting Reasoning Steps &amp; Tokens
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                When thinking is enabled and the provider outputs thought tokens, the response provides both the visible text and the internal reasoning scratchpad:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.thinkingInspection}
                filename="inspect_thinking.py"
                language="python"
              />
            </section>

            {/* 15. CRYPTOGRAPHIC SIGNATURES */}
            <section id="thinking-signatures" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Multi-Turn Tool Calling &amp; Cryptographic Signatures
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Reasoning models from Anthropic and Gemini output thought blocks alongside cryptographic signatures (such as Anthropic&apos;s <code className="text-zinc-200 font-mono">signature</code> field or Gemini&apos;s thought parts). In multi-turn tool loops, these signatures must be preserved and replayed in subsequent conversation turns to avoid API verification errors. Evidor automatically captures and replays them in <code className="text-zinc-200 font-mono">agent.messages</code> and <code className="text-zinc-200 font-mono">thought_blocks</code> without requiring any manual handling.
              </p>
            </section>

            {/* 16. NATIVE ASYNC CONVERSATIONS */}
            <section id="async-conversations" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                ASYNC EXECUTION ENGINE
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Native Asynchronous Conversations (send_async)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor is built on an <strong>async-first execution engine</strong>. In async environments (like FastAPI, Starlette, Tornado), use <code className="text-zinc-200 font-mono">await agent.send_async(...)</code>. All async tools execute natively on the caller&apos;s event loop without thread transitions, cleanly preserving shared connection pools, locks, and <code className="text-zinc-200 font-mono">contextvars</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.asyncAgent}
                filename="async_agent.py"
                language="python"
              />
            </section>

            {/* 17. CONCURRENT MULTI-TOOL GATHER */}
            <section id="concurrent-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Concurrent Multi-Tool Execution (asyncio.gather)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                When an LLM emits multiple tool calls in a single turn, Evidor executes them <strong>concurrently via <code className="text-zinc-200 font-mono">asyncio.gather()</code></strong>. This significantly reduces turn latency for complex agent workflows:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.concurrentTools}
                filename="concurrent_tools.py"
                language="python"
              />
            </section>

            {/* PERSISTENT CONNECTION POOLING */}
            <section id="connection-pooling" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Persistent Connection Pooling &amp; Daemon Loop
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Synchronous <code className="text-zinc-200 font-mono">agent.send()</code> transparently bridges calls through an encapsulated background daemon event loop. This preserves underlying HTTP/2 keep-alive connection pools across conversation turns, eliminating TCP/TLS handshake latency on subsequent turns without tearing down sockets between calls:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.persistentConnectionPool}
                filename="connection_pooling.py"
                language="python"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <strong className="text-white block mb-1">Zero Handshake Overhead:</strong>
                Subsequent requests within an active agent session reuse active TLS sessions. When finished, call <code className="text-zinc-200 font-mono">agent.close()</code> (or use <code className="text-zinc-200 font-mono">with Agent(...) as agent:</code>) to cleanly drain connection pools and terminate the background daemon thread.
              </div>
            </section>

            {/* 18. EVENT LOOP GUARDS */}
            <section id="loop-guards" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Event Loop Guards &amp; Clean Teardown
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                <p>
                  Synchronous methods (<code className="text-zinc-200 font-mono">agent.send()</code>, <code className="text-zinc-200 font-mono">agent.close()</code>, <code className="text-zinc-200 font-mono">tool.execute()</code>, <code className="text-zinc-200 font-mono">mcp.get_tools()</code>) are protected with event loop guards. Calling them from inside an active event loop raises an explicit <code className="text-rose-400 font-mono">RuntimeError</code> immediately rather than hanging the event loop, directing you to use <code className="text-zinc-200 font-mono">await agent.send_async()</code>, <code className="text-zinc-200 font-mono">await agent.close_async()</code>, etc.
                </p>
                <p>
                  Clean up agents and background MCP sessions asynchronously using <code className="text-zinc-200 font-mono">await agent.close_async()</code> or the <code className="text-zinc-200 font-mono">async with agent:</code> context manager.
                </p>
              </div>
            </section>

            {/* 19. DEFINING TOOLS WITH @TOOL */}
            <section id="tool-definition" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                TOOLS &amp; FUNCTION CALLING
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Defining Tools with @tool
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Transform any Python function into a provider-neutral tool using the <code className="text-zinc-200 font-mono">@tool</code> decorator. Evidor automatically derives the JSON Schema for parameters from type annotations and extracts descriptions from docstrings:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.toolDefinition}
                filename="define_tools.py"
                language="python"
              />
            </section>

            {/* 20. EQUIPPING AGENTS WITH TOOLS */}
            <section id="agent-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Equipping Agents with Tools
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Pass your tools directly into <code className="text-zinc-200 font-mono">Agent(..., tools=[...])</code>. The agent automatically executes tool calls, feeds results back as <code className="text-zinc-200 font-mono">role=&quot;tool&quot;</code>, and loops until the model generates a final response:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.toolsQuickstart}
                filename="agent_tools.py"
                language="python"
              />
            </section>

            {/* 21. ASYNC TOOLS & TIMEOUTS */}
            <section id="async-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Async Tools &amp; Timeouts
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor seamlessly supports asynchronous functions and execution timeouts:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.asyncTools}
                filename="async_tools.py"
                language="python"
              />
            </section>

            {/* 22. MANUAL TOOLS */}
            <section id="manual-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Manual Tool Definition
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For dynamic or programmatic tools without a standard Python function signature, instantiate <code className="text-zinc-200 font-mono">Tool</code> directly:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.manualTool}
                filename="manual_tool.py"
                language="python"
              />
            </section>

            {/* 23. BUILT-IN UTILITY TOOLS */}
            <section id="builtin-tools" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                BUILT-IN TOOLKITS
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Built-in Utility Tools (Calculator &amp; Time)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor includes dependency-free tools you can opt into:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.builtInTools}
                filename="builtin_tools.py"
                language="python"
              />
            </section>

            {/* 24. SCOPED FILESYSTEM TOOLS */}
            <section id="filesystem-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Scoped Filesystem Tools
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Create filesystem tools scoped to an existing directory for listing, searching, reading, creating, updating, and deleting files with strict boundary checks:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.filesystemTools}
                filename="filesystem_tools.py"
                language="python"
              />
            </section>

            {/* 25. PROVIDER-NEUTRAL WEB SEARCH */}
            <section id="web-search" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Provider-Neutral Web Search
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Pluggable search using Tavily, Exa, or Brave adapters built exclusively with Python standard library:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.webSearch}
                filename="web_search.py"
                language="python"
              />
            </section>

            {/* 26. WEBPAGE READER */}
            <section id="webpage-reader" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Webpage Reader (read_webpage)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Let agents fetch and read clean, token-bounded text from web pages, stripping HTML boilerplate automatically:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.webpageReader}
                filename="read_webpage.py"
                language="python"
              />
            </section>

            {/* 27. STRUCTURED EVIDENCE STORE */}
            <section id="evidence-store" className="space-y-3 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-amber-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Structured Evidence Store (EvidenceStore)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Prevent context pollution and hallucinations across multi-step research or analysis tasks by equipping agents with an in-memory structured evidence store:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.evidenceStore}
                filename="evidence_store.py"
                language="python"
              />
            </section>

            {/* 28. MCP OVERVIEW & STDIO */}
            <section id="mcp-overview" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                MODEL CONTEXT PROTOCOL (MCP)
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                MCP Overview &amp; Local Stdio Servers
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Connect agents to external MCP servers (e.g. AWS Bedrock, Amazon search) over local stdio subprocesses:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.mcpQuickstart}
                filename="mcp_quickstart.py"
                language="python"
              />
            </section>

            {/* 29. REMOTE MCP TRANSPORTS */}
            <section id="mcp-remote" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Streamable HTTP &amp; SSE Remote MCP Transports
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Connect to remote hosted MCP servers using modern Streamable HTTP (<code className="text-zinc-200 font-mono">streamable-http</code> or <code className="text-zinc-200 font-mono">http</code>) or legacy SSE:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.mcpRemote}
                filename="mcp_remote.py"
                language="python"
              />
            </section>

            {/* 30. SHARED MCPCLIENT */}
            <section id="mcp-shared" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Shared MCPClient Across Agents
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                In FastAPI or multi-agent backends, share a single open <code className="text-zinc-200 font-mono">MCPClient</code> across agents to avoid spawning duplicate server subprocesses:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.sharedMcp}
                filename="shared_mcp.py"
                language="python"
              />
            </section>

            {/* 31. STANDALONE MCPCLIENT */}
            <section id="mcp-standalone" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Standalone MCPClient &amp; Tool Composition
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Use <code className="text-zinc-200 font-mono">MCPClient</code> standalone to inspect tools, retrieve resources, or mix MCP tools with standard Python tools:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.standaloneMcp}
                filename="standalone_mcp.py"
                language="python"
              />
            </section>

            {/* 32. TELEMETRY ACTOR RUNTIME */}
            <section id="telemetry-overview" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                TELEMETRY &amp; OBSERVABILITY
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Decoupled Actor Runtime &amp; Built-in Sinks
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Built on an asynchronous producer-consumer actor runtime. Event dispatch on the agent thread takes under 1 microsecond. Network transport and formatting run on a dedicated worker thread (<code className="text-zinc-200 font-mono">Evidor-Telemetry-Worker</code>). Built-in sinks require zero extra dependencies:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.telemetryOtel}
                filename="telemetry_setup.py"
                language="python"
              />
            </section>

            {/* 33. OBSERVABILITY ADAPTERS */}
            <section id="telemetry-adapters" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Observability Adapters (OTel, Langfuse, Phoenix, Prometheus)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Official ultra-compact adapters for industry-leading observability platforms:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.telemetryLangfuse}
                filename="langfuse_setup.py"
                language="python"
              />
            </section>

            {/* 34. THINKING VISIBILITY */}
            <section id="telemetry-thinking" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Thinking Visibility in Telemetry (capture_thinking)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Intermediate reasoning scratchpads can contain confidential information. Sinks default to <code className="text-zinc-200 font-mono">capture_thinking=False</code>, which redacts raw thought text while recording reasoning token metrics. Enable <code className="text-zinc-200 font-mono">capture_thinking=True</code> to make reasoning steps visible in trace dashboards:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.telemetryThinking}
                filename="capture_thinking.py"
                language="python"
              />
            </section>

            {/* 35. PRIVACY & PII PROTECTION */}
            <section id="telemetry-privacy" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Privacy &amp; PII Protection (capture_content=False)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Setting <code className="text-zinc-200 font-mono">capture_content=False</code> redacts all raw prompt text, model outputs, and tool arguments while preserving span trees, latencies, and token counts:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.telemetryPrivacy}
                filename="pii_protection.py"
                language="python"
              />
            </section>

            {/* 36. SUPPORTED PROVIDERS */}
            <section id="supported-providers" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                PROVIDERS &amp; LOW-LEVEL API
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Supported Providers &amp; Modern APIs
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor exclusively uses modern provider APIs with zero legacy fallbacks:
              </p>
              <div className="space-y-2 text-xs text-zinc-400">
                <div>• <strong>OpenAI (OpenAIProvider):</strong> Exclusively uses OpenAI Responses API (<code className="text-zinc-200 font-mono">client.responses.create</code>) with <code className="text-zinc-200 font-mono">previous_response_id</code> chaining. Requires <code className="text-zinc-200 font-mono">openai&gt;=1.0.0</code>.</div>
                <div>• <strong>Gemini (GeminiProvider):</strong> Exclusively uses Google Interactions API (<code className="text-zinc-200 font-mono">client.interactions.create</code>) with <code className="text-zinc-200 font-mono">previous_interaction_id</code> chaining. Requires <code className="text-zinc-200 font-mono">google-genai&gt;=1.0.0</code>.</div>
                <div>• <strong>Anthropic (AnthropicProvider):</strong> Messages API with native ephemeral prompt caching (<code className="text-zinc-200 font-mono">cache_control</code>) and native threshold compaction.</div>
              </div>
            </section>

            {/* 37. CUSTOM PROVIDERS */}
            <section id="custom-providers" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Custom ModelProvider Protocol
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Implement either synchronous <code className="text-zinc-200 font-mono">generate(request)</code>, native asynchronous <code className="text-zinc-200 font-mono">generate_async(request)</code>, or both:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.customProvider}
                filename="custom_async_provider.py"
                language="python"
              />
            </section>

            {/* 38. OPTIONAL EXTRAS */}
            <section id="optional-extras" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Optional Package Extras Summary
              </h2>
              <div className="overflow-x-auto text-xs font-mono">
                <table className="w-full border border-zinc-800 text-left">
                  <thead className="bg-zinc-900 text-zinc-300">
                    <tr>
                      <th className="p-2.5 border-b border-zinc-800">Extra</th>
                      <th className="p-2.5 border-b border-zinc-800">Purpose</th>
                      <th className="p-2.5 border-b border-zinc-800">Included Packages</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-400">
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[openai]</td>
                      <td className="p-2.5">OpenAI models (gpt-6-astra, gpt-4.1-mini)</td>
                      <td className="p-2.5">openai</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[anthropic]</td>
                      <td className="p-2.5">Anthropic Claude (claude-3-7-sonnet)</td>
                      <td className="p-2.5">anthropic</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[gemini]</td>
                      <td className="p-2.5">Google Gemini (gemini-3.8-flash)</td>
                      <td className="p-2.5">google-genai</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[mcp]</td>
                      <td className="p-2.5">Model Context Protocol servers</td>
                      <td className="p-2.5">mcp</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[otel]</td>
                      <td className="p-2.5">OpenTelemetry distributed tracing</td>
                      <td className="p-2.5">opentelemetry-api, opentelemetry-sdk</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[langfuse]</td>
                      <td className="p-2.5">Langfuse tracing &amp; evaluation</td>
                      <td className="p-2.5">langfuse</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[phoenix]</td>
                      <td className="p-2.5">Arize Phoenix OpenInference UI</td>
                      <td className="p-2.5">arize-phoenix-otel, openinference-semantic-conventions</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[prometheus]</td>
                      <td className="p-2.5">Prometheus metrics exposition</td>
                      <td className="p-2.5">prometheus-client</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">evidor[all]</td>
                      <td className="p-2.5">All providers, MCP, and telemetry adapters</td>
                      <td className="p-2.5">All optional extras</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 39. RELEASE MODEL */}
            <section id="release-model" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                RELEASE &amp; BUILD
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                PyPI Release Model
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Releases are automated via GitHub Actions and use Conventional Commits to calculate the next semantic version:
              </p>
              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-1 text-zinc-400">
                <div><code className="text-emerald-400">fix: ...</code> creates a patch release</div>
                <div><code className="text-emerald-400">feat: ...</code> creates a minor release</div>
                <div><code className="text-rose-400">BREAKING CHANGE: ...</code> creates a major release</div>
              </div>
            </section>

            {/* 40. LOCAL BUILD */}
            <section id="local-build" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Local Build &amp; Testing
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Build and test the package locally:
              </p>

              <CodeBlock
                code={`python -m pip install -e ".[dev]"
python -m pytest
python -m build
python -m twine check dist/*`}
                language="bash"
                filename="terminal"
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
