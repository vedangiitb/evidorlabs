'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, CODE_EXAMPLES } from '@/lib/constants';
import { CodeBlock } from '@/components/CodeBlock';
import { GithubIcon } from '@/components/GithubIcon';
import {
  Terminal,
  Cpu,
  Sparkles,
  ExternalLink,
  BookOpen,
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

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#07080b]">
      {/* Top Banner Warning: Under Development */}
      <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-mono text-amber-300">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              Pre-release documentation for <strong>evidor v{SITE_CONFIG.version}</strong>. Available on TestPyPI. Not yet general availability.
            </span>
          </div>
          <a
            href={SITE_CONFIG.testPypiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 underline hover:text-white"
          >
            <span>TestPyPI</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: Table of Contents */}
          {/* ========================================================================= */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 self-start space-y-6">
            <div className="p-4 rounded-xl bg-[#090b12] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Documentation</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Core harness API reference, configuration, and architectural usage patterns.
              </p>
            </div>

            <nav className="space-y-6 text-sm">
              {DOCS_SECTIONS.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-2">
                    {group.category}
                  </h4>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            onClick={() => setActiveSection(item.id)}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isActive
                                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span>{item.title}</span>
                            {isActive && <ChevronRight className="w-3 h-3 text-sky-400" />}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Quick links box */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={SITE_CONFIG.githubCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href={SITE_CONFIG.testPypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-sky-950/30 hover:bg-sky-950/50 border border-sky-500/20 text-xs text-sky-300 transition-all font-mono"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>TestPyPI v{SITE_CONFIG.version}</span>
                </div>
                <ExternalLink className="w-3 h-3 text-sky-400" />
              </a>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* MAIN DOCUMENTATION CONTENT */}
          {/* ========================================================================= */}
          <main className="lg:col-span-9 space-y-16 text-slate-300">
            {/* 1. OVERVIEW */}
            <section id="overview" className="space-y-4 scroll-mt-28">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 font-mono text-xs">
                <span>GETTING STARTED</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Evidor Documentation
              </h1>
              <p className="text-base text-slate-300 leading-relaxed">
                Evidor is a minimal, provider-agnostic LLM harness written in Python. It provides a clean, unified interface for conversational agents across multiple model providers, with built-in context window management and automatic summarization.
              </p>

              <div className="p-4 rounded-xl bg-[#090b12] border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-0.5">Harness vs. Wrapper</strong>
                  Unlike standard SDK wrappers that only normalize request formats, Evidor acts as an operational harness: orchestrating multi-turn history, tracking token budgets, running background summarization compaction, and preserving developer-defined system prompts across turn cycles.
                </div>
              </div>
            </section>

            {/* 2. INSTALLATION */}
            <section id="installation" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Installation</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Install Evidor from TestPyPI with the provider adapter(s) needed for your stack:
              </p>

              <div className="space-y-3">
                <CodeBlock
                  code={`# Install with OpenAI adapter
pip install "evidor[openai]"

# Install with Anthropic adapter
pip install "evidor[anthropic]"

# Install with Google Gemini adapter
pip install "evidor[gemini]"

# Install all supported provider dependencies
pip install "evidor[all]"

# Install development & test dependencies (pytest, build, twine)
pip install "evidor[dev]"`}
                  language="bash"
                  filename="terminal"
                />
              </div>

              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 text-xs font-mono text-slate-400">
                <span className="text-amber-400 font-semibold">TestPyPI Note:</span> If installing directly from TestPyPI during development, pass <code className="text-sky-300">--index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/</code> to resolve external dependencies.
              </div>
            </section>

            {/* 3. QUICKSTART */}
            <section id="quickstart" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Quickstart
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Create an <code className="text-sky-300 font-mono">Agent</code> with any provider and send a message. The Agent manages session state, message formatting, and returns a structured response:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.quickstart}
                filename="quickstart.py"
                language="python"
              />

              <div className="text-xs text-slate-400 leading-relaxed">
                Response objects expose <code className="text-sky-300 font-mono">response.text</code> (the generated assistant response string) and <code className="text-sky-300 font-mono">response.model</code> (the model identifier that served the generation).
              </div>
            </section>

            {/* 4. MULTI-TURN CONVERSATIONS */}
            <section id="multi-turn" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Multi-turn Conversations
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                The <code className="text-sky-300 font-mono">Agent</code> maintains session state across conversation turns. Consecutive calls to <code className="text-sky-300 font-mono">send()</code> automatically append to the internal conversation context:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.multiTurn}
                filename="multi_turn_example.py"
                language="python"
              />

              <p className="text-xs text-slate-400">
                Every <code className="text-sky-300 font-mono">agent.send()</code> call automatically bundles the history of user queries and assistant responses according to the underlying provider protocol.
              </p>
            </section>

            {/* 5. SYSTEM PROMPTS */}
            <section id="system-prompts" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                System Prompts
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Configure an initial system prompt when instantiating the <code className="text-sky-300 font-mono">Agent</code>. Crucially, the system prompt is permanent—it is preserved across conversation compaction and history resets:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.systemPrompt}
                filename="system_prompt_example.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-sky-950/20 border border-sky-500/20 text-xs text-sky-200">
                <strong>Guaranteed Preservation:</strong> During context compaction, Evidor never compacts or deletes the system prompt. It remains as the foundational anchor at the head of every request sent to the provider.
              </div>
            </section>

            {/* 6. CONTEXT MANAGEMENT & LIMITS */}
            <section id="context-management" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Context Window Management &amp; Compaction
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                The <code className="text-sky-300 font-mono">Agent</code> automatically monitors and manages message history to stay within token and message limits using internal <code className="text-sky-300 font-mono">ConversationContext</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.contextManagement}
                filename="context_config.py"
                language="python"
              />

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-white">Default Parameters:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono border border-white/10 rounded-lg overflow-hidden">
                    <thead className="bg-white/5 text-slate-300 border-b border-white/10">
                      <tr>
                        <th className="p-2.5 text-left">Parameter</th>
                        <th className="p-2.5 text-left">Default Value</th>
                        <th className="p-2.5 text-left">Constant Name</th>
                        <th className="p-2.5 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-400">
                      <tr>
                        <td className="p-2.5 text-sky-300">context_window</td>
                        <td className="p-2.5 text-white">16_000</td>
                        <td className="p-2.5 text-slate-300">DEFAULT_CONTEXT_WINDOW</td>
                        <td className="p-2.5">Maximum estimated token budget before compaction fires.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-sky-300">max_messages</td>
                        <td className="p-2.5 text-white">50</td>
                        <td className="p-2.5 text-slate-300">DEFAULT_MAX_MESSAGES</td>
                        <td className="p-2.5">Maximum conversation turns retained before compaction fires.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090b12] border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="font-semibold text-white">Compaction Mechanics:</div>
                <p>When conversation history exceeds either <code className="text-sky-300">max_messages</code> or the token budget:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-400">
                  <li>Older conversation turns are selected and submitted to the summarization model.</li>
                  <li>The summary is injected as a bounded summary message: <code className="text-emerald-400 font-mono">Message(role=&quot;system&quot;, ..., is_summary=True)</code>.</li>
                  <li>The permanent system prompt remains at position 0.</li>
                  <li>Recent conversational turns remain completely intact for immediate multi-turn conversational coherence.</li>
                </ol>
              </div>
            </section>

            {/* 7. CONFIGURABLE SUMMARIZATION */}
            <section id="configurable-summarization" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Configurable Summarization Model
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                By default, the agent uses its primary provider and model for background summarization during compaction. You can configure a specific model name string or pass an entirely separate <code className="text-sky-300 font-mono">ModelProvider</code> instance:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.summarizationModel}
                filename="summarizer_options.py"
                language="python"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="font-bold text-white">Option 1: Model Name String</div>
                  <p className="text-slate-400">
                    Uses the same provider client (e.g. OpenAI) but invokes a lightweight model (such as <code className="text-sky-300">gpt-4.1-mini</code>) to keep summarization latency low.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="font-bold text-white">Option 2: Separate ModelProvider</div>
                  <p className="text-slate-400">
                    Routes background compaction tasks to an entirely different provider (e.g. fast Google Gemini Flash) while keeping your primary conversation on OpenAI or Anthropic.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. INSPECTING AND CLEARING HISTORY */}
            <section id="history-management" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Inspecting and Clearing History
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                You can inspect the retained conversation history or reset turns at any time using <code className="text-sky-300 font-mono">agent.messages</code> and <code className="text-sky-300 font-mono">agent.clear_history()</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.history}
                filename="inspect_history.py"
                language="python"
              />

              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 text-xs text-slate-400">
                <code className="text-sky-300 font-mono">agent.clear_history()</code> resets conversational dialogue turns and compacted summaries, but preserves the original <code className="text-sky-300 font-mono">system_prompt</code> intact.
              </div>
            </section>

            {/* 9. LOW-LEVEL GENERATION */}
            <section id="low-level-generation" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Low-level Generation with GenerationRequest
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                For direct provider calls without stateful session management, instantiate messages and requests directly through <code className="text-sky-300 font-mono">GenerationRequest</code> and <code className="text-sky-300 font-mono">Message</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.lowLevel}
                filename="low_level_generation.py"
                language="python"
              />

              <div className="p-4 rounded-xl bg-[#090b12] border border-white/10 text-xs space-y-2">
                <div className="font-semibold text-white">Primitive Objects:</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li><strong className="text-slate-200">Message</strong>: Immutable data class with <code className="text-sky-300">role</code> (e.g. &quot;system&quot;, &quot;user&quot;, &quot;assistant&quot;), <code className="text-sky-300">content</code>, and <code className="text-sky-300">is_summary</code> flag.</li>
                  <li><strong className="text-slate-200">GenerationRequest</strong>: Container holding <code className="text-sky-300">messages</code> list or single <code className="text-sky-300">prompt</code> string.</li>
                  <li><strong className="text-slate-200">GenerationResponse</strong>: Standardized result containing <code className="text-sky-300">text</code> and source <code className="text-sky-300">model</code> name.</li>
                </ul>
              </div>
            </section>

            {/* 10. SUPPORTED PROVIDERS */}
            <section id="supported-providers" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Supported Providers &amp; Credentials
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Evidor adapters automatically read standard environment variables or accept explicit <code className="text-sky-300 font-mono">api_key</code> arguments:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border border-white/10 rounded-lg overflow-hidden">
                  <thead className="bg-white/5 text-slate-300 border-b border-white/10">
                    <tr>
                      <th className="p-2.5 text-left">Provider Class</th>
                      <th className="p-2.5 text-left">Example Model</th>
                      <th className="p-2.5 text-left">Environment Variable</th>
                      <th className="p-2.5 text-left">Package Extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-400">
                    <tr>
                      <td className="p-2.5 text-sky-300 font-semibold">OpenAIProvider</td>
                      <td className="p-2.5 text-slate-300">gpt-4.1-mini</td>
                      <td className="p-2.5 text-amber-300">OPENAI_API_KEY</td>
                      <td className="p-2.5">evidor[openai]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-indigo-300 font-semibold">AnthropicProvider</td>
                      <td className="p-2.5 text-slate-300">claude-3-5-sonnet-20241022</td>
                      <td className="p-2.5 text-amber-300">ANTHROPIC_API_KEY</td>
                      <td className="p-2.5">evidor[anthropic]</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-emerald-300 font-semibold">GeminiProvider</td>
                      <td className="p-2.5 text-slate-300">gemini-2.5-flash</td>
                      <td className="p-2.5 text-amber-300">GEMINI_API_KEY</td>
                      <td className="p-2.5">evidor[gemini]</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 text-xs text-slate-400">
                You can also pass API keys explicitly in code: <code className="text-sky-300 font-mono">OpenAIProvider(model=&quot;gpt-4.1-mini&quot;, api_key=&quot;sk-...&quot;)</code>.
              </div>
            </section>

            {/* 11. CUSTOM PROVIDERS */}
            <section id="custom-providers" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Custom Provider Support (ModelProvider Protocol)
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                The <code className="text-sky-300 font-mono">Agent</code> depends only on the <code className="text-sky-300 font-mono">ModelProvider</code> protocol. To support any proprietary LLM, local Ollama/vLLM instance, or self-hosted endpoint, implement <code className="text-sky-300 font-mono">generate(request)</code> and <code className="text-sky-300 font-mono">with_model(model)</code>:
              </p>

              <CodeBlock
                code={CODE_EXAMPLES.customProvider}
                filename="custom_provider.py"
                language="python"
              />
            </section>

            {/* 12. RELEASE MODEL & SEMVER */}
            <section id="release-model" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-sky-400" />
                <span>Development &amp; Release Model</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Evidor employs an automated release pipeline powered by GitHub Actions and <strong className="text-white">python-semantic-release</strong> with Conventional Commits:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#090b12] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>dev Branch → TestPyPI</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Pushes and merged pull requests to the <code className="text-sky-300">dev</code> branch automatically build and publish prerelease versions with the token <code className="text-amber-300 font-mono">-dev.N</code> (e.g. <code className="text-slate-200 font-mono">v1.0.0-dev.2</code>) to TestPyPI.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#090b12] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>main Branch → PyPI</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Pushes and releases merged to the <code className="text-sky-300">main</code> branch publish official production versions directly to PyPI via trusted publishing.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Conventional Commit Version Rules:
                </h4>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-emerald-400 font-bold">fix: ...</span>
                    <span className="text-slate-400">Increments PATCH version (e.g. 1.0.0 → 1.0.1)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-sky-400 font-bold">feat: ...</span>
                    <span className="text-slate-400">Increments MINOR version (e.g. 1.0.0 → 1.1.0)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-red-400 font-bold">feat!: ... or BREAKING CHANGE:</span>
                    <span className="text-slate-400">Increments MAJOR version (e.g. 1.0.0 → 2.0.0)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <strong>Current Status:</strong> The current active distribution is <code className="text-white font-mono">v1.0.0-dev.2</code>, published on TestPyPI for development and exploratory testing.
              </div>
            </section>

            {/* 13. LOCAL BUILD & TEST */}
            <section id="local-build" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Local Build &amp; Testing
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                To build distributable artifacts and run the test suite locally in <code className="text-sky-300 font-mono">evidor-core</code>:
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

            {/* Bottom Nav / Next steps */}
            <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/"
                className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5"
              >
                ← Return to Landing Page
              </Link>
              <a
                href={SITE_CONFIG.githubCoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
