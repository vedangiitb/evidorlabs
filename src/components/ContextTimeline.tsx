import React from 'react';
import { ArrowDown } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';

export function ContextTimeline() {
  return (
    <div className="w-full space-y-8">
      {/* Visual Timeline Card */}
      <div className="rounded-xl bg-[#09090b] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Step 1 */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-400 font-medium">
                01
              </span>
              <div>
                <div className="text-xs font-semibold text-white">Turn Accumulation</div>
                <div className="text-[11px] text-zinc-500">History grows across consecutive user prompts</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              Approaching limits
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
                <div className="text-xs font-semibold text-white">Compaction Engine Fired</div>
                <div className="text-[11px] text-zinc-400">Older messages synthesized via model summarizer</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-white bg-zinc-800 px-2 py-0.5 rounded">
              summarization_model
            </span>
          </div>

          <div className="flex justify-center -my-1">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-lg bg-zinc-950 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                Synthesized Bounded State
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">3 Layers</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800">
                <div className="font-semibold text-white text-[11px]">System Prompt</div>
                <div className="text-[10px] text-zinc-500 mt-1">100% intact, immutable anchor</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800">
                <div className="font-semibold text-zinc-200 text-[11px]">Bounded Summary</div>
                <div className="text-[10px] text-zinc-500 mt-1">is_summary=True payload</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800">
                <div className="font-semibold text-white text-[11px]">Recent Turns</div>
                <div className="text-[10px] text-zinc-500 mt-1">Full fidelity dialogue</div>
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
                <div className="text-xs font-semibold text-white">Next Model Call Dispatched</div>
                <div className="text-[11px] text-zinc-500">Safely bounded within context token budget</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded">
              Tokens Bounded
            </span>
          </div>
        </div>
      </div>

      {/* Code configuration split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Tuning Limits
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Granular Budget Controls
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            By default, Evidor enforces a 16,000 token window (<code className="text-zinc-200 font-mono">context_window=16_000</code>) and a 50 message retention threshold (<code className="text-zinc-200 font-mono">max_messages=50</code>).
          </p>
          <CodeBlock
            code={CODE_EXAMPLES.contextManagement}
            filename="limits_config.py"
            language="python"
          />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Cost Optimization
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Decoupled Summarization Model
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Configure a fast, inexpensive model for compaction summaries while reserving your flagship model for primary generation.
          </p>
          <CodeBlock
            code={CODE_EXAMPLES.summarizationModel}
            filename="summarizer_setup.py"
            language="python"
          />
        </div>
      </div>
    </div>
  );
}
