import React from 'react';
import { ArrowDown, Layers, ArrowRight, Server, Activity, ShieldAlert, Cpu, Zap, Database, BrainCircuit, EyeOff } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <div className="w-full rounded-xl bg-[#09090b] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-black/80">
      {/* Blueprint grid subtle background */}
      <div className="absolute inset-0 bg-grid-sv opacity-25 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-2 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
            <span>SPECIFICATION // v1.8.0</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            System Topology &amp; Runtime Pipeline
          </h3>
        </div>
        <div className="text-xs font-mono text-zinc-400">
          Stateful &amp; Stateless • Native Compaction • Thinking Flags • Async Multi-Tool Engine
        </div>
      </div>

      {/* Grid: Execution Pipeline + Context Subsystem */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Primary Execution (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              1. Two Execution Paradigms
            </span>
            <span className="text-[11px] font-mono text-zinc-500">Stateful Agent &amp; Stateless Calls</span>
          </div>

          {/* Level 1: Application Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] flex flex-col justify-between">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-white">Stateful Agent (Recommended)</span>
              </div>
              <p className="text-[11px] text-zinc-400 mb-2">
                Automatic context memory across turns, server-side chaining &amp; autonomous tool loops.
              </p>
              <code className="text-[10px] font-mono text-emerald-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 self-start">
                agent.send() / send_async()
              </code>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] flex flex-col justify-between">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-semibold text-white">Stateless LLM Calls</span>
              </div>
              <p className="text-[11px] text-zinc-400 mb-2">
                Direct single-turn calls with user-managed message history and zero hidden state.
              </p>
              <code className="text-[10px] font-mono text-cyan-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 self-start">
                provider.generate(request)
              </code>
            </div>
          </div>

          {/* Down Connector */}
          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Level 2: Evidor Core Runtime Harness */}
          <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/[0.12] shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-mono font-bold text-xs">
                  E
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Evidor Runtime</span>
                    <span className="text-[10px] font-mono text-zinc-400 border border-zinc-700 bg-zinc-800 px-1 rounded">
                      Core Harness
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Native context continuation, concurrent multi-tool gather, MCP bridge &amp; telemetry
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] font-mono pt-2 border-t border-zinc-800 text-zinc-400">
              <div>
                <span className="text-zinc-500">Compaction:</span>{' '}
                <span className="text-zinc-200">compact_threshold</span>
              </div>
              <div>
                <span className="text-zinc-500">Thinking:</span>{' '}
                <span className="text-purple-400">Flags &amp; Scratchpad</span>
              </div>
              <div>
                <span className="text-zinc-500">Async:</span>{' '}
                <span className="text-emerald-400">asyncio.gather</span>
              </div>
              <div>
                <span className="text-zinc-500">Telemetry:</span>{' '}
                <span className="text-white">&lt;1µs Actor</span>
              </div>
            </div>
          </div>

          {/* Down Connector */}
          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Level 3: ModelProvider Protocol */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-mono text-xs">
                P
              </div>
              <div>
                <div className="text-xs font-semibold text-white">ModelProvider Protocol</div>
                <div className="text-[11px] text-zinc-500">Async-first interface: generate_async(request) &amp; generate(request)</div>
              </div>
            </div>
            <code className="text-[11px] font-mono text-zinc-400">
              GenerationRequest
            </code>
          </div>

          {/* Down Connector */}
          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Level 4: Adapters Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded bg-zinc-950 border border-white/[0.08] hover:border-zinc-700 transition-colors">
              <div className="text-white font-semibold">OpenAI</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">gpt-6-astra</div>
              <div className="text-[9px] text-emerald-400/80 mt-1">Responses API</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-950 border border-white/[0.08] hover:border-zinc-700 transition-colors">
              <div className="text-white font-semibold">Anthropic</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">claude-3-7-sonnet</div>
              <div className="text-[9px] text-purple-400/80 mt-1">Prompt Caching</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-950 border border-white/[0.08] hover:border-zinc-700 transition-colors">
              <div className="text-white font-semibold">Gemini</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">gemini-3.8-flash</div>
              <div className="text-[9px] text-blue-400/80 mt-1">Interactions API</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-950 border border-white/[0.08] hover:border-zinc-700 transition-colors">
              <div className="text-white font-semibold">Custom</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Any LLM</div>
              <div className="text-[9px] text-zinc-400 mt-1">Async Provider</div>
            </div>
          </div>
        </div>

        {/* Right Column: Subsystems & Bridges (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-white/[0.06] lg:pl-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              2. Subsystems &amp; Bridges
            </span>
            <span className="text-[11px] font-mono text-zinc-500">v1.8.0 Architecture</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Subsystem 1: Native Provider Compaction */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                <Database className="w-3 h-3 text-blue-400" />
              </span>
              <div>
                <div className="font-semibold text-white">Native Provider Compaction</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Offloaded directly to providers via <code className="text-zinc-300 font-mono">compact_threshold</code>, Responses API chaining, and Claude native compaction blocks.
                </div>
              </div>
            </div>

            {/* Subsystem 2: Thinking & Reasoning Flags */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                <BrainCircuit className="w-3 h-3 text-purple-400" />
              </span>
              <div>
                <div className="font-semibold text-white">Thinking &amp; Reasoning Mode</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Typed configs (<code className="text-zinc-300 font-mono">thinking_level</code>, <code className="text-zinc-300 font-mono">reasoning_effort</code>, <code className="text-zinc-300 font-mono">budget_tokens</code>) with cryptographic signature replaying.
                </div>
              </div>
            </div>

            {/* Subsystem 3: Async-First Multi-Tool Engine */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                <Zap className="w-3 h-3 text-emerald-400" />
              </span>
              <div>
                <div className="font-semibold text-white">Concurrent Async Execution</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Multiple tool calls in a turn execute concurrently via <code className="text-zinc-300 font-mono">asyncio.gather()</code> with event loop guards.
                </div>
              </div>
            </div>

            {/* Subsystem 4: MCP Bridge */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                <Server className="w-3 h-3" />
              </span>
              <div>
                <div className="font-semibold text-white">Model Context Protocol (MCP)</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Connect over stdio, Streamable HTTP, or SSE with shared <code className="text-zinc-300 font-mono">MCPClient</code> for FastAPI.
                </div>
              </div>
            </div>

            {/* Subsystem 5: Telemetry Actor & PII */}
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.12] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-white text-black flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                <Activity className="w-3 h-3" />
              </span>
              <div>
                <div className="font-semibold text-white">Decoupled Telemetry Actor</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  &lt;1µs emission queue with <code className="text-zinc-200 font-mono">capture_thinking</code> and <code className="text-zinc-200 font-mono">capture_content=False</code> metadata-only auditing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
