'use client';

import React, { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { CODE_EXAMPLES } from '@/lib/constants';
import { Wrench, RefreshCw, FolderTree, Server, Boxes, Globe } from 'lucide-react';

export function ToolsSection() {
  const [activeTab, setActiveTab] = useState<
    'agent' | 'mcp' | 'decorator' | 'concurrent' | 'evidence' | 'reader' | 'filesystem' | 'websearch' | 'manual'
  >('agent');

  return (
    <div className="space-y-8">
      {/* 3 Value Pillars for Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Wrench className="w-3.5 h-3.5 text-zinc-400" />
            <span>Schema Derivation &amp; Concurrent Gather</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">
            The <code className="text-zinc-300 font-mono">@tool</code> decorator derives JSON Schema from type hints and docstrings. Multi-tool calls in a turn execute concurrently via <code className="text-zinc-300 font-mono">asyncio.gather()</code> with error self-correction.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Server className="w-3.5 h-3.5 text-zinc-400" />
            <span>Model Context Protocol (MCP)</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">
            Connect to external MCP servers over <code className="text-zinc-300 font-mono">stdio</code>, modern <code className="text-zinc-300 font-mono">Streamable HTTP</code>, or <code className="text-zinc-300 font-mono">SSE</code>. Share a single client across agents in FastAPI with <code className="text-zinc-300 font-mono">mcp_client</code>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Boxes className="w-3.5 h-3.5 text-zinc-400" />
            <span>Evidence Store &amp; Web Reader</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">
            Bundled dependency-free tools include in-memory <code className="text-zinc-300 font-mono">EvidenceStore</code> for research, token-bounded <code className="text-zinc-300 font-mono">read_webpage</code>, sandbox <code className="text-zinc-300 font-mono">filesystem_tools</code>, and <code className="text-zinc-300 font-mono">web_search</code>.
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
              Autonomous Tool Loops &amp; Concurrent Execution
            </div>
          </div>

          {/* Segment Tabs */}
          <div className="flex flex-wrap items-center bg-zinc-950 border border-zinc-800 rounded-md p-0.5 text-xs font-mono">
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
              onClick={() => setActiveTab('concurrent')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'concurrent'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Concurrent Gather
            </button>
            <button
              onClick={() => setActiveTab('mcp')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'mcp'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              MCP Servers
            </button>
            <button
              onClick={() => setActiveTab('decorator')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'decorator'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              @tool
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'evidence'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Evidence Store
            </button>
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'reader'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Webpage Reader
            </button>
            <button
              onClick={() => setActiveTab('filesystem')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'filesystem'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Filesystem
            </button>
            <button
              onClick={() => setActiveTab('websearch')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'websearch'
                  ? 'bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Web Search
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
            <div className="text-[11px] text-zinc-500 mt-1">User or service prompts agent with tool-dependent request</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06]">
            <div className="text-zinc-500 text-[10px]">02 / DISPATCH</div>
            <div className="text-zinc-200 font-medium mt-1">Concurrent Gather</div>
            <div className="text-[11px] text-zinc-500 mt-1">Multiple calls in a turn execute concurrently via asyncio.gather()</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.12]">
            <div className="text-zinc-400 text-[10px]">03 / EXECUTE &amp; CATCH</div>
            <div className="text-white font-medium mt-1">Safe Execution</div>
            <div className="text-[11px] text-zinc-400 mt-1">Runs sync/async with timeouts; errors feed back for self-healing</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06]">
            <div className="text-zinc-500 text-[10px]">04 / SYNTHESIZE</div>
            <div className="text-white font-medium mt-1">Final Response</div>
            <div className="text-[11px] text-zinc-500 mt-1">Model receives outputs &amp; returns final completed answer</div>
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
          {activeTab === 'concurrent' && (
            <CodeBlock
              code={CODE_EXAMPLES.concurrentTools}
              filename="concurrent_tools_gather.py"
              language="python"
            />
          )}
          {activeTab === 'mcp' && (
            <CodeBlock
              code={CODE_EXAMPLES.mcpQuickstart}
              filename="mcp_agent.py"
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
          {activeTab === 'evidence' && (
            <CodeBlock
              code={CODE_EXAMPLES.evidenceStore}
              filename="evidence_store_agent.py"
              language="python"
            />
          )}
          {activeTab === 'reader' && (
            <CodeBlock
              code={CODE_EXAMPLES.webpageReader}
              filename="read_webpage_agent.py"
              language="python"
            />
          )}
          {activeTab === 'filesystem' && (
            <CodeBlock
              code={CODE_EXAMPLES.filesystemTools}
              filename="filesystem_tools.py"
              language="python"
            />
          )}
          {activeTab === 'websearch' && (
            <CodeBlock
              code={CODE_EXAMPLES.webSearch}
              filename="web_search_tool.py"
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
