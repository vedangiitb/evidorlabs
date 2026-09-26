'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';

interface ProviderCardProps {
  name: string;
  classNameTitle: string;
  badge: string;
  installExtra: string;
  exampleModel: string;
  envVar: string;
  description: string;
}

const PROVIDERS: ProviderCardProps[] = [
  {
    name: 'OpenAI',
    classNameTitle: 'OpenAIProvider',
    badge: 'openai>=1.0.0',
    installExtra: 'evidor[openai]',
    exampleModel: 'gpt-4.1-mini',
    envVar: 'OPENAI_API_KEY',
    description: 'First-class adapter for OpenAI models with streaming and conversational compaction.',
  },
  {
    name: 'Anthropic',
    classNameTitle: 'AnthropicProvider',
    badge: 'anthropic>=0.25.0',
    installExtra: 'evidor[anthropic]',
    exampleModel: 'claude-3-5-sonnet-20241022',
    envVar: 'ANTHROPIC_API_KEY',
    description: 'Native adapter for Anthropic Claude series with context preservation.',
  },
  {
    name: 'Gemini',
    classNameTitle: 'GeminiProvider',
    badge: 'google-genai>=1.0.0',
    installExtra: 'evidor[gemini]',
    exampleModel: 'gemini-2.5-flash',
    envVar: 'GEMINI_API_KEY',
    description: 'Powered by the official google-genai SDK for high-performance inference.',
  },
  {
    name: 'Custom',
    classNameTitle: 'ModelProvider',
    badge: 'Protocol',
    installExtra: 'evidor',
    exampleModel: 'Self-hosted / Any LLM',
    envVar: 'Custom',
    description: 'Implement generate() and with_model() to harness any proprietary or local endpoint.',
  },
];

export function ProvidersSection() {
  const [copiedExtra, setCopiedExtra] = useState<string | null>(null);

  const handleCopy = async (cmd: string, id: string) => {
    await navigator.clipboard.writeText(cmd);
    setCopiedExtra(id);
    setTimeout(() => setCopiedExtra(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 4 Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROVIDERS.map((provider) => {
          const cmd = `pip install "${provider.installExtra}"`;
          return (
            <div
              key={provider.name}
              className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white">
                    {provider.name}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 rounded">
                    {provider.badge}
                  </span>
                </div>

                <div className="text-xs font-mono text-zinc-400 mb-2">
                  {provider.classNameTitle}
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  {provider.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-zinc-800/80 text-[11px] font-mono mb-4">
                  <div className="flex justify-between items-center text-zinc-500">
                    <span>Model:</span>
                    <span className="text-zinc-300 font-medium truncate max-w-[130px]">{provider.exampleModel}</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-500">
                    <span>Env:</span>
                    <span className="text-zinc-300">{provider.envVar}</span>
                  </div>
                </div>
              </div>

              {/* Install pill button */}
              <button
                onClick={() => handleCopy(cmd, provider.name)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                title={`Copy ${cmd}`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span className="truncate">{cmd}</span>
                </div>
                {copiedExtra === provider.name ? (
                  <Check className="w-3 h-3 text-emerald-400 shrink-0 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-zinc-500 shrink-0 ml-1" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Install all extra banner */}
      <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">Need support for all providers?</div>
          <div className="text-xs text-zinc-500 mt-0.5">Install all optional dependencies in a single step</div>
        </div>

        <button
          onClick={() => handleCopy('pip install "evidor[all]"', 'all')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-mono font-medium transition-colors"
        >
          <span>pip install &quot;evidor[all]&quot;</span>
          {copiedExtra === 'all' ? (
            <Check className="w-3 h-3 text-emerald-600" />
          ) : (
            <Copy className="w-3 h-3 text-zinc-600" />
          )}
        </button>
      </div>

      {/* Custom Provider Code */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Extensibility
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
              Implement ModelProvider Protocol
            </h3>
          </div>
          <p className="text-xs text-zinc-500 max-w-md">
            Any class that implements <code className="text-zinc-300 font-mono">generate(request)</code> can be passed into <code className="text-zinc-300 font-mono">Agent</code>.
          </p>
        </div>

        <CodeBlock
          code={CODE_EXAMPLES.customProvider}
          filename="custom_provider.py"
          language="python"
        />
      </div>
    </div>
  );
}
