'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'python',
  filename,
  showLineNumbers = true,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.trim().split('\n');

  const renderHighlightedLine = (line: string) => {
    if (language === 'bash' || language === 'sh') {
      if (line.startsWith('#')) {
        return <span className="text-zinc-500 italic">{line}</span>;
      }
      if (line.startsWith('pip') || line.startsWith('python')) {
        const parts = line.split(' ');
        const cmd = parts[0];
        const rest = parts.slice(1).join(' ');
        return (
          <>
            <span className="text-white font-medium">{cmd}</span>{' '}
            <span className="text-zinc-300">{rest}</span>
          </>
        );
      }
      return <span className="text-zinc-300">{line}</span>;
    }

    if (line.trim().startsWith('#')) {
      return <span className="text-zinc-500 italic">{line}</span>;
    }

    const tokens = line.split(/(".*?"|'.*?'|\b(?:from|import|def|class|return|if|else|elif|for|in|while|as|with|True|False|None)\b)/g);

    return tokens.map((token, i) => {
      if (token.startsWith('"') || token.startsWith("'")) {
        return <span key={i} className="text-emerald-400/90">{token}</span>;
      }
      if (/^(from|import|def|class|return|if|else|elif|for|in|while|as|with)$/.test(token)) {
        return <span key={i} className="text-indigo-300/90 font-medium">{token}</span>;
      }
      if (/^(True|False|None)$/.test(token)) {
        return <span key={i} className="text-amber-400 font-medium">{token}</span>;
      }
      if (/\b(Agent|OpenAIProvider|AnthropicProvider|GeminiProvider|GenerationRequest|GenerationResponse|Message|ModelProvider|CustomProvider|Tool)\b/.test(token)) {
        return <span key={i} className="text-zinc-100 font-semibold">{token}</span>;
      }
      if (/\b(send|generate|clear_history|with_model|print|tool)\b/.test(token)) {
        return <span key={i} className="text-sky-300">{token}</span>;
      }
      return <span key={i} className="text-zinc-300">{token}</span>;
    });
  };

  return (
    <div
      className={`rounded-lg border border-white/[0.08] bg-[#09090b] overflow-hidden shadow-2xl shadow-black/80 transition-all ${className}`}
    >
      {/* Chrome header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#050507] border-b border-white/[0.06] select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 opacity-60">
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
          </div>
          {filename && (
            <span className="text-[11px] font-mono text-zinc-400 font-medium tracking-tight">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            {language}
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className="flex items-center gap-1.5 px-2 py-1 text-[11px] rounded bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed">
        <pre className="table w-full">
          {lines.map((line, idx) => (
            <div key={idx} className="table-row">
              {showLineNumbers && (
                <span className="table-cell select-none pr-4 text-right text-zinc-600 font-mono text-[11px] w-7">
                  {idx + 1}
                </span>
              )}
              <span className="table-cell whitespace-pre">{renderHighlightedLine(line)}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
