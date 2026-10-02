'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, CODE_EXAMPLES } from '@/lib/constants';
import { useReleaseInfo } from '@/lib/useReleaseInfo';
import { CodeBlock } from '@/components/CodeBlock';
import { GithubIcon } from '@/components/GithubIcon';
import {
  ArrowUpRight,
  ChevronRight,
  GitBranch,
  Terminal,
  ShieldCheck,
  FolderTree,
  Globe,
  Zap,
} from 'lucide-react';

const DOCS_SECTIONS = [
  {
    category: 'Getting Started',
    items: [
      { id: 'overview', title: 'Overview' },
      { id: 'installation', title: 'Installation' },
      { id: 'quickstart', title: 'Quickstart' },
    ],
  },
  {
    category: 'Agent & Sessions',
    items: [
      { id: 'multi-turn', title: 'Multi-turn Conversations' },
      { id: 'system-prompts', title: 'System Prompts' },
      { id: 'async-conversations', title: 'Native Async Conversations' },
      { id: 'history-management', title: 'Inspecting & Resetting History' },
    ],
  },
  {
    category: 'Context Engine',
    items: [
      { id: 'context-management', title: 'Context Window & Compaction' },
      { id: 'configurable-summarization', title: 'Configurable Summarization' },
    ],
  },
  {
    category: 'Tools & Functions',
    items: [
      { id: 'tool-definition', title: 'Defining Tools with @tool' },
      { id: 'agent-tools', title: 'Equipping Agents with Tools' },
      { id: 'async-tools', title: 'Async Tools & Timeouts' },
      { id: 'manual-tools', title: 'Manual Tool Definition' },
    ],
  },
  {
    category: 'Built-in Toolkits',
    items: [
      { id: 'builtin-tools', title: 'Calculator & Current Time' },
      { id: 'filesystem-tools', title: 'Scoped Filesystem Tools' },
      { id: 'web-search', title: 'Provider-Neutral Web Search' },
    ],
  },
  {
    category: 'Providers & Low-level API',
    items: [
      { id: 'low-level-generation', title: 'Low-level GenerationRequest' },
      { id: 'supported-providers', title: 'Supported Providers & Keys' },
      { id: 'custom-providers', title: 'Custom ModelProvider Protocol' },
    ],
  },
  {
    category: 'Release & Build',
    items: [
      { id: 'release-model', title: 'PyPI Release Model' },
      { id: 'local-build', title: 'Local Build & Testing' },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const { version, pypiUrl } = useReleaseInfo();
  const effectivePypiUrl = pypiUrl || SITE_CONFIG.pypiUrl;

  return (
    <div className="pt-20 pb-20 min-h-screen bg-black text-white">
      {/* Top Banner: Status */}
      <div className="border-b border-zinc-800/80 bg-zinc-950 px-4 py-2 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              Documentation for <strong>evidor v{version.replace(/^v/, '')}</strong>. Published on PyPI.
            </span>
          </div>
          <a
            href={effectivePypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 hover:text-white"
          >
            <span>PyPI Package</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: Table of Contents */}
          {/* ========================================================================= */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 self-start space-y-6">
            <div className="p-3.5 rounded-lg bg-[#09090b] border border-white/[0.08]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                DOCUMENTATION
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Agent runtime reference, tool primitives, context compaction, and provider configuration.
              </p>
            </div>

            <nav className="space-y-5 text-xs">
              {DOCS_SECTIONS.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold px-2">
                    {group.category}
                  </h4>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            onClick={() => setActiveSection(item.id)}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                              isActive
                                ? 'bg-zinc-800 text-white font-medium'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                            }`}
                          >
                            <span>{item.title}</span>
                            {isActive && <ChevronRight className="w-3 h-3 text-zinc-400" />}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Quick links box */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
              <a
                href={effectivePypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors font-mono"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                  <span>PyPI v{version.replace(/^v/, '')}</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
              <a
                href={SITE_CONFIG.githubCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* MAIN DOCUMENTATION CONTENT */}
          {/* ========================================================================= */}
          <main className="lg:col-span-9 space-y-14 text-zinc-300">
            {/* 1. OVERVIEW */}
            <section id="overview" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                GETTING STARTED
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Evidor Documentation
              </h1>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Evidor is an open-source, provider-agnostic runtime for building AI agents. It provides a clean, unified interface for conversational agents across multiple model providers, with built-in context window management and automatic summarization.
              </p>

              <div className="p-4 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-zinc-400 leading-relaxed">
                <strong className="text-white block mb-1">Runtime Harness Architecture</strong>
                Unlike simple SDK wrappers that merely standardize request formats, Evidor acts as an operational runtime: coordinating conversational session state, tracking token budgets, running background summarization compaction, executing native sync and async tool loops, and preserving system prompts across resets.
              </div>
            </section>

            {/* 2. INSTALLATION */}
            <section id="installation" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Installation
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Install Evidor from PyPI with the provider adapter(s) needed for your stack:
              </p>

              <CodeBlock
                code={`# Install with OpenAI adapter
pip install "evidor[openai]"

# Install with Anthropic adapter
pip install "evidor[anthropic]"

# Install with Google Gemini adapter
pip install "evidor[gemini]"

# Install all supported provider dependencies
pip install "evidor[all]"

# Install development & test dependencies
pip install "evidor[dev]"`}
                language="bash"
                filename="terminal"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="text-white font-semibold">Published on PyPI:</span> Package is published at{' '}
                <a
                  href={effectivePypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 underline hover:text-white"
                >
                  pypi.org/project/evidor/
                </a>
                .
              </div>
            </section>

            {/* 3. QUICKSTART */}
            <section id="quickstart" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Quickstart
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Create an <code className="text-zinc-200 font-mono">Agent</code> with any provider and send a message:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.quickstart}
                filename="quickstart.py"
                language="python"
              />

              <p className="text-xs text-zinc-500">
                Response objects expose <code className="text-zinc-300 font-mono">response.text</code> (assistant response string) and <code className="text-zinc-300 font-mono">response.model</code> (model identifier).
              </p>
            </section>

            {/* 4. MULTI-TURN CONVERSATIONS */}
            <section id="multi-turn" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Multi-turn Conversations
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                The <code className="text-zinc-200 font-mono">Agent</code> maintains session state across conversation turns. Consecutive calls to <code className="text-zinc-200 font-mono">send()</code> advance the dialogue:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.multiTurn}
                filename="multi_turn.py"
                language="python"
              />
            </section>

            {/* 5. SYSTEM PROMPTS */}
            <section id="system-prompts" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                System Prompts
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                You can configure an initial system prompt when creating an <code className="text-zinc-200 font-mono">Agent</code>. Crucially, the system prompt is preserved across conversation compaction and history resets:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.systemPrompt}
                filename="system_prompt.py"
                language="python"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <strong className="text-white">Preservation guarantee:</strong> During context compaction, Evidor never compacts or deletes the system prompt. It remains anchored at position 0 of every generation request sent to the provider.
              </div>
            </section>

            {/* 6. NATIVE ASYNC CONVERSATIONS */}
            <section id="async-conversations" className="space-y-3 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Native Asynchronous Conversations (send_async)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                In async environments (like FastAPI, Tornado, or asynchronous data pipelines), use <code className="text-zinc-200 font-mono">await agent.send_async(...)</code>. When called, all async tools execute natively on the caller&apos;s event loop without thread transitions, cleanly preserving shared connection pools, locks, and <code className="text-zinc-200 font-mono">contextvars</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.asyncAgent}
                filename="async_conversation.py"
                language="python"
              />
            </section>

            {/* 7. INSPECTING AND CLEARING HISTORY */}
            <section id="history-management" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Inspecting and Clearing History
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                You can inspect the retained conversation history or reset turns at any time:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.history}
                filename="history_methods.py"
                language="python"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <code className="text-zinc-200 font-mono">agent.clear_history()</code> clears conversation turns while keeping the original system prompt intact.
              </div>
            </section>

            {/* 8. CONTEXT WINDOW MANAGEMENT */}
            <section id="context-management" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Context Window Management &amp; Compaction
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                <code className="text-zinc-200 font-mono">Agent</code> automatically manages message history to stay within token and message limits using <code className="text-zinc-200 font-mono">ConversationContext</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.contextManagement}
                filename="context_config.py"
                language="python"
              />

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-white">Default Parameters:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono border border-white/[0.08] rounded-md overflow-hidden">
                    <thead className="bg-[#09090b] text-zinc-300 border-b border-white/[0.08]">
                      <tr>
                        <th className="p-2.5 text-left font-medium">Parameter</th>
                        <th className="p-2.5 text-left font-medium">Default</th>
                        <th className="p-2.5 text-left font-medium">Constant</th>
                        <th className="p-2.5 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 text-zinc-400">
                      <tr>
                        <td className="p-2.5 text-white font-medium">context_window</td>
                        <td className="p-2.5 text-zinc-300">16_000</td>
                        <td className="p-2.5 text-zinc-400">DEFAULT_CONTEXT_WINDOW</td>
                        <td className="p-2.5">Max token budget before compaction fires.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-white font-medium">max_messages</td>
                        <td className="p-2.5 text-zinc-300">50</td>
                        <td className="p-2.5 text-zinc-400">DEFAULT_MAX_MESSAGES</td>
                        <td className="p-2.5">Max messages retained before compaction fires.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#09090b] border border-white/[0.08] space-y-1.5 text-xs text-zinc-400">
                <div className="font-semibold text-white">When conversation history exceeds limits:</div>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li>Older messages are automatically summarized using the configured model provider.</li>
                  <li>The summary is injected as a bounded summary message (<code className="text-zinc-200 font-mono">Message(role=&quot;system&quot;, ..., is_summary=True)</code>).</li>
                  <li>The permanent system prompt and recent conversational turns remain intact.</li>
                </ul>
              </div>
            </section>

            {/* 9. CONFIGURABLE SUMMARIZATION */}
            <section id="configurable-summarization" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Configurable Summarization Model
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                By default, the agent uses its primary provider and model for summarization during compaction. You can configure a specific model name string or a separate <code className="text-zinc-200 font-mono">ModelProvider</code> instance (e.g. to use a faster, lighter model for background summaries):
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.summarizationModel}
                filename="summarizer_options.py"
                language="python"
              />
            </section>

            {/* 10. DEFINING TOOLS WITH @tool */}
            <section id="tool-definition" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                TOOLS &amp; FUNCTION CALLING
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Defining Tools with @tool
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Transform any Python function into a provider-neutral tool using the <code className="text-zinc-200 font-mono">@tool</code> decorator. Evidor automatically derives the JSON Schema for parameters from type annotations and extracts descriptions from docstrings (Google, Sphinx, or plain styles):
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.toolDefinition}
                filename="tool_definition.py"
                language="python"
              />
            </section>

            {/* 11. EQUIPPING AGENTS WITH TOOLS */}
            <section id="agent-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Equipping Agents with Tools
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Pass your tools directly into <code className="text-zinc-200 font-mono">Agent(..., tools=[...])</code>. When a model decides to call one or more tools, the agent automatically executes them, feeds the results back to the model as <code className="text-zinc-200 font-mono">role=&quot;tool&quot;</code> messages, and loops until the model generates a final response:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.toolsQuickstart}
                filename="agent_tool_loop.py"
                language="python"
              />
            </section>

            {/* 12. ASYNC TOOLS & EXECUTION TIMEOUTS */}
            <section id="async-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Async Tools &amp; Execution Timeouts
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor seamlessly supports asynchronous functions and execution timeouts:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.asyncTools}
                filename="async_tools.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <strong className="text-white">Self-healing recovery:</strong> If a tool times out, raises an error, or if the model emits malformed JSON arguments, Evidor safely captures the error and feeds it back to the model as a <code className="text-zinc-200 font-mono">role=&quot;tool&quot;</code> message so the LLM can self-correct.
              </div>
            </section>

            {/* 13. BUILT-IN TOOLS */}
            <section id="builtin-tools" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                BUILT-IN TOOLKITS
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Built-in Utility Tools (calculator &amp; get_current_time)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor includes dependency-free utility tools you can opt into. They are not attached to agents automatically:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.builtInTools}
                filename="builtin_tools.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-zinc-400 space-y-1">
                <p><code className="text-zinc-200 font-mono">get_current_time</code> returns an ISO 8601 timestamp and accepts an IANA timezone name (UTC by default).</p>
                <p><code className="text-zinc-200 font-mono">calculator</code> evaluates basic arithmetic without executing arbitrary Python code.</p>
              </div>
            </section>

            {/* 14. FILESYSTEM TOOLS */}
            <section id="filesystem-tools" className="space-y-3 scroll-mt-24">
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-zinc-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Scoped Filesystem Tools
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Create filesystem tools scoped to an existing directory for listing, searching, reading, creating, updating, and deleting files. Paths supplied by the model are resolved strictly under that root, and file reads/writes and result counts have configurable limits:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.filesystemTools}
                filename="filesystem_tools.py"
                language="python"
              />

              <div className="p-4 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs space-y-2">
                <div className="font-semibold text-white">filesystem_tools returns six scoped tools:</div>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong className="text-zinc-200 font-mono">list_files</strong>: Lists files in the root or a subdirectory.</li>
                  <li><strong className="text-zinc-200 font-mono">read_file</strong>: Reads a UTF-8 text file.</li>
                  <li><strong className="text-zinc-200 font-mono">search_files</strong>: Searches UTF-8 text files for a literal string.</li>
                  <li><strong className="text-zinc-200 font-mono">create_file</strong>: Creates a new UTF-8 text file; fails if the path already exists. Parent directory must already exist.</li>
                  <li><strong className="text-zinc-200 font-mono">write_file</strong>: Replaces the contents of an existing UTF-8 text file.</li>
                  <li><strong className="text-zinc-200 font-mono">delete_file</strong>: Deletes an existing file (directories cannot be deleted).</li>
                </ul>
                <p className="text-zinc-500 pt-1">
                  All paths stay within the configured root. <code className="text-zinc-300 font-mono">max_file_bytes</code> limits file read/write sizes, <code className="text-zinc-300 font-mono">max_results</code> bounds listing/search results, and <code className="text-zinc-300 font-mono">max_files_scanned</code> bounds recursive search work.
                </p>
              </div>
            </section>

            {/* 15. WEB SEARCH */}
            <section id="web-search" className="space-y-3 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-zinc-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Provider-Neutral Web Search
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Use <code className="text-zinc-200 font-mono">web_search()</code> to create a provider-neutral agent tool. The tool depends only on the <code className="text-zinc-200 font-mono">WebSearchProvider</code> interface, so the search service can be swapped without changing agent setup. The bundled Tavily, Exa, and Brave adapters use only Python&apos;s standard library:
              </p>

              <CodeBlock
                code={`export TAVILY_API_KEY="..."
# or EXA_API_KEY="..." / BRAVE_SEARCH_API_KEY="..."`}
                language="bash"
                filename="terminal"
              />

              <CodeBlock
                code={CODE_EXAMPLES.webSearch}
                filename="web_search.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                Switch providers by replacing <code className="text-zinc-200 font-mono">TavilySearchProvider()</code> with <code className="text-zinc-200 font-mono">ExaSearchProvider()</code> or <code className="text-zinc-200 font-mono">BraveSearchProvider()</code>. To implement another service, satisfy the small <code className="text-zinc-200 font-mono">WebSearchProvider</code> contract: <code className="text-zinc-200 font-mono">search(query: str, *, max_results: int) -&gt; list[SearchResult]</code>.
              </div>
            </section>

            {/* 16. MANUAL TOOL DEFINITION */}
            <section id="manual-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Manual Tool Definition (Tool Class)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For dynamic or programmatic tools without a standard Python function signature, instantiate <code className="text-zinc-200 font-mono">Tool</code> directly:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.manualTool}
                filename="manual_tool.py"
                language="python"
              />
            </section>

            {/* 17. LOW-LEVEL GENERATION */}
            <section id="low-level-generation" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                LOW-LEVEL API &amp; PROVIDERS
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Low-level Generation with GenerationRequest
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For direct provider calls without stateful session management, instantiate messages and requests directly:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.lowLevel}
                filename="low_level_generation.py"
                language="python"
              />
            </section>

            {/* 18. SUPPORTED PROVIDERS */}
            <section id="supported-providers" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Supported Providers &amp; Credentials
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Supported providers and their typical models:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border border-white/[0.08] rounded-md overflow-hidden">
                  <thead className="bg-[#09090b] text-zinc-300 border-b border-white/[0.08]">
                    <tr>
                      <th className="p-2.5 text-left font-medium">Provider</th>
                      <th className="p-2.5 text-left font-medium">Example Model</th>
                      <th className="p-2.5 text-left font-medium">Environment Variable</th>
                      <th className="p-2.5 text-left font-medium">Extra Install</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 text-zinc-400">
                    <tr>
                      <td className="p-2.5 text-white font-medium">OpenAIProvider</td>
                      <td className="p-2.5 text-zinc-300">gpt-4.1-mini</td>
                      <td className="p-2.5 text-zinc-300">OPENAI_API_KEY</td>
                      <td className="p-2.5">evidor[openai]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-white font-medium">AnthropicProvider</td>
                      <td className="p-2.5 text-zinc-300">claude-3-5-sonnet-20241022</td>
                      <td className="p-2.5 text-zinc-300">ANTHROPIC_API_KEY</td>
                      <td className="p-2.5">evidor[anthropic]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-white font-medium">GeminiProvider</td>
                      <td className="p-2.5 text-zinc-300">gemini-2.5-flash</td>
                      <td className="p-2.5 text-zinc-300">GEMINI_API_KEY</td>
                      <td className="p-2.5">evidor[gemini]</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-zinc-500">
                API keys can be supplied explicitly via the <code className="text-zinc-300 font-mono">api_key</code> constructor argument or read automatically from environment variables.
              </p>
            </section>

            {/* 19. CUSTOM PROVIDERS */}
            <section id="custom-providers" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Custom Providers (ModelProvider Protocol)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                <code className="text-zinc-200 font-mono">Agent</code> depends only on the <code className="text-zinc-200 font-mono">ModelProvider</code> protocol. To support another LLM or backend, implement the <code className="text-zinc-200 font-mono">generate(request)</code> and <code className="text-zinc-200 font-mono">with_model(model)</code> methods:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.customProvider}
                filename="custom_provider.py"
                language="python"
              />
            </section>

            {/* 20. RELEASE MODEL */}
            <section id="release-model" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                RELEASE &amp; DEVELOPMENT
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-zinc-400" />
                <span>PyPI Release Model &amp; Conventional Commits</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Releases are performed by GitHub Actions and use Conventional Commits to select the next semantic version:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-zinc-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>main Branch → PyPI Stable</span>
                  </div>
                  <p className="text-zinc-500 leading-relaxed">
                    Pushes and releases merged to <code className="text-zinc-300">main</code> publish stable production versions directly to PyPI via trusted publishing.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-zinc-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>dev Branch → TestPyPI</span>
                  </div>
                  <p className="text-zinc-500 leading-relaxed">
                    Pushes to <code className="text-zinc-300">dev</code> publish <code className="text-zinc-300 font-mono">-dev.N</code> prereleases to TestPyPI for CI verification.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  Conventional Commit Rules:
                </h4>
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-white font-medium">fix: ...</span>
                    <span className="text-zinc-500">Creates a patch release</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-white font-medium">feat: ...</span>
                    <span className="text-zinc-500">Creates a minor release</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-white font-medium">feat!: ... or BREAKING CHANGE:</span>
                    <span className="text-zinc-500">Creates a major release</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 21. LOCAL BUILD & TEST */}
            <section id="local-build" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Build &amp; Release Commands
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Create distributable artifacts locally:
              </p>

              <CodeBlock
                code={`python -m pip install -e ".[dev]"
python -m pytest
python -m build
python -m twine check dist/*`}
                language="bash"
                filename="terminal"
              />
            </section>

            {/* Return link */}
            <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <Link
                href="/"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                ← Return to Landing Page
              </Link>
              <div className="flex items-center gap-2">
                <a
                  href={effectivePypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors font-mono"
                >
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                  <span>PyPI Package</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
                <a
                  href={SITE_CONFIG.githubCoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
