'use client';

import React, { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';
import { Wrench, RefreshCw, Sparkles, Check, ArrowRight } from 'lucide-react';

export function ToolsSection() {
  const [activeTab, setActiveTab] = useState<'decorator' | 'agent' | 'manual'>('agent');

  return (
    <div className="space-y-8">
      {/* 3 Value Pillars for Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Wrench className="w-3.5 h-3.5 text-zinc-400" />
            <span>Schema Derivation</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">
            The <code className="text-zinc-300 font-mono">@tool</code> decorator automatically generates compliant JSON Schema from Python type hints and extracts parameter docs from docstrings.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Autonomous Execution Loop</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">
            When models request tool calls, <code className="text-zinc-300 font-mono">Agent</code> executes them, appends tool result messages, and loops automatically up to <code className="text-zinc-300 font-mono">max_tool_iterations</code>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Universal Adapter Support</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">
            Write your tools once. Evidor translates schemas and tool call responses transparently across OpenAI, Anthropic, and Gemini.
          </p>
        </div>
      </div>

      {/* Interactive Tool Execution Walkthrough Card */}
      <div className="rounded-xl bg-[#09090b] border border-white/[0.08] p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1">
              TOOL DISPATCH LIFECYCLE
            </div>
            <div className="text-sm font-semibold text-white">
              Autonomous Function-Calling Loop
            </div>
          </div>

          {/* Segment Tabs */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-md p-0.5 text-xs font-mono">
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'agent'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Agent Loop
            </button>
            <button
              onClick={() => setActiveTab('decorator')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'decorator'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              @tool Decorator
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'manual'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Tool Class
            </button>
          </div>
        </div>

        {/* Step-by-step visual pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06]">
            <div className="text-zinc-500 text-[10px]">01 / QUERY</div>
            <div className="text-white font-medium mt-1">agent.send(...)</div>
            <div className="text-[11px] text-zinc-500 mt-1">User prompts agent with tool-dependent task</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06]">
            <div className="text-zinc-500 text-[10px]">02 / TOOL CALL</div>
            <div className="text-zinc-200 font-medium mt-1">Model emits call</div>
            <div className="text-[11px] text-zinc-500 mt-1">Provider requests tool execution with parsed args</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.12]">
            <div className="text-zinc-400 text-[10px]">03 / EXECUTE</div>
            <div className="text-white font-medium mt-1">Evidor invokes func</div>
            <div className="text-[11px] text-zinc-400 mt-1">Local Python function runs; result recorded as role=&quot;tool&quot;</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06]">
            <div className="text-zinc-500 text-[10px]">04 / SYNTHESIZE</div>
            <div className="text-white font-medium mt-1">Final Response</div>
            <div className="text-[11px] text-zinc-500 mt-1">Model receives output &amp; returns final completed answer</div>
          </div>
        </div>

        {/* Code Block for Active Tab */}
        <div className="pt-2">
          {activeTab === 'agent' && (
            <CodeBlock
              code={CODE_EXAMPLES.toolsQuickstart}
              filename="agent_tool_loop.py"
              language="python"
            />
          )}
          {activeTab === 'decorator' && (
            <CodeBlock
              code={CODE_EXAMPLES.toolDefinition}
              filename="define_tools.py"
              language="python"
            />
          )}
          {activeTab === 'manual' && (
            <CodeBlock
              code={CODE_EXAMPLES.manualTool}
              filename="programmatic_tool.py"
              language="python"
            />
          )}
        </div>
      </div>
    </div>
  );
}
