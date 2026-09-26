'use client';

import React, { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';

export function CodeSection() {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'multiturn' | 'system' | 'lowlevel'>('quickstart');

  const tabs = [
    {
      id: 'quickstart',
      label: 'Quickstart',
      description: 'Initialize an Agent with OpenAI and dispatch a query in 5 lines.',
      code: CODE_EXAMPLES.quickstart,
      filename: 'quickstart.py',
    },
    {
      id: 'multiturn',
      label: 'Multi-turn Sessions',
      description: 'Persistent conversation state preserved seamlessly across calls.',
      code: CODE_EXAMPLES.multiTurn,
      filename: 'multiturn_agent.py',
    },
    {
      id: 'system',
      label: 'System Prompts',
      description: 'Permanent guidelines that survive conversation compaction resets.',
      code: CODE_EXAMPLES.systemPrompt,
      filename: 'system_prompt.py',
    },
    {
      id: 'lowlevel',
      label: 'Low-level Requests',
      description: 'Direct provider calls without session state via GenerationRequest.',
      code: CODE_EXAMPLES.lowLevel,
      filename: 'direct_generation.py',
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
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-zinc-500 font-mono">
        {currentTab.description}
      </p>

      {/* Code Display */}
      <CodeBlock
        code={currentTab.code}
        filename={currentTab.filename}
        language="python"
      />
    </div>
  );
}
