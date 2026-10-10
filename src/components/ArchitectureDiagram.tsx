import React from 'react';
import { ArrowDown, Layers, ArrowRight, Server, Activity, ShieldAlert, Cpu } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <div className="w-full rounded-xl bg-[#09090b] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-black/80">
      {/* Blueprint grid subtle background */}
      <div className="absolute inset-0 bg-grid-sv opacity-25 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-2 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
            <span>SPECIFICATION // v1.4.0</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            System Topology &amp; Runtime Pipeline
          </h3>
        </div>
        <div className="text-xs font-mono text-zinc-400">
          Stateful Orchestration • MCP Bridge • Telemetry Actor • Unified Retries
        </div>
      </div>

      {/* Grid: Execution Pipeline + Context Subsystem */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Primary Execution (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              1. Execution &amp; Tool Pipeline
            </span>
            <span className="text-[11px] font-mono text-zinc-500">Sync (send) &amp; Native Async (send_async)</span>
          </div>

          {/* Level 1: Application */}
          <div className="p-4 rounded-lg bg-zinc-950 border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-semibold text-white">
                APP
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Client Application</div>
                <div className="text-[11px] text-zinc-500">FastAPI, worker, pipeline, or CLI</div>
              </div>
            </div>
            <code className="text-[11px] font-mono text-zinc-300 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
              send() / send_async()
            </code>
          </div>

          {/* Down Connector */}
          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Level 2: Evidor Agent Harness */}
          <div className="p-4 rounded-lg bg-zinc-900/60 border border-white/[0.12] shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-mono font-bold text-xs">
                  E
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Evidor Agent</span>
                    <span className="text-[10px] font-mono text-zinc-400 border border-zinc-700 bg-zinc-800 px-1 rounded">
                      Core Runtime
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Session coordinator, MCP bridge, retry engine &amp; turn compaction
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] font-mono pt-2 border-t border-zinc-800 text-zinc-400">
              <div>
                <span className="text-zinc-500">Context:</span>{' '}
                <span className="text-zinc-200">16k tokens</span>
              </div>
              <div>
                <span className="text-zinc-500">MCP:</span>{' '}
                <span className="text-zinc-200">stdio/HTTP</span>
              </div>
              <div>
                <span className="text-zinc-500">Retries:</span>{' '}
                <span className="text-emerald-400">Exp Backoff</span>
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
                <div className="text-[11px] text-zinc-500">Unified interface: generate(request) &amp; with_model(model)</div>
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
              <div className="text-[10px] text-zinc-500 mt-0.5">gpt-4.1-mini</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-950 border border-white/[0.08] hover:border-zinc-700 transition-colors">
              <div className="text-white font-semibold">Anthropic</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">claude-3-5</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-950 border border-white/[0.08] hover:border-zinc-700 transition-colors">
              <div className="text-white font-semibold">Gemini</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">gemini-2.5</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-950 border border-white/[0.08] hover:border-zinc-700 transition-colors">
              <div className="text-white font-semibold">Custom</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Any LLM</div>
            </div>
          </div>
        </div>

        {/* Right Column: Resilience & Observability Subsystem (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-white/[0.06] lg:pl-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              2. Subsystems &amp; Bridges
            </span>
            <span className="text-[11px] font-mono text-zinc-500">Resilience</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Subsystem 1: MCP Bridge */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                <Server className="w-3 h-3" />
              </span>
              <div>
                <div className="font-semibold text-white">Model Context Protocol (MCP)</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Subprocess &amp; HTTP bridges discover tools, execute calls, and avoid naming collisions.
                </div>
              </div>
            </div>

            {/* Subsystem 2: Retry Engine */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-3 h-3 text-emerald-400" />
              </span>
              <div>
                <div className="font-semibold text-white">Coordinated Retry Engine</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Transient 429/5xx detection, exponential backoff, jitter, and Retry-After header parsing.
                </div>
              </div>
            </div>

            {/* Subsystem 3: Telemetry Actor */}
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.12] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-white text-black flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                <Activity className="w-3 h-3" />
              </span>
              <div>
                <div className="font-semibold text-white">Telemetry Actor Runtime</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Non-blocking bounded queue emits trace trees to OpenTelemetry, Langfuse, Phoenix, or Prometheus.
                </div>
              </div>
            </div>

            {/* Subsystem 4: Context Compactor */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                04
              </span>
              <div>
                <div className="font-semibold text-white">Context Compaction Engine</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Token budget evaluation automatically synthesizes older turns into bounded summaries.
                </div>
              </div>
            </div>

            {/* Subsystem 5: PII Protection */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 mt-0.5">
                05
              </span>
              <div>
                <div className="font-semibold text-white">Privacy &amp; PII Protection</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Sink-level <code className="text-zinc-300 font-mono">capture_content=False</code> redacts raw prompts and outputs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
