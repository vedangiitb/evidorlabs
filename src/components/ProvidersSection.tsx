'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal, Server, Activity, ShieldCheck } from 'lucide-react';
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
    description: 'First-class adapter for OpenAI models with tool calling, retries, and context compaction.',
  },
  {
    name: 'Anthropic',
    classNameTitle: 'AnthropicProvider',
    badge: 'anthropic>=0.25.0',
    installExtra: 'evidor[anthropic]',
    exampleModel: 'claude-3-5-sonnet-20241022',
    envVar: 'ANTHROPIC_API_KEY',
    description: 'Native adapter for Anthropic Claude series with native tool formatting & error recovery.',
  },
  {
    name: 'Gemini',
    classNameTitle: 'GeminiProvider',
    badge: 'google-genai>=1.0.0',
    installExtra: 'evidor[gemini]',
    exampleModel: 'gemini-2.5-flash',
    envVar: 'GEMINI_API_KEY',
    description: 'Powered by the official google-genai SDK for fast inference and function calling.',
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

const ECOSYSTEM_EXTRAS = [
  {
    title: 'Model Context Protocol (MCP)',
    extra: 'evidor[mcp]',
    description: 'Connect agents to external MCP servers over stdio, modern Streamable HTTP, or SSE.',
    icon: Server,
  },
  {
    title: 'OpenTelemetry & OpenInference',
    extra: 'evidor[otel]',
    description: 'Distributed tracing spans compliant with OpenTelemetry GenAI and OpenInference standards.',
    icon: Activity,
  },
  {
    title: 'Langfuse Observability',
    extra: 'evidor[langfuse]',
    description: 'LLM trace trees, prompt engineering, generation tracking, and cost evaluation.',
    icon: Activity,
  },
  {
    title: 'Arize Phoenix',
    extra: 'evidor[phoenix]',
    description: 'Local and cloud agent inspection with OpenInference UI and token tracking.',
    icon: Activity,
  },
  {
    title: 'Prometheus Metrics',
    extra: 'evidor[prometheus]',
    description: 'Operational metrics (retries, tokens, latency, agent runs) exported for Prometheus & Grafana.',
    icon: Activity,
  },
  {
    title: 'All Adapters & Toolkits',
    extra: 'evidor[all]',
    description: 'Install all model adapters, MCP clients, and telemetry sinks in one command.',
    icon: ShieldCheck,
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

      {/* Optional Extras & Ecosystem Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              EXTENSIBLE ECOSYSTEM
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
              Modular Extras for MCP &amp; Telemetry
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">
            Install only what you need
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ECOSYSTEM_EXTRAS.map((extra) => {
            const cmd = `pip install "${extra.extra}"`;
            const Icon = extra.icon;
            return (
              <div
                key={extra.extra}
                className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] hover:border-white/[0.14] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{extra.title}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">
                    {extra.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(cmd, extra.extra)}
                  className="w-full flex items-center justify-between px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <span className="truncate">{cmd}</span>
                  {copiedExtra === extra.extra ? (
                    <Check className="w-3 h-3 text-emerald-400 shrink-0 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-500 shrink-0 ml-1" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
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
