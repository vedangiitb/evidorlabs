'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Server,
  RotateCw,
  Activity,
  ShieldCheck,
  EyeOff,
  Database,
  Workflow,
  Zap,
  FolderTree,
  Globe,
  Wrench,
  Check,
  Copy,
  Terminal,
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  Clock,
  Filter,
  BrainCircuit,
  FileText,
  Boxes,
} from 'lucide-react';

type FilterCategory = 'all' | 'paradigms' | 'compaction' | 'thinking' | 'async_mcp' | 'telemetry';

export function CapabilitiesSection({ version }: { version: string }) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Micro-simulator states
  const [paradigmMode, setParadigmMode] = useState<'stateful' | 'stateless'>('stateful');
  const [compactionProvider, setCompactionProvider] = useState<'openai' | 'gemini' | 'anthropic'>('openai');
  const [thinkingModel, setThinkingModel] = useState<'openai' | 'anthropic' | 'gemini'>('openai');
  const [mcpTransport, setMcpTransport] = useState<'stdio' | 'http' | 'sse'>('stdio');
  const [captureThinking, setCaptureThinking] = useState(true);
  const [piiRedacted, setPiiRedacted] = useState(false);
  const [telemetryTab, setTelemetryTab] = useState<'otel' | 'langfuse' | 'prometheus'>('otel');

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const cleanVersion = version.replace(/^v/, '');

  return (
    <div className="space-y-8">
      {/* Category Filter Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#09090b] border border-white/[0.08]">
          {[
            { id: 'all', label: 'All Capabilities' },
            { id: 'paradigms', label: 'Stateful vs Stateless' },
            { id: 'compaction', label: 'Native Compaction' },
            { id: 'thinking', label: 'Thinking & Reasoning' },
            { id: 'async_mcp', label: 'Async Engine & MCP' },
            { id: 'telemetry', label: 'Telemetry & PII' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>v{cleanVersion} production ready</span>
        </div>
      </div>

      {/* Dynamic Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* ========================================================================= */}
        {/* BENTO CARD 1: TWO EXECUTION PARADIGMS - Span 2 */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'paradigms') && (
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Two Execution Paradigms</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                        Core Architecture
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono">
                  <button
                    onClick={() => setParadigmMode('stateful')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      paradigmMode === 'stateful'
                        ? 'bg-zinc-800 text-white font-medium'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Stateful (Agent)
                  </button>
                  <button
                    onClick={() => setParadigmMode('stateless')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      paradigmMode === 'stateless'
                        ? 'bg-zinc-800 text-white font-medium'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Stateless (generate)
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed max-w-xl mb-4">
                {paradigmMode === 'stateful'
                  ? 'Recommended for conversational agents. Maintains conversation memory across turns without re-passing the entire message history each time. Evidor handles server-side chaining and autonomous tool loops.'
                  : 'Direct single-turn requests with tools, structured outputs, and raw message lists. Ideal when your application has its own database/persistence layer and you require low-level control.'}
              </p>

              {/* Interactive Paradigm Preview */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3.5 space-y-2.5 font-mono text-xs">
                {paradigmMode === 'stateful' ? (
                  <>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-zinc-900 pb-2">
                      <span className="text-emerald-400">Agent(provider) // Session Memory</span>
                      <span className="text-zinc-400 text-[10px]">Turn 2 Delta Only</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="text-zinc-400">
                        <span className="text-zinc-600">Turn 1: </span>
                        agent.send(&quot;My favorite color is navy blue.&quot;)
                      </div>
                      <div className="text-emerald-300">
                        <span className="text-zinc-600">Turn 2: </span>
                        agent.send(&quot;What color did I say I like?&quot;)
                      </div>
                      <div className="text-zinc-500 text-[10px] pt-1 border-t border-zinc-900">
                        &quot;You said your favorite color is navy blue.&quot; (Chained natively via {`agent.strategy`})
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-zinc-900 pb-2">
                      <span className="text-cyan-400">provider.generate(request) // Stateless</span>
                      <span className="text-zinc-400 text-[10px]">User-Managed History</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="text-zinc-400">
                        chat_history = [Message(role=&quot;user&quot;, content=&quot;Recommend a Go KV store&quot;)]
                      </div>
                      <div className="text-cyan-300">
                        resp = provider.generate(GenerationRequest(messages=chat_history))
                      </div>
                      <div className="text-zinc-500 text-[10px] pt-1 border-t border-zinc-900">
                        Zero hidden state. Evidor never alters, prunes, or summarises your messages behind your back.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>{paradigmMode === 'stateful' ? 'agent.send() / send_async()' : 'provider.generate(request)'}</span>
              <Link href="/docs#stateful-conversations" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>View Architecture Guide</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 2: NATIVE PROVIDER COMPACTION */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'compaction') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-blue-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <Database className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 p-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono">
                  {(['openai', 'gemini', 'anthropic'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCompactionProvider(p)}
                      className={`px-1.5 py-0.5 rounded capitalize ${
                        compactionProvider === p
                          ? 'bg-zinc-800 text-white font-medium'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {p === 'gemini' ? 'Gemini' : p === 'anthropic' ? 'Claude' : 'OpenAI'}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Native Provider Compaction
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Context management and turn compaction are offloaded directly to model providers rather than hitting artificial local limits.
              </p>

              {/* Dynamic Strategy Box */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3 font-mono text-[11px] space-y-2">
                {compactionProvider === 'openai' && (
                  <>
                    <div className="flex justify-between text-zinc-400 text-[10px]">
                      <span>STRATEGY: response_chain</span>
                      <span className="text-emerald-400">compact_threshold=100000</span>
                    </div>
                    <div className="text-zinc-300">
                      Chains turns via Responses API <code className="text-emerald-400">previous_response_id</code>. Server-side compaction preserves opaque summary states.
                    </div>
                  </>
                )}
                {compactionProvider === 'gemini' && (
                  <>
                    <div className="flex justify-between text-zinc-400 text-[10px]">
                      <span>STRATEGY: interaction_chain</span>
                      <span className="text-blue-400">Google Interactions API</span>
                    </div>
                    <div className="text-zinc-300">
                      Chains turns via <code className="text-blue-400">previous_interaction_id</code>. State is persisted natively on Google servers.
                    </div>
                  </>
                )}
                {compactionProvider === 'anthropic' && (
                  <>
                    <div className="flex justify-between text-zinc-400 text-[10px]">
                      <span>STRATEGY: stateless_replay</span>
                      <span className="text-purple-400">Prompt Caching + Compaction</span>
                    </div>
                    <div className="text-zinc-300">
                      Caches prompt prefix with ephemeral KV-cache (90% savings). Replays Claude native <code className="text-purple-400">compaction</code> blocks.
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>compact_threshold=100000</span>
              <Link href="/docs#native-compaction" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 3: THINKING & REASONING MODE - Span 2 */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'thinking') && (
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-purple-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Configurable Thinking &amp; Reasoning</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20">
                        GPT-6 • Claude • Gemini
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono">
                  {(['openai', 'anthropic', 'gemini'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setThinkingModel(m)}
                      className={`px-2 py-0.5 rounded capitalize ${
                        thinkingModel === m
                          ? 'bg-zinc-800 text-white font-medium'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {m === 'openai' ? 'OpenAI (effort)' : m === 'anthropic' ? 'Anthropic (budget)' : 'Gemini (level)'}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed max-w-xl mb-4">
                First-class reasoning configuration via typed configs or intuitive shorthands. Inspect intermediate scratchpads via <code className="text-zinc-200 font-mono">response.thinking</code>, track reasoning tokens, and automatically replay cryptographic signatures across multi-turn tool loops.
              </p>

              {/* Dynamic Thinking Box */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3.5 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] border-b border-zinc-900 pb-2">
                  <span className="text-purple-300">
                    {thinkingModel === 'openai'
                      ? 'OpenAIProvider(model="gpt-6-astra", thinking="high")'
                      : thinkingModel === 'anthropic'
                      ? 'AnthropicProvider(model="claude-3-7-sonnet", thinking=4096)'
                      : 'GeminiProvider(model="gemini-3.8-flash", thinking="high")'}
                  </span>
                  <span className="text-zinc-500 text-[10px]">Cryptographic Signatures Preserved</span>
                </div>

                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <div className="text-zinc-500 text-[10px]">INTERNAL SCRATCHPAD (response.thinking):</div>
                  <div className="text-purple-300/90 text-[11px]">
                    &quot;1. Analyzing dependencies... 2. Inverting interface contract... 3. Verifying signature...&quot;
                  </div>
                </div>

                <div className="flex justify-between text-[10px] text-zinc-400 pt-1">
                  <span>Reasoning Tokens: 384</span>
                  <span className="text-emerald-400">Tool Calls Verified &amp; Signed</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>response.thinking &amp; response.usage.reasoning_tokens</span>
              <Link href="/docs#thinking-mode" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>View Thinking Guide</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 4: ASYNC-FIRST & CONCURRENT TOOLS */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'async_mcp') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  asyncio.gather
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Concurrent Multi-Tool Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                When an LLM emits multiple tool calls in a single turn, Evidor dispatches them concurrently via <code className="text-zinc-200 font-mono">asyncio.gather()</code>, slashing turn latency in complex multi-step workflows.
              </p>

              <div className="rounded-xl bg-black border border-white/[0.06] p-3 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>DISPATCH: Single Turn</span>
                  <span className="text-emerald-400">Parallel (Concurrent)</span>
                </div>
                <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  ⚡ fetch_user_profile(id=42)
                </div>
                <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  ⚡ fetch_recent_orders(id=42)
                </div>
                <div className="text-[10px] text-zinc-500 pt-1">
                  Event loop guards raise <code className="text-rose-400">RuntimeError</code> if sync calls are misused.
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>await agent.send_async(...)</span>
              <Link href="/docs#concurrent-tools" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 5: MODEL CONTEXT PROTOCOL (MCP) - Span 2 */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'async_mcp') && (
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Model Context Protocol (MCP)</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                        stdio • HTTP • SSE
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono">
                  {(['stdio', 'http', 'sse'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMcpTransport(t)}
                      className={`px-2 py-0.5 rounded ${
                        mcpTransport === t
                          ? 'bg-zinc-800 text-white font-medium'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {t === 'http' ? 'streamable-http' : t}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed max-w-xl mb-4">
                Connect agents seamlessly to external MCP servers with automatic tool discovery, argument validation, and collision prevention. Use <code className="text-zinc-200 font-mono">mcp_client</code> to share a single client across multiple agents in FastAPI without spawning duplicate subprocesses.
              </p>

              {/* Interactive Micro-Simulator for MCP */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3.5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-zinc-900 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-zinc-300">
                      {mcpTransport === 'stdio'
                        ? 'stdio: uvx amazon-mcp-server'
                        : mcpTransport === 'http'
                        ? 'streamable-http: https://mcp.internal/mcp'
                        : 'sse: http://localhost:8080/sse'}
                    </span>
                  </div>
                  <span className="text-zinc-500 text-[10px]">3 tools discovered</span>
                </div>

                {/* Discovered Tool Tags */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-emerald-400" />
                    <span>amazon.search_products</span>
                  </span>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-emerald-400" />
                    <span>amazon.get_product_reviews</span>
                  </span>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-emerald-400" />
                    <span>amazon.check_inventory</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>pip install &quot;evidor[mcp]&quot;</span>
              <Link href="/docs#mcp-overview" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>View MCP Guide</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 6: EVIDENCE STORE & WEBPAGE READER */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'async_mcp') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-amber-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
                  <Boxes className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  v1.5+
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Evidence Store &amp; Web Reader
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Equip research agents with <code className="text-zinc-200 font-mono">EvidenceStore</code> to prevent hallucinations across multi-step research, and <code className="text-zinc-200 font-mono">read_webpage</code> to strip HTML boilerplate with character bounds.
              </p>

              <div className="rounded-xl bg-black border border-white/[0.06] p-3 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-zinc-400 text-[10px]">
                  <span>store.tools: 3 primitives</span>
                  <span className="text-amber-400">store.to_markdown()</span>
                </div>
                <div className="text-zinc-300">
                  [ev_1] architecture: SQLite zero-network vs PostgreSQL concurrency
                </div>
                <div className="text-zinc-500 text-[10px] pt-1">
                  Bounded to 15,000 chars per page fetch.
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>EvidenceStore &amp; read_webpage</span>
              <Link href="/docs#evidence-store" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 7: TELEMETRY ACTOR & THINKING VISIBILITY */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'telemetry') && (
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-purple-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Telemetry Actor Runtime &amp; Thinking Visibility</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20">
                        &lt;1µs overhead
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Sinks Tabs */}
                <div className="flex items-center gap-1 p-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono">
                  {(['otel', 'langfuse', 'prometheus'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setTelemetryTab(s)}
                      className={`px-2 py-0.5 rounded ${
                        telemetryTab === s
                          ? 'bg-zinc-800 text-white font-medium'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {s === 'otel' ? 'OpenTelemetry' : s === 'langfuse' ? 'Langfuse' : 'Prometheus'}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed max-w-xl mb-4">
                Asynchronous producer-consumer actor runtime. Event dispatch takes under 1µs on the agent thread. Toggle <code className="text-zinc-200 font-mono">capture_thinking=True</code> to stream intermediate reasoning steps to trace dashboards, or keep it off to redact thoughts while preserving token counts.
              </p>

              {/* Span Tree Preview */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3.5 font-mono text-[11px] space-y-1.5 text-zinc-400 overflow-x-auto">
                <div className="flex items-center justify-between text-zinc-300 font-medium">
                  <span className="text-purple-300">agent.run</span>
                  <span className="text-zinc-500 text-[10px]">185ms • 412 tokens (128 reasoning)</span>
                </div>
                <div className="pl-4 border-l border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>├── llm.gpt-6-astra [gen_ai.reasoning.content: &quot;...&quot;]</span>
                    <span className="text-emerald-400 text-[10px]">120ms</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>└── tool.amazon.search_products</span>
                    <span className="text-emerald-400 text-[10px]">65ms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>pip install &quot;evidor[{telemetryTab}]&quot;</span>
              <Link href="/docs#telemetry-thinking" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Observability Guide</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 8: PRIVACY & PII REDACTION */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'telemetry') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-cyan-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                  <EyeOff className="w-4 h-4" />
                </div>
                <button
                  onClick={() => setPiiRedacted(!piiRedacted)}
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border transition-colors ${
                    piiRedacted
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                  }`}
                >
                  {piiRedacted ? 'Redacted Mode Active' : 'Click to Toggle PII'}
                </button>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Privacy &amp; PII Protection
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Setting <code className="text-zinc-200 font-mono">capture_content=False</code> enables metadata-only mode: keeps span trees, token metrics, and latency timings while completely redacting prompt text and tool arguments.
              </p>

              {/* Interactive Redaction Micro-view */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3 font-mono text-[11px] space-y-1.5">
                <div className="text-zinc-500 text-[10px]">PAYLOAD SENT TO TRACE SINK:</div>
                <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 truncate">
                  {piiRedacted ? (
                    <span className="text-cyan-400">[REDACTED_PII: 148 chars omitted]</span>
                  ) : (
                    <span>&quot;Patient John Doe: SSN 000-12-3456...&quot;</span>
                  )}
                </div>
                <div className="text-[10px] text-zinc-500 flex justify-between pt-1">
                  <span>Tokens: 42</span>
                  <span className="text-emerald-400">Span Hierarchy Intact</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>capture_content=False</span>
              <Link href="/docs#telemetry-privacy" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>HIPAA / SOC2 Guide</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
