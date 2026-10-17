import React from 'react';
import { ArrowDown, Check, Zap, Server, Database, Sparkles } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';

export function ContextTimeline() {
  return (
    <div className="w-full space-y-8">
      {/* Visual Timeline Card */}
      <div className="rounded-xl bg-[#09090b] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Step 1 */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-400 font-medium">
                01
              </span>
              <div>
                <div className="text-xs font-semibold text-white">Turn Execution (Delta Only)</div>
                <div className="text-[11px] text-zinc-500">Only newest turn messages sent — no re-passing entire conversation histories</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded">
              Zero Redundant Tokens
            </span>
          </div>

          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/[0.12] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-mono text-xs font-bold">
                02
              </span>
              <div>
                <div className="text-xs font-semibold text-white">Provider Native Context Strategy</div>
                <div className="text-[11px] text-zinc-400">Transparently mapped to each provider&apos;s optimal context infrastructure</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-white bg-zinc-800 px-2 py-0.5 rounded">
              agent.strategy
            </span>
          </div>

          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Step 3: Provider Architecture Matrix */}
          <div className="p-4 rounded-lg bg-zinc-950 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                Provider-Native Context &amp; Compaction Engine
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">3 Strategies</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {/* OpenAI */}
              <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-[11px]">OpenAI</span>
                  <span className="text-[10px] font-mono text-emerald-400">response_chain</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Server-side chaining via Responses API <code className="text-zinc-200 font-mono">previous_response_id</code>. Automatic server-side compaction at <code className="text-zinc-200 font-mono">compact_threshold</code>.
                </p>
              </div>

              {/* Gemini */}
              <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-[11px]">Google Gemini</span>
                  <span className="text-[10px] font-mono text-blue-400">interaction_chain</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Server-side state chaining via Interactions API <code className="text-zinc-200 font-mono">previous_interaction_id</code>. Google manages state persistence across turns.
                </p>
              </div>

              {/* Anthropic */}
              <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-[11px]">Anthropic Claude</span>
                  <span className="text-[10px] font-mono text-purple-400">stateless_replay</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Ephemeral Prompt Caching (<code className="text-zinc-200 font-mono">cache_control</code>) cuts cost by 90%. Emits native <code className="text-zinc-200 font-mono">compaction</code> blocks to prune older turns.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Step 4 */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-400 font-medium">
                04
              </span>
              <div>
                <div className="text-xs font-semibold text-white">Automated Compaction Triggered</div>
                <div className="text-[11px] text-zinc-500">Cross-turn tokens evaluated against native <code className="text-zinc-300 font-mono">compact_threshold</code> without hitting limits</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded">
              Native Compaction
            </span>
          </div>
        </div>
      </div>

      {/* Code configuration split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Native Compaction
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Configurable Token Thresholds
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Configure native compaction on <code className="text-zinc-200 font-mono">OpenAIProvider</code> or <code className="text-zinc-200 font-mono">AnthropicProvider</code> via <code className="text-zinc-200 font-mono">compact_threshold</code>, or pass it directly to the <code className="text-zinc-200 font-mono">Agent</code> facade.
          </p>
          <CodeBlock
            code={CODE_EXAMPLES.nativeCompaction}
            filename="compaction_setup.py"
            language="python"
          />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            State Inspection
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Inspecting Strategy &amp; Response IDs
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Inspect the underlying provider context strategy (<code className="text-zinc-200 font-mono">agent.strategy</code>), current interaction/response ID (<code className="text-zinc-200 font-mono">agent.last_response_id</code>), or reset state with <code className="text-zinc-200 font-mono">agent.reset()</code>.
          </p>
          <CodeBlock
            code={CODE_EXAMPLES.inspectingState}
            filename="inspect_state.py"
            language="python"
          />
        </div>
      </div>
    </div>
  );
}
