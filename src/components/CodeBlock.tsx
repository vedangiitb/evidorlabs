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
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.trim().split('\n');

  // Simple syntax highlighter for Python / Bash
  const renderHighlightedLine = (line: string) => {
    if (language === 'bash' || language === 'sh') {
      if (line.startsWith('#')) {
        return <span className="text-slate-500 italic">{line}</span>;
      }
      if (line.startsWith('pip') || line.startsWith('python')) {
        const parts = line.split(' ');
        const cmd = parts[0];
        const rest = parts.slice(1).join(' ');
        return (
          <>
            <span className="text-cyan-400 font-medium">{cmd}</span>{' '}
            <span className="text-slate-300">{rest}</span>
          </>
        );
      }
      return <span className="text-slate-300">{line}</span>;
    }

    // Python syntax highlighting
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    // Tokenize strings, keywords, classes, etc.
    const tokens = line.split(/(".*?"|'.*?'|\b(?:from|import|def|class|return|if|else|elif|for|in|while|as|with|True|False|None)\b)/g);

    return tokens.map((token, i) => {
      if (token.startsWith('"') || token.startsWith("'")) {
        return <span key={i} className="text-emerald-400">{token}</span>;
      }
      if (/^(from|import|def|class|return|if|else|elif|for|in|while|as|with)$/.test(token)) {
        return <span key={i} className="text-indigo-400 font-semibold">{token}</span>;
      }
      if (/^(True|False|None)$/.test(token)) {
        return <span key={i} className="text-amber-400 font-semibold">{token}</span>;
      }
      if (/\b(Agent|OpenAIProvider|AnthropicProvider|GeminiProvider|GenerationRequest|GenerationResponse|Message|ModelProvider|CustomProvider)\b/.test(token)) {
        return <span key={i} className="text-sky-300 font-medium">{token}</span>;
      }
      if (/\b(send|generate|clear_history|with_model|print)\b/.test(token)) {
        return <span key={i} className="text-cyan-300">{token}</span>;
      }
      return <span key={i} className="text-slate-300">{token}</span>;
    });
  };

  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#0c0e14] overflow-hidden shadow-2xl transition-all ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#090b10] border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename && (
            <span className="text-xs font-mono text-slate-400 font-medium tracking-tight">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-1.5 py-0.5 rounded bg-white/5">
            {language}
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
        <pre className="table w-full">
          {lines.map((line, idx) => (
            <div key={idx} className="table-row">
              {showLineNumbers && (
                <span className="table-cell select-none pr-4 text-right text-slate-600 font-mono text-xs w-8">
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

