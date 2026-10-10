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
} from 'lucide-react';

type FilterCategory = 'all' | 'mcp_tools' | 'resilience' | 'telemetry' | 'runtime';

export function CapabilitiesSection({ version }: { version: string }) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mcpTransport, setMcpTransport] = useState<'stdio' | 'http' | 'sse'>('stdio');
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
            { id: 'mcp_tools', label: 'MCP & Toolkits' },
            { id: 'resilience', label: 'Retries & Resilience' },
            { id: 'telemetry', label: 'Telemetry & PII' },
            { id: 'runtime', label: 'Runtime & Compaction' },
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
        {/* BENTO CARD 1: MODEL CONTEXT PROTOCOL (MCP) - Span 2 */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'mcp_tools') && (
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
                        v1.3+
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
                Connect agents seamlessly to external MCP servers. Evidor automatically discovers tools, maps parameters, isolates namespaces to prevent name collisions, and cleanly terminates subprocesses when finished.
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
        {/* BENTO CARD 2: AUTOMATIC RETRIES & JITTER */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'resilience') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-amber-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
                  <RotateCw className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  v1.4+
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Coordinated LLM Retries
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Auto-retries on transient 429 rate limits, 5xx server drops, and network timeouts. Respects provider <code className="text-zinc-200 font-mono">Retry-After</code> headers with exponential backoff and full jitter.
              </p>

              {/* Visual Retry Waterfall Timeline */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-zinc-400">Attempt 1</span>
                  <span className="text-rose-400 font-medium">HTTP 429 Rate Limit</span>
                </div>
                <div className="flex items-center gap-2 pl-3 text-[10px] text-zinc-500 border-l border-zinc-800">
                  <RotateCw className="w-2.5 h-2.5 text-amber-400 animate-spin" />
                  <span>Backoff: 0.5s + jitter ~0.72s</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 pt-1 border-t border-zinc-900">
                  <span className="text-white font-medium">Attempt 2</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>200 OK via OpenAI</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>RetryConfig(max_retries=3)</span>
              <Link href="/docs#retries" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 3: ACTOR TELEMETRY & OBSERVABILITY - Span 2 */}
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
                      <span>Telemetry Actor Runtime</span>
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
                Asynchronous producer-consumer actor architecture. Event emission on the agent thread takes under 1 microsecond. Formatting, batching, and network transport happen on a dedicated background worker thread (<code className="text-zinc-200 font-mono">Evidor-Telemetry-Worker</code>).
              </p>

              {/* Span Tree Preview */}
              <div className="rounded-xl bg-black border border-white/[0.06] p-3.5 font-mono text-[11px] space-y-1.5 text-zinc-400 overflow-x-auto">
                <div className="flex items-center justify-between text-zinc-300 font-medium">
                  <span className="text-purple-300">agent.run</span>
                  <span className="text-zinc-500 text-[10px]">185ms • 412 tokens</span>
                </div>
                <div className="pl-4 border-l border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>├── llm.gpt-4.1-mini</span>
                    <span className="text-emerald-400 text-[10px]">120ms</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>└── tool.mcp.search_products</span>
                    <span className="text-emerald-400 text-[10px]">65ms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>pip install &quot;evidor[{telemetryTab}]&quot;</span>
              <Link href="/docs#telemetry-overview" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Observability Guide</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 4: PII PROTECTION & PRIVACY */}
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

        {/* ========================================================================= */}
        {/* BENTO CARD 5: BOUNDED CONTEXT COMPACTION */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'runtime') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-blue-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
                  16k tokens • 50 turns
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Bounded Context Compaction
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Automatically prevents context overflow by compacting older conversation turns using background LLM summarization.
              </p>

              {/* 3-Layer Compaction Stack */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>System Prompt</span>
                  </span>
                  <span className="text-zinc-500 text-[10px]">Immutable Anchor</span>
                </div>
                <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                  <span className="text-blue-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Compacted Summary</span>
                  </span>
                  <span className="text-zinc-500 text-[10px]">is_summary=True</span>
                </div>
                <div className="p-2 rounded bg-zinc-900/40 border border-zinc-800/60 flex items-center justify-between">
                  <span className="text-zinc-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    <span>Recent Turns</span>
                  </span>
                  <span className="text-zinc-500 text-[10px]">Full Fidelity</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>summarization_model=&quot;gpt-4.1-mini&quot;</span>
              <Link href="/docs#context-management" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 6: NATIVE ASYNC CONVERSATIONS */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'runtime') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  send_async
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Native Async Execution Loop
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Runs directly on caller event loops (FastAPI, Tornado) without thread pool hops. Preserves shared connection pools, locks, and <code className="text-zinc-200 font-mono">contextvars</code>.
              </p>

              <div className="rounded-xl bg-black border border-white/[0.06] p-3 font-mono text-[11px] space-y-1.5 text-zinc-300">
                <div className="text-zinc-500 text-[10px]">COROUTINE DISPATCH:</div>
                <div className="text-emerald-400">response = await agent.send_async(msg)</div>
                <div className="text-zinc-500 text-[10px] pt-1">
                  Async tools execute concurrently via asyncio without blocking the event loop.
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>FastAPI / Tornado Native</span>
              <Link href="/docs#async-conversations" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 7: SCOPED FILESYSTEM SANDBOX */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'mcp_tools') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-amber-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                  <FolderTree className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                  6 Scoped Tools
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Scoped Filesystem Tools
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Zero-dependency sandbox suite for listing, reading, searching, creating, and modifying files bounded strictly under a target directory root.
              </p>

              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] text-center">
                <div className="p-1.5 rounded bg-black/60 border border-zinc-800 text-zinc-300">list_files</div>
                <div className="p-1.5 rounded bg-black/60 border border-zinc-800 text-zinc-300">read_file</div>
                <div className="p-1.5 rounded bg-black/60 border border-zinc-800 text-zinc-300">search_files</div>
                <div className="p-1.5 rounded bg-black/60 border border-zinc-800 text-zinc-300">create_file</div>
                <div className="p-1.5 rounded bg-black/60 border border-zinc-800 text-zinc-300">write_file</div>
                <div className="p-1.5 rounded bg-black/60 border border-zinc-800 text-zinc-300">delete_file</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>filesystem_tools(&quot;./project&quot;)</span>
              <Link href="/docs#filesystem-tools" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 8: PROVIDER-NEUTRAL WEB SEARCH */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'mcp_tools') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                  Stdlib Only
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Standard-Library Web Search
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Pluggable search using only Python standard library. Bundles adapters for Tavily, Exa, and Brave Search with zero extra pip packages.
              </p>

              <div className="rounded-xl bg-black border border-white/[0.06] p-3 font-mono text-[11px] text-zinc-400 space-y-1">
                <div className="text-zinc-500 text-[10px]">PLUGGABLE PROVIDERS:</div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>TavilySearchProvider()</span>
                  <span className="text-zinc-600">std lib</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>ExaSearchProvider()</span>
                  <span className="text-zinc-600">std lib</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>BraveSearchProvider()</span>
                  <span className="text-zinc-600">std lib</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>web_search(provider)</span>
              <Link href="/docs#web-search" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BENTO CARD 9: MULTI-PROVIDER & PYTHON 3.14 */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'runtime') && (
          <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-zinc-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  Python 3.10 - 3.14
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                Universal Model Protocol
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Swap seamlessly between OpenAI, Anthropic Claude, Google Gemini, and custom backends. Tested across all modern Python runtimes up to Python 3.14.
              </p>

              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <div className="p-2 rounded bg-black border border-zinc-800/80 text-zinc-300">
                  <div className="font-semibold text-white">OpenAI</div>
                  <div className="text-[10px] text-zinc-500">gpt-4.1-mini</div>
                </div>
                <div className="p-2 rounded bg-black border border-zinc-800/80 text-zinc-300">
                  <div className="font-semibold text-white">Anthropic</div>
                  <div className="text-[10px] text-zinc-500">claude-3-5</div>
                </div>
                <div className="p-2 rounded bg-black border border-zinc-800/80 text-zinc-300">
                  <div className="font-semibold text-white">Gemini</div>
                  <div className="text-[10px] text-zinc-500">gemini-2.5</div>
                </div>
                <div className="p-2 rounded bg-black border border-zinc-800/80 text-zinc-300">
                  <div className="font-semibold text-white">Custom</div>
                  <div className="text-[10px] text-zinc-500">ModelProvider</div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>ModelProvider Protocol</span>
              <Link href="/docs#supported-providers" className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <span>Docs</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

