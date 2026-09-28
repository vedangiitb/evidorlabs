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
  ShieldAlert,
  GitBranch,
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
      { id: 'history-management', title: 'Inspecting & Resetting History' },
    ],
  },
  {
    category: 'Tools & Functions',
    items: [
      { id: 'tool-definition', title: 'Defining Tools with @tool' },
      { id: 'agent-tools', title: 'Equipping Agents with Tools' },
      { id: 'manual-tools', title: 'Manual Tool Definition' },
    ],
  },
  {
    category: 'Context Engine',
    items: [
      { id: 'context-management', title: 'Context Window & Limits' },
      { id: 'configurable-summarization', title: 'Configurable Summarization' },
    ],
  },
  {
    category: 'Low-level API',
    items: [
      { id: 'low-level-generation', title: 'Direct GenerationRequest' },
    ],
  },
  {
    category: 'Providers',
    items: [
      { id: 'supported-providers', title: 'Supported Adapters & Keys' },
      { id: 'custom-providers', title: 'Custom ModelProvider Protocol' },
    ],
  },
  {
    category: 'Release & Development',
    items: [
      { id: 'release-model', title: 'Development & Release Model' },
      { id: 'local-build', title: 'Local Build & Testing' },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const { version } = useReleaseInfo();

  return (
    <div className="pt-20 pb-20 min-h-screen bg-black text-white">
      {/* Top Banner: Status */}
      <div className="border-b border-zinc-800/80 bg-zinc-950 px-4 py-2 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>
              Pre-release documentation for <strong>evidor v{version.replace(/^v/, '')}</strong>. Available on TestPyPI.
            </span>
          </div>
          <a
            href={SITE_CONFIG.testPypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 hover:text-white"
          >
            <span>TestPyPI</span>
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
                Core harness API reference, configuration, and architectural usage patterns.
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
                href={SITE_CONFIG.githubCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
              <a
                href={SITE_CONFIG.testPypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 hover:text-white transition-colors font-mono"
              >
                <span>TestPyPI v{SITE_CONFIG.version}</span>
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
                Evidor is a minimal, provider-agnostic LLM harness written in Python. It provides a clean, unified interface for conversational agents across multiple model providers, with built-in context window management and automatic summarization.
              </p>

              <div className="p-4 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-zinc-400 leading-relaxed">
                <strong className="text-white block mb-1">Harness vs. Wrapper</strong>
                Unlike standard SDK wrappers that only normalize request formats, Evidor acts as an operational harness: orchestrating multi-turn history, tracking token budgets, running background summarization compaction, and preserving developer-defined system prompts across turn cycles.
              </div>
            </section>

            {/* 2. INSTALLATION */}
            <section id="installation" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Installation
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Install Evidor from TestPyPI with the provider adapter(s) needed for your stack:
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
                <span className="text-zinc-200 font-semibold">TestPyPI note:</span> If installing directly from TestPyPI during development, pass <code className="text-zinc-200">--index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/</code> to resolve external dependencies.
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
                Configure an initial system prompt when instantiating the <code className="text-zinc-200 font-mono">Agent</code>. Crucially, the system prompt is permanent—it is preserved across conversation compaction and history resets:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.systemPrompt}
                filename="system_prompt.py"
                language="python"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <strong className="text-white">Preservation guarantee:</strong> During context compaction, Evidor never compacts or deletes the system prompt. It remains anchored at the head of every request sent to the provider.
              </div>
            </section>

            {/* 6. CONTEXT MANAGEMENT & LIMITS */}
            <section id="context-management" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Context Window Management &amp; Compaction
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                The <code className="text-zinc-200 font-mono">Agent</code> automatically monitors and manages message history to stay within token and message limits using internal <code className="text-zinc-200 font-mono">ConversationContext</code>:
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
                        <td className="p-2.5">Maximum estimated token budget before compaction fires.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-white font-medium">max_messages</td>
                        <td className="p-2.5 text-zinc-300">50</td>
                        <td className="p-2.5 text-zinc-400">DEFAULT_MAX_MESSAGES</td>
                        <td className="p-2.5">Maximum conversation turns retained before compaction fires.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#09090b] border border-white/[0.08] space-y-1.5 text-xs text-zinc-400">
                <div className="font-semibold text-white">Compaction Mechanics:</div>
                <p>When conversation history exceeds either <code className="text-zinc-300">max_messages</code> or the token budget:</p>
                <ol className="list-decimal pl-5 space-y-1 text-zinc-400">
                  <li>Older conversation turns are selected and submitted to the summarization model.</li>
                  <li>The summary is injected as a bounded summary message: <code className="text-zinc-200 font-mono">Message(role=&quot;system&quot;, ..., is_summary=True)</code>.</li>
                  <li>The permanent system prompt remains at position 0.</li>
                  <li>Recent conversational turns remain intact for immediate context coherence.</li>
                </ol>
              </div>
            </section>

            {/* 7. CONFIGURABLE SUMMARIZATION */}
            <section id="configurable-summarization" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Configurable Summarization Model
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                By default, the agent uses its primary provider and model for background summarization during compaction. You can configure a specific model name string or pass an entirely separate <code className="text-zinc-200 font-mono">ModelProvider</code> instance:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.summarizationModel}
                filename="summarizer_options.py"
                language="python"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] space-y-1">
                  <div className="font-semibold text-white">Option 1: Model Name String</div>
                  <p className="text-zinc-500">
                    Uses the same provider client (e.g. OpenAI) but invokes a lightweight model (such as <code className="text-zinc-300">gpt-4.1-mini</code>) to keep summarization latency and cost low.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] space-y-1">
                  <div className="font-semibold text-white">Option 2: Separate ModelProvider</div>
                  <p className="text-zinc-500">
                    Routes background compaction tasks to an entirely different provider (e.g. fast Google Gemini Flash) while keeping your primary conversation on OpenAI or Anthropic.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. INSPECTING AND CLEARING HISTORY */}
            <section id="history-management" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Inspecting and Clearing History
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Inspect the retained conversation history or reset turns at any time using <code className="text-zinc-200 font-mono">agent.messages</code> and <code className="text-zinc-200 font-mono">agent.clear_history()</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.history}
                filename="history_methods.py"
                language="python"
              />

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <code className="text-zinc-200 font-mono">agent.clear_history()</code> resets conversational dialogue turns and compacted summaries, but preserves the original <code className="text-zinc-200 font-mono">system_prompt</code> intact.
              </div>
            </section>

            {/* TOOLS & FUNCTION CALLING */}
            <section id="tool-definition" className="space-y-3 scroll-mt-24">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                TOOLS &amp; FUNCTION CALLING
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Defining Tools with @tool
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Transform any standard Python function into a provider-neutral tool using the <code className="text-zinc-200 font-mono">@tool</code> decorator. Evidor automatically derives JSON Schema for arguments from Python type hints and extracts parameter descriptions from docstrings (supporting Google, Sphinx, and plain conventions):
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.toolDefinition}
                filename="tool_definition.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-zinc-400 space-y-1">
                <span className="font-semibold text-white">Schema Extraction:</span> Function arguments with default values are marked optional in the generated schema, while unassigned arguments are required. Custom tool names and descriptions can also be explicitly overridden using <code className="text-zinc-200 font-mono">@tool(name=&quot;...&quot;, description=&quot;...&quot;)</code>.
              </div>
            </section>

            <section id="agent-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Equipping Agents with Tools
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Pass tools directly into <code className="text-zinc-200 font-mono">Agent(..., tools=[...])</code>. When the model requests one or more tool calls, the agent automatically executes them, appends their outputs as <code className="text-zinc-200 font-mono">role=&quot;tool&quot;</code> messages, and loops until the model generates a final completed response:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.toolsQuickstart}
                filename="agent_tool_loop.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <span className="font-semibold text-white">Loop Control:</span> Use <code className="text-zinc-200 font-mono">max_tool_iterations</code> (default: <code className="text-zinc-200 font-mono">10</code>) to prevent runaway execution in complex multi-step reasoning tasks.
              </div>
            </section>

            <section id="manual-tools" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Manual &amp; Dynamic Tool Definition
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For dynamic tools or programmatic schemas without a static Python function signature, instantiate <code className="text-zinc-200 font-mono">Tool</code> directly:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.manualTool}
                filename="manual_tool.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-zinc-400">
                Evidor tool calling works transparently across <strong>OpenAI</strong>, <strong>Anthropic</strong>, and <strong>Gemini</strong>, normalizing schemas, arguments, and return types into a uniform execution flow.
              </div>
            </section>

            {/* 9. LOW-LEVEL GENERATION */}
            <section id="low-level-generation" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Low-level Generation with GenerationRequest
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For direct provider calls without stateful session management, instantiate messages and requests directly through <code className="text-zinc-200 font-mono">GenerationRequest</code> and <code className="text-zinc-200 font-mono">Message</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.lowLevel}
                filename="low_level_generation.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs space-y-1.5">
                <div className="font-semibold text-white">Primitive Objects:</div>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong className="text-zinc-200">Message</strong>: Immutable data class with <code className="text-zinc-300">role</code>, <code className="text-zinc-300">content</code>, and <code className="text-zinc-300">is_summary</code> flag.</li>
                  <li><strong className="text-zinc-200">GenerationRequest</strong>: Container holding <code className="text-zinc-300">messages</code> list or single <code className="text-zinc-300">prompt</code> string.</li>
                  <li><strong className="text-zinc-200">GenerationResponse</strong>: Standardized result containing <code className="text-zinc-300">text</code> and source <code className="text-zinc-300">model</code> name.</li>
                </ul>
              </div>
            </section>

            {/* 10. SUPPORTED PROVIDERS */}
            <section id="supported-providers" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Supported Providers &amp; Credentials
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor adapters read standard environment variables or accept explicit <code className="text-zinc-200 font-mono">api_key</code> arguments:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border border-white/[0.08] rounded-md overflow-hidden">
                  <thead className="bg-[#09090b] text-zinc-300 border-b border-white/[0.08]">
                    <tr>
                      <th className="p-2.5 text-left font-medium">Provider Class</th>
                      <th className="p-2.5 text-left font-medium">Example Model</th>
                      <th className="p-2.5 text-left font-medium">Environment Variable</th>
                      <th className="p-2.5 text-left font-medium">Package Extra</th>
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
            </section>

            {/* 11. CUSTOM PROVIDERS */}
            <section id="custom-providers" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Custom Provider Support (ModelProvider Protocol)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                The <code className="text-zinc-200 font-mono">Agent</code> depends only on the <code className="text-zinc-200 font-mono">ModelProvider</code> protocol. To support any proprietary LLM, local Ollama/vLLM instance, or self-hosted endpoint, implement <code className="text-zinc-200 font-mono">generate(request)</code> and <code className="text-zinc-200 font-mono">with_model(model)</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.customProvider}
                filename="custom_provider.py"
                language="python"
              />
            </section>

            {/* 12. RELEASE MODEL & SEMVER */}
            <section id="release-model" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-zinc-400" />
                <span>Development &amp; Release Model</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evidor employs an automated release pipeline powered by GitHub Actions and <strong className="text-white">python-semantic-release</strong> with Conventional Commits:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-zinc-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>dev Branch → TestPyPI</span>
                  </div>
                  <p className="text-zinc-500 leading-relaxed">
                    Pushes and merged pull requests to <code className="text-zinc-300">dev</code> automatically build and publish prerelease versions with the token <code className="text-zinc-300 font-mono">-dev.N</code> (e.g. <code className="text-zinc-200 font-mono">v{version.replace(/^v/, '')}</code>) to TestPyPI.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.08] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-zinc-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>main Branch → PyPI</span>
                  </div>
                  <p className="text-zinc-500 leading-relaxed">
                    Pushes and releases merged to <code className="text-zinc-300">main</code> publish official production versions directly to PyPI via trusted publishing.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  Conventional Commit Version Rules:
                </h4>
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-white font-medium">fix: ...</span>
                    <span className="text-zinc-500">Increments PATCH version (e.g. 1.0.0 → 1.0.1)</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-white font-medium">feat: ...</span>
                    <span className="text-zinc-500">Increments MINOR version (e.g. 1.0.0 → 1.1.0)</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-white font-medium">feat!: ... or BREAKING CHANGE:</span>
                    <span className="text-zinc-500">Increments MAJOR version (e.g. 1.0.0 → 2.0.0)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                <strong>Current Status:</strong> The current active distribution is <code className="text-white font-mono">v{version.replace(/^v/, '')}</code>, published on TestPyPI for development and exploratory testing.
              </div>
            </section>

            {/* 13. LOCAL BUILD & TEST */}
            <section id="local-build" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Local Build &amp; Testing
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                To build distributable artifacts and run the test suite locally in <code className="text-zinc-200 font-mono">evidor-core</code>:
              </p>

              <CodeBlock
                code={`# Install in editable mode with development dependencies
python -m pip install -e ".[dev]"

# Run test suite with pytest and coverage reporting
python -m pytest

# Build wheel and sdist packages using Hatchling
python -m build

# Validate generated distributions
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
              <a
                href={SITE_CONFIG.githubCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
