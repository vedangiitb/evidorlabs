'use client';

import React, { useState } from 'react';
import { Check, Copy, Play, Cpu, Layers, Sparkles, ArrowRight } from 'lucide-react';

export function HeroVisual() {
  const [activeProvider, setActiveProvider] = useState<'openai' | 'anthropic' | 'gemini'>('openai');
  const [copied, setCopied] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const providerCodes = {
    openai: `from evidor import Agent, OpenAIProvider

# Initialize agent with OpenAI adapter
agent = Agent(
    OpenAIProvider(model="gpt-4.1-mini"),
)

response = agent.send(
    "Explain dependency inversion."
)

print(response.text)`,

    anthropic: `from evidor import Agent, AnthropicProvider

# Initialize agent with Anthropic adapter
agent = Agent(
    AnthropicProvider(model="claude-3-5-sonnet-20241022"),
)

response = agent.send(
    "Explain dependency inversion."
)

print(response.text)`,

    gemini: `from evidor import Agent, GeminiProvider

# Initialize agent with Gemini adapter
agent = Agent(
    GeminiProvider(model="gemini-2.5-flash"),
)

response = agent.send(
    "Explain dependency inversion."
)

print(response.text)`,
  };

  const currentCode = providerCodes[activeProvider];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setHasExecuted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Outer container with glowing ambient border */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-sky-500/30 via-indigo-500/10 to-transparent shadow-2xl shadow-sky-500/10">
        <div className="rounded-2xl bg-[#0a0c13] overflow-hidden border border-white/10">
          {/* Editor Header Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#07090e] border-b border-white/10 gap-3 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-300">
                <span className="text-sky-400">py</span>
                <span>agent_quickstart.py</span>
              </div>
            </div>

            {/* Provider Switcher Tabs */}
            <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/5 text-xs font-mono">
              <button
                onClick={() => { setActiveProvider('openai'); setHasExecuted(false); }}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeProvider === 'openai'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                OpenAI
              </button>
              <button
                onClick={() => { setActiveProvider('anthropic'); setHasExecuted(false); }}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeProvider === 'anthropic'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Anthropic
              </button>
              <button
                onClick={() => { setActiveProvider('gemini'); setHasExecuted(false); }}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeProvider === 'gemini'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Gemini
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 transition-all active:scale-95"
              >
                <Play className="w-3 h-3 fill-sky-300" />
                <span>Run</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 transition-all"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="p-5 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-[#0a0c13]">
            <div className="space-y-1">
              <div className="text-slate-500 italic"># Provider-agnostic harness abstraction</div>
              <div>
                <span className="text-indigo-400 font-semibold">from</span>{' '}
                <span className="text-sky-300">evidor</span>{' '}
                <span className="text-indigo-400 font-semibold">import</span>{' '}
                <span className="text-sky-200 font-medium">Agent</span>,{' '}
                <span className="text-sky-200 font-medium">
                  {activeProvider === 'openai'
                    ? 'OpenAIProvider'
                    : activeProvider === 'anthropic'
                    ? 'AnthropicProvider'
                    : 'GeminiProvider'}
                </span>
              </div>
              <div className="h-2" />
              <div>
                <span className="text-slate-200 font-semibold">agent</span> ={' '}
                <span className="text-sky-300 font-semibold">Agent</span>(
              </div>
              <div className="pl-6">
                <span className="text-sky-200">
                  {activeProvider === 'openai'
                    ? 'OpenAIProvider'
                    : activeProvider === 'anthropic'
                    ? 'AnthropicProvider'
                    : 'GeminiProvider'}
                </span>
                (model=
                <span className="text-emerald-400">
                  {activeProvider === 'openai'
                    ? '"gpt-4.1-mini"'
                    : activeProvider === 'anthropic'
                    ? '"claude-3-5-sonnet-20241022"'
                    : '"gemini-2.5-flash"'}
                </span>
                ),
              </div>
              <div>)</div>
              <div className="h-2" />
              <div>
                <span className="text-slate-200 font-semibold">response</span> ={' '}
                <span className="text-slate-200 font-semibold">agent</span>.
                <span className="text-cyan-300">send</span>(
              </div>
              <div className="pl-6 text-emerald-400">
                &quot;Explain dependency inversion.&quot;
              </div>
              <div>)</div>
              <div className="h-2" />
              <div>
                <span className="text-cyan-300">print</span>(response.
                <span className="text-sky-200">text</span>)
              </div>
            </div>

            {/* Simulated Output Console (if Run is pressed) */}
            {hasExecuted && (
              <div className="mt-4 pt-3 border-t border-white/10 animate-fade-in text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>OUTPUT (HTTP 200 OK via {activeProvider})</span>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-white/5 text-slate-300 text-xs leading-relaxed">
                  High-level modules should not depend on low-level modules; both should depend on abstractions, decoupling business policies from implementation details.
                </div>
              </div>
            )}
          </div>

          {/* Architecture Flow Banner */}
          <div className="border-t border-white/10 bg-[#07080d] px-4 py-4 sm:px-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Harness Execution Pipeline</span>
              <span className="text-sky-400 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Zero provider lock-in
              </span>
            </div>

            {/* Interactive Flow Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              {/* Node 1: Application */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 text-slate-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white">Your Application</div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">Agent.send(&quot;...&quot;)</div>
                </div>
              </div>

              {/* Node 2: Evidor Harness */}
              <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/30 flex items-center gap-3 relative shadow-lg shadow-sky-500/5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4 text-sky-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-sky-200 flex items-center gap-1.5">
                    <span>Evidor Harness</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-sky-300/70 font-mono truncate">Context & Limits (16k / 50)</div>
                </div>
              </div>

              {/* Node 3: Model Provider */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-indigo-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white capitalize">{activeProvider} Provider</div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {activeProvider === 'openai'
                      ? 'gpt-4.1-mini'
                      : activeProvider === 'anthropic'
                      ? 'claude-3-5-sonnet'
                      : 'gemini-2.5-flash'}
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Badges Underneath */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
              <span className="font-mono text-[11px] text-slate-400">Supported Providers:</span>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className={`px-2 py-0.5 rounded ${activeProvider === 'openai' ? 'text-sky-300 bg-sky-500/10 border border-sky-500/20' : 'text-slate-400'}`}>
                  OpenAI
                </span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded ${activeProvider === 'anthropic' ? 'text-indigo-300 bg-indigo-500/10 border border-indigo-500/20' : 'text-slate-400'}`}>
                  Anthropic
                </span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded ${activeProvider === 'gemini' ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-400'}`}>
                  Gemini
                </span>
                <span>•</span>
                <span className="text-slate-400">Custom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

