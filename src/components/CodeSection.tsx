'use client';

import React, { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';

export function CodeSection() {
  const [activeTab, setActiveTab] = useState<
    | 'quickstart'
    | 'stateful'
    | 'stateless'
    | 'thinking'
    | 'compaction'
    | 'async'
    | 'mcp'
    | 'tools'
    | 'evidence'
    | 'telemetry'
  >('quickstart');

  const tabs = [
    {
      id: 'quickstart',
      label: 'Quickstart',
      description: 'Initialize an Agent with OpenAI and dispatch a query in 5 lines.',
      code: CODE_EXAMPLES.quickstart,
      filename: 'quickstart.py',
    },
    {
      id: 'stateful',
      label: 'Stateful Agent',
      description: 'Conversations automatically remember context across turns without passing full history.',
      code: CODE_EXAMPLES.statefulMultiTurn,
      filename: 'stateful_agent.py',
    },
    {
      id: 'stateless',
      label: 'Stateless Calls',
      description: 'Direct single-turn calls with user-managed message history and zero hidden state.',
      code: CODE_EXAMPLES.userManagedHistory,
      filename: 'stateless_generation.py',
    },
    {
      id: 'thinking',
      label: 'Thinking Flags',
      description: 'Configure reasoning effort, budget tokens, and inspect intermediate scratchpads.',
      code: CODE_EXAMPLES.thinkingConfig,
      filename: 'thinking_modes.py',
    },
    {
      id: 'compaction',
      label: 'Native Compaction',
      description: 'Offload context compaction directly to model providers at compact_threshold.',
      code: CODE_EXAMPLES.nativeCompaction,
      filename: 'native_compaction.py',
    },
    {
      id: 'async',
      label: 'Concurrent Async',
      description: 'Async-first execution engine executing multiple tools concurrently via asyncio.gather().',
      code: CODE_EXAMPLES.concurrentTools,
      filename: 'async_agent.py',
    },
    {
      id: 'mcp',
      label: 'MCP Integration',
      description: 'Connect to external Model Context Protocol (MCP) servers over stdio, HTTP, or SSE.',
      code: CODE_EXAMPLES.mcpQuickstart,
      filename: 'mcp_integration.py',
    },
    {
      id: 'tools',
      label: 'Autonomous Tools',
      description: 'Equip agents with Python functions using @tool and autonomous execution loops.',
      code: CODE_EXAMPLES.toolsQuickstart,
      filename: 'agent_tools.py',
    },
    {
      id: 'evidence',
      label: 'Evidence Store',
      description: 'In-memory structured evidence store and bounded webpage reader for research agents.',
      code: CODE_EXAMPLES.evidenceStore,
      filename: 'evidence_store.py',
    },
    {
      id: 'telemetry',
      label: 'Observability & PII',
      description: 'Non-blocking actor runtime (<1µs overhead) exporting to OpenTelemetry, Langfuse, or Phoenix.',
      code: CODE_EXAMPLES.telemetryThinking,
      filename: 'agent_telemetry.py',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="space-y-4">
      {/* Segmented Control Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-white/[0.08] w-fit">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Code Display Area */}
      <div className="space-y-2">
        <p className="text-xs text-zinc-400 font-mono">
          {currentTab.description}
        </p>
        <CodeBlock
          code={currentTab.code}
          filename={currentTab.filename}
          language="python"
        />
      </div>
    </div>
  );
}
