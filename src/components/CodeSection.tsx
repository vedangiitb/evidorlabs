'use client';

import React, { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';
import { Sparkles, MessageSquare, Terminal, Sliders } from 'lucide-react';

export function CodeSection() {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'multiturn' | 'system' | 'lowlevel'>('quickstart');

  const tabs = [
    {
      id: 'quickstart',
      label: 'Quickstart',
      icon: Terminal,
      description: 'Initialize an Agent with OpenAI and send a prompt in 5 lines.',
      code: CODE_EXAMPLES.quickstart,
      filename: 'quickstart.py',
    },
    {
      id: 'multiturn',
      label: 'Multi-turn Sessions',
      icon: MessageSquare,
      description: 'Persistent conversation state preserved seamlessly across calls.',
      code: CODE_EXAMPLES.multiTurn,
      filename: 'multiturn_agent.py',
    },
    {
      id: 'system',
      label: 'System Prompts',
      icon: Sliders,
      description: 'Permanent instructions that survive conversation compaction resets.',
      code: CODE_EXAMPLES.systemPrompt,
      filename: 'system_prompt.py',
    },
    {
      id: 'lowlevel',
      label: 'Low-level Requests',
      icon: Sparkles,
      description: 'Direct provider calls without session state via GenerationRequest.',
      code: CODE_EXAMPLES.lowLevel,
      filename: 'direct_generation.py',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="space-y-6">
      {/* Tab navigation pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#090b12] border border-white/10 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 font-mono">
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

