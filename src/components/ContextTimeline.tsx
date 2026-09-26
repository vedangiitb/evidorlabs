import React from 'react';
import { ArrowDown, Cpu, Sparkles, Sliders } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';

export function ContextTimeline() {
  return (
    <div className="w-full space-y-8">
      {/* Visual Timeline Diagram */}
      <div className="rounded-2xl bg-[#090b12] border border-white/10 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Step 1: Older Messages */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                01
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Older Conversation History</div>
                <div className="text-xs text-slate-400">Multiple conversational turns accumulate in session state</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Approaching Limits (&gt; 50 msgs / 16k tokens)
              </span>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center -my-2">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-slate-500 to-sky-400" />
              <ArrowDown className="w-4 h-4 text-sky-400 -mt-1" />
            </div>
          </div>

          {/* Step 2: Compaction Trigger */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-sky-950/30 to-indigo-950/30 border border-sky-500/30 shadow-lg shadow-sky-500/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-sky-200 flex items-center gap-2">
                    <span>Automated Compaction Engine</span>
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-xs text-slate-300">
                    Older turns are extracted and summarized via the configured summarizer model
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono text-sky-300 bg-black/40 px-3 py-1.5 rounded-lg border border-sky-500/20">
                summarization_model
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center -my-2">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-sky-400 to-emerald-400" />
              <ArrowDown className="w-4 h-4 text-emerald-400 -mt-1" />
            </div>
          </div>

          {/* Step 3: Synthesis & Bound State */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/20 to-teal-950/20 border border-emerald-500/30">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 font-semibold flex items-center gap-2">
              <span>Synthesized Bounded Context</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Pillar 1 */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                <div className="text-xs font-semibold text-white">Permanent System Prompt</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Base persona & guidelines remain 100% intact and unsummarized.
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <div className="text-xs font-semibold text-emerald-300">Bounded Summary</div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Injected as <code className="text-emerald-400">is_summary=True</code> system message.
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                <div className="text-xs font-semibold text-white">Recent Conversational Turns</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Full fidelity dialogue preserved for immediate short-term coherence.
                </div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center -my-2">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-400 to-indigo-400" />
              <ArrowDown className="w-4 h-4 text-indigo-400 -mt-1" />
            </div>
          </div>

          {/* Step 4: Next Model Call */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center font-mono text-xs font-bold text-indigo-300">
                04
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Next Model Provider Call</div>
                <div className="text-xs text-slate-400">
                  Clean token footprint dispatched safely within provider limits
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Bounded Token Budget
            </span>
          </div>
        </div>
      </div>

      {/* Code configuration showcase for Context Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            <span>Configurable Limits</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Granular Token and Turn Budgets
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            By default, Evidor enforces a 16,000 token window (<code className="text-sky-300">context_window=16_000</code>) and a 50 message retention threshold (<code className="text-sky-300">max_messages=50</code>). You can customize both based on latency and cost tolerances.
          </p>
          <CodeBlock
            code={CODE_EXAMPLES.contextManagement}
            filename="context_config.py"
            language="python"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Dedicated Summarizer</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Decoupled Summarization Model
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Don&apos;t waste expensive flagship tokens on background summaries. Configure a lightweight model string on the same provider, or route summarization through an entirely different provider instance.
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

