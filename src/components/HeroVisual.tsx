'use client';

import React, { useState } from 'react';
import { Check, Copy, Play, ArrowRight } from 'lucide-react';

export function HeroVisual() {
  const [activeProvider, setActiveProvider] = useState<'openai' | 'anthropic' | 'gemini'>('openai');
  const [copied, setCopied] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const providerCodes = {
    openai: `from evidor import Agent, OpenAIProvider

agent = Agent(
    OpenAIProvider(model="gpt-4.1-mini"),
)

response = agent.send(
    "Explain dependency inversion."
)

print(response.text)`,

    anthropic: `from evidor import Agent, AnthropicProvider

agent = Agent(
    AnthropicProvider(model="claude-3-5-sonnet-20241022"),
)

response = agent.send(
    "Explain dependency inversion."
)

print(response.text)`,

    gemini: `from evidor import Agent, GeminiProvider

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

  return (
    <div className="w-full max-w-4xl mx-auto text-left">
      {/* Matte SV Workstation Panel */}
      <div className="rounded-xl border border-white/[0.08] bg-[#09090b] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.06)] overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#050507] border-b border-white/[0.06] gap-3 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 opacity-60">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
            </div>
            <div className="flex items-center gap-1 text-[12px] font-mono text-zinc-400">
              <span className="text-zinc-600">app /</span>
              <span className="text-zinc-300">agent.py</span>
            </div>
          </div>

          {/* Segmented Provider Switcher */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5 text-xs font-mono">
            <button
              onClick={() => { setActiveProvider('openai'); setHasExecuted(false); }}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeProvider === 'openai'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              OpenAI
            </button>
            <button
              onClick={() => { setActiveProvider('anthropic'); setHasExecuted(false); }}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeProvider === 'anthropic'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Anthropic
            </button>
            <button
              onClick={() => { setActiveProvider('gemini'); setHasExecuted(false); }}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeProvider === 'gemini'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Gemini
            </button>
          </div>

          {/* Action cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHasExecuted(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-white text-black hover:bg-zinc-200 font-medium transition-colors"
            >
              <Play className="w-3 h-3 fill-black text-black" />
              <span>Run</span>
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 font-mono text-[13px] leading-relaxed bg-[#09090b] text-zinc-300 overflow-x-auto">
          <div className="space-y-1">
            <div>
              <span className="text-zinc-500">from</span>{' '}
              <span className="text-white font-medium">evidor</span>{' '}
              <span className="text-zinc-500">import</span>{' '}
              <span className="text-zinc-200">Agent</span>,{' '}
              <span className="text-zinc-200">
                {activeProvider === 'openai'
                  ? 'OpenAIProvider'
                  : activeProvider === 'anthropic'
                  ? 'AnthropicProvider'
                  : 'GeminiProvider'}
              </span>
            </div>
            <div className="h-3" />
            <div>
              <span className="text-zinc-400">agent</span> ={' '}
              <span className="text-zinc-200">Agent</span>(
            </div>
            <div className="pl-6">
              <span className="text-zinc-200">
                {activeProvider === 'openai'
                  ? 'OpenAIProvider'
                  : activeProvider === 'anthropic'
                  ? 'AnthropicProvider'
                  : 'GeminiProvider'}
              </span>
              (model=
              <span className="text-emerald-400/90">
                {activeProvider === 'openai'
                  ? '"gpt-4.1-mini"'
                  : activeProvider === 'anthropic'
                  ? '"claude-3-5-sonnet-20241022"'
                  : '"gemini-2.5-flash"'}
              </span>
              ),
            </div>
            <div>)</div>
            <div className="h-3" />
            <div>
              <span className="text-zinc-400">response</span> ={' '}
              <span className="text-zinc-400">agent</span>.
              <span className="text-zinc-200">send</span>(
            </div>
            <div className="pl-6 text-emerald-400/90">
              &quot;Explain dependency inversion.&quot;
            </div>
            <div>)</div>
            <div className="h-3" />
            <div>
              <span className="text-zinc-200">print</span>(response.
              <span className="text-zinc-400">text</span>)
            </div>
          </div>

          {/* Execution Output drawer */}
          {hasExecuted && (
            <div className="mt-5 pt-4 border-t border-zinc-800 text-xs font-mono animate-fade-in">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>TERMINAL — 200 OK via {activeProvider} (128ms)</span>
              </div>
              <div className="p-3 rounded-md bg-[#050507] border border-zinc-800/80 text-zinc-300 text-xs leading-relaxed font-sans">
                High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.
              </div>
            </div>
          )}
        </div>

        {/* Minimal Pipeline Footer (Application -> Evidor -> Provider) */}
        <div className="border-t border-white/[0.06] bg-[#050507] px-4 py-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
              DATA FLOW
            </span>

            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 overflow-x-auto py-1">
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200 whitespace-nowrap">
                Application
              </span>
              <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
              <span className="px-2 py-1 rounded bg-white text-black font-medium whitespace-nowrap">
                Evidor Harness
              </span>
              <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200 whitespace-nowrap">
                {activeProvider === 'openai' ? 'OpenAI' : activeProvider === 'anthropic' ? 'Anthropic' : 'Gemini'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
