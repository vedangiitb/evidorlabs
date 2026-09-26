'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal, ExternalLink } from 'lucide-react';
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
  docsUrl: string;
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
    docsUrl: 'https://platform.openai.com',
  },
  {
    name: 'Anthropic',
    classNameTitle: 'AnthropicProvider',
    badge: 'anthropic>=0.25.0',
    installExtra: 'evidor[anthropic]',
    exampleModel: 'claude-3-5-sonnet-20241022',
    envVar: 'ANTHROPIC_API_KEY',
    description: 'Native adapter for Anthropic Claude series with context preservation.',
    docsUrl: 'https://docs.anthropic.com',
  },
  {
    name: 'Gemini',
    classNameTitle: 'GeminiProvider',
    badge: 'google-genai>=1.0.0',
    installExtra: 'evidor[gemini]',
    exampleModel: 'gemini-2.5-flash',
    envVar: 'GEMINI_API_KEY',
    description: 'Powered by the official google-genai SDK for high-performance inference.',
    docsUrl: 'https://ai.google.dev',
  },
  {
    name: 'Custom Provider',
    classNameTitle: 'ModelProvider Protocol',
    badge: 'Zero dependencies',
    installExtra: 'evidor',
    exampleModel: 'Any LLM / Self-hosted',
    envVar: 'User Defined',
    description: 'Implement generate() and with_model() to harness any proprietary, local, or self-hosted model.',
    docsUrl: '/docs#custom-providers',
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
    <div className="space-y-12">
      {/* 4 Provider Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PROVIDERS.map((provider) => {
          const cmd = `pip install "${provider.installExtra}"`;
          return (
            <div
              key={provider.name}
              className="p-5 rounded-xl bg-[#0a0c13] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {provider.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                    {provider.badge}
                  </span>
                </div>

                <div className="text-xs font-mono text-sky-400/90 mb-2 font-medium">
                  {provider.classNameTitle}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {provider.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-white/5 text-[11px] font-mono mb-4">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Model:</span>
                    <span className="text-slate-300 font-semibold truncate max-w-[130px]">{provider.exampleModel}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Env:</span>
                    <span className="text-amber-300/90">{provider.envVar}</span>
                  </div>
                </div>
              </div>

              {/* Install pill button */}
              <button
                onClick={() => handleCopy(cmd, provider.name)}
                className="w-full mt-2 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all"
                title={`Copy ${cmd}`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="truncate">{cmd}</span>
                </div>
                {copiedExtra === provider.name ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Install all extra banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/20 via-indigo-950/20 to-purple-950/20 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0 font-mono text-xs font-bold">
            ALL
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Need support for all providers?</div>
            <div className="text-xs text-slate-400">Install all optional dependencies in a single step</div>
          </div>
        </div>

        <button
          onClick={() => handleCopy('pip install "evidor[all]"', 'all')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-xs font-mono text-sky-200 transition-all active:scale-98"
        >
          <span>pip install &quot;evidor[all]&quot;</span>
          {copiedExtra === 'all' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-sky-400" />
          )}
        </button>
      </div>

      {/* Custom Provider Protocol Code */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Extendability
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Implement the ModelProvider Protocol
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Any class that conforms to the <code className="text-sky-300">ModelProvider</code> protocol with <code className="text-sky-300">generate(request)</code> can be plugged directly into <code className="text-sky-300">Agent</code>.
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

