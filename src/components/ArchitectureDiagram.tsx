import React from 'react';
import { Cpu, Database, ArrowDown, Shuffle, Layers, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <div className="w-full rounded-2xl bg-[#090b12] border border-white/10 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      {/* Background grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-3 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>SYSTEM_TOPOLOGY_SPEC // v1.0.0-dev.2</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-2">
            Evidor Architecture & Context Subsystem
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Stateful Harness • Provider Protocol • Bounded Context
        </div>
      </div>

      {/* Main Grid: Application Flow & Context Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Primary Execution Flow (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              1. Execution Pipeline
            </span>
            <span className="text-[11px] font-mono text-slate-400">Synchronous API</span>
          </div>

          {/* Layer 1: Application */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-white">APP</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Client Application</div>
                  <div className="text-xs text-slate-400">Your AI agent, service, or CLI tool</div>
                </div>
              </div>
              <code className="text-xs font-mono text-sky-400 bg-sky-950/40 px-2 py-1 rounded border border-sky-500/20">
                agent.send(prompt)
              </code>
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-1">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-gradient-to-b from-sky-400 to-indigo-500" />
              <ArrowDown className="w-3.5 h-3.5 text-indigo-400 -mt-1" />
            </div>
          </div>

          {/* Layer 2: Evidor Agent Harness */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-sky-950/30 to-indigo-950/20 border border-sky-500/30 shadow-lg shadow-sky-500/5 relative">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Evidor Agent</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-sky-400/10 text-sky-300 rounded border border-sky-400/20">
                      Core Harness
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Stateful session coordinator, message history buffer & compaction controller
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-3 border-t border-white/10">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-400">System Prompt:</span>
                <span className="text-emerald-400 ml-1">Immutable</span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-400">Context Window:</span>
                <span className="text-sky-300 ml-1">16,000 tokens</span>
              </div>
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-1">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-gradient-to-b from-indigo-500 to-sky-400" />
              <ArrowDown className="w-3.5 h-3.5 text-sky-400 -mt-1" />
            </div>
          </div>

          {/* Layer 3: ModelProvider Protocol */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center">
                  <Shuffle className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">ModelProvider Protocol</div>
                  <div className="text-xs text-slate-400">Unified interface: generate(request) & with_model(model)</div>
                </div>
              </div>
              <code className="text-xs font-mono text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded border border-indigo-500/20 hidden sm:inline-block">
                GenerationRequest
              </code>
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-1">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-white/20" />
              <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
            </div>
          </div>

          {/* Layer 4: Provider Adapters (OpenAI, Anthropic, Gemini, Custom) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-3 rounded-lg bg-black/40 border border-sky-500/20 text-center hover:border-sky-500/40 transition-colors">
              <div className="text-xs font-bold text-white font-mono">OpenAI</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">OpenAIProvider</div>
              <div className="text-[9px] text-sky-400/80 font-mono mt-1">gpt-4.1-mini</div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-indigo-500/20 text-center hover:border-indigo-500/40 transition-colors">
              <div className="text-xs font-bold text-white font-mono">Anthropic</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">AnthropicProvider</div>
              <div className="text-[9px] text-indigo-400/80 font-mono mt-1">claude-3-5-sonnet</div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20 text-center hover:border-emerald-500/40 transition-colors">
              <div className="text-xs font-bold text-white font-mono">Gemini</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">GeminiProvider</div>
              <div className="text-[9px] text-emerald-400/80 font-mono mt-1">gemini-2.5-flash</div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20 text-center hover:border-amber-500/40 transition-colors">
              <div className="text-xs font-bold text-white font-mono">Custom</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">CustomProvider</div>
              <div className="text-[9px] text-amber-400/80 font-mono mt-1">Protocol impl</div>
            </div>
          </div>
        </div>

        {/* Right Column: Context Management Subsystem (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              2. Context Lifecycle
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Auto Compaction</span>
          </div>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 relative">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-mono text-slate-300 shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Conversation History</span>
                    <Database className="w-3 h-3 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Maintains ordered turns across user prompts and assistant replies.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 relative">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-mono text-slate-300 shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Token & Message Limits</span>
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Evaluates token budget against <code className="text-amber-300">context_window</code> (16k) and message count against <code className="text-amber-300">max_messages</code> (50).
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-500/20 relative">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-xs font-mono text-sky-300 shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="text-xs font-semibold text-sky-200">
                    Compaction Pipeline
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Older turns are summarized via the primary model or a configured lightweight summarizer.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 relative">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xs font-mono text-emerald-300 shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-200">
                    Bounded Summary Injection
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Compacted history is injected as <code className="text-emerald-300 font-mono">is_summary=True</code> system message.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 relative">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-mono text-slate-300 shrink-0 mt-0.5">
                  5
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    Next Turn Execution
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    System Prompt + Summary + Recent Turns fed cleanly to the model provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

