export interface ChangelogItem {
  text: string;
  commitHash?: string;
  commitUrl?: string;
}

export interface ChangelogSection {
  category: string;
  items: ChangelogItem[];
}

export interface ReleaseVersion {
  version: string;
  date: string;
  sections: ChangelogSection[];
}

export interface GitCommitItem {
  hash: string;
  shortHash: string;
  message: string;
  date: string;
  author: string;
  url: string;
}

export interface DynamicReleaseInfo {
  version: string;
  publishedDate?: string;
  pypiUrl: string;
  testPypiUrl?: string; // Legacy alias
  changelog: ReleaseVersion[];
  recentCommits: GitCommitItem[];
  source: 'live' | 'cached' | 'fallback';
  fetchedAt: string;
}

// Fallback data reflecting the published PyPI package (v1.10.1)
export const FALLBACK_RELEASE_INFO: DynamicReleaseInfo = {
  version: '1.10.1',
  publishedDate: '2026-10-20',
  pypiUrl: 'https://pypi.org/project/evidor/',
  testPypiUrl: 'https://pypi.org/project/evidor/',
  fetchedAt: new Date().toISOString(),
  source: 'fallback',
  changelog: [
    {
      version: 'v1.10.1',
      date: '2026-10-20',
      sections: [
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Fix Gemini streaming empty message and TTFT latency calculation issues',
              commitHash: 'ff00671',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/ff006712848fc54b487d69860313d8506569f8fd',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.10.0',
      date: '2026-10-20',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Token streaming engine across OpenAI, Anthropic, and Gemini via stream=True',
              commitHash: 'fb5b58f',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/fb5b58fb2940ff9f9e29634ecc9614a3b9e3f5ff',
            },
            {
              text: 'Streaming intermediate reasoning/thought tokens via chunk.thinking',
              commitHash: 'fdb1992',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/fdb199243d3df645f3bbbdbdecef6460d67d6104',
            },
            {
              text: 'Real-time tool invocation indicators in streams via chunk.tool_calls with silent argument accumulation',
              commitHash: '2c89965',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/2c8996576388d2c2efb8a885ba0c45f0debafa70',
            },
            {
              text: 'Precise time_to_first_token_ms (TTFT) tracking and zero-flooding boundary telemetry',
              commitHash: '21b8a97',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/21b8a97bf0b33001e2aa81a9e701d6887c165854',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.9.1',
      date: '2026-10-19',
      sections: [
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Telemetry: add missing cached token count to Phoenix sink',
              commitHash: '536d1fe',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/536d1fed12a37bbc8bb96d008d0530daf578e918',
            },
            {
              text: 'MCP: clean up unused dependencies and connection guards',
              commitHash: 'c42cfc3',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/c42cfc3039fa2fcf05b045680674508036dde710',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.9.0',
      date: '2026-10-19',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Persistent connection pooling: internal daemon event loop reuses HTTP/2 connections across turns',
              commitHash: 'd89840a',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/d89840ad6b8cead1b0e9aa4d5e66209f4991b4d7',
            },
            {
              text: 'Eliminate TCP/TLS handshake latency on subsequent turns without tearing down sockets between calls',
              commitHash: 'ef15b9a',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/ef15b9a428591881a96a8265fb6363974abaf7b0',
            },
          ],
        },
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Fix client connection caching in multi-turn agent sessions',
              commitHash: '0984fa9',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/0984fa9193284e69c2e3132b1757776dfdbdbb09',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.8.0',
      date: '2026-10-17',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Async-first execution engine: native send_async, provider generate_async, and async tools without thread hops',
              commitHash: '85e9800',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/85e9800b591312bf2a36023a7c2b0ac4364d2ca6',
            },
            {
              text: 'Concurrent multi-tool execution via asyncio.gather() when model emits multiple calls in a single turn',
              commitHash: 'cb3e4e1',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/cb3e4e1a0a396b75715962b85e47434ba76d2f01',
            },
            {
              text: 'Event loop guards: synchronous calls in active event loops raise explicit RuntimeError immediately',
              commitHash: '9ebac60',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/9ebac601717a12e08395ab67fd17490809c93b16',
            },
            {
              text: 'Two execution paradigms: stateful conversations (Agent) and direct stateless calls (provider.generate)',
              commitHash: 'ea58896',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/ea58896',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.7.1',
      date: '2026-10-16',
      sections: [
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Enable native provider context compaction for OpenAI and Anthropic Claude via compact_threshold',
              commitHash: 'f09c398',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/f09c398c0294ff97aebf5a93416a7d95b9251136',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.7.0',
      date: '2026-10-16',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Update agent providers to modern SDKs: OpenAI Responses API and Google Gemini Interactions API',
              commitHash: '167a886',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/167a88638a998cd13c4281a5c76b1f5349268d9d',
            },
            {
              text: 'Server-side context chaining: previous_response_id for OpenAI and previous_interaction_id for Gemini',
              commitHash: 'c39dfbb',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/c39dfbb6cebe3bef3f7cc6f75681aa34a70df368',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.6.3',
      date: '2026-10-15',
      sections: [
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Cryptographic thought signature persistence and replaying for Anthropic and Gemini multi-turn reasoning',
              commitHash: 'd8886c2',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/d8886c22fd0f36e72d889e39dc86dd1fd1360dc2',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.6.0',
      date: '2026-10-13',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Ephemeral prompt caching (cache_control={"type": "ephemeral"}) with telemetry tracking for Anthropic Claude',
              commitHash: '172ff90',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/172ff90b198b56e5e908e316f0b4dc13e1313c97',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.5.0',
      date: '2026-10-12',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Added read_webpage HTML cleaning tool and in-memory EvidenceStore for research agents',
              commitHash: '37b2c31',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/37b2c314ad5bbd132c69c9795c1e9f117be5aff9',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.4.0',
      date: '2026-10-10',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Decoupled telemetry actor runtime (<1µs overhead) with OpenTelemetry, Langfuse, Phoenix, and Prometheus adapters',
              commitHash: '124deb0',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/124deb0531985b1a2a781c395db5db177bd38e33',
            },
            {
              text: 'Privacy and PII protection mode with sink-level capture_content=False',
              commitHash: '6ae868f',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/6ae868f37c7c3916760bcdd55173b6ebbe800f61',
            },
            {
              text: 'Python 3.14 official support',
              commitHash: '83cfe8e',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/83cfe8e158a564bd950266b7f265f5d0ba0f55fe',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.3.0',
      date: '2026-10-08',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'First-class Model Context Protocol (MCP) integration (stdio, Streamable HTTP, SSE)',
              commitHash: '44ad88d',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/44ad88d1b03e0923fc0f7a47fd1ec9d1ec3ff7c0',
            },
            {
              text: 'Agent mcp_servers and shared mcp_client support for multi-agent applications',
              commitHash: '843ab00',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/843ab00f54f5d95c235f86abbde328bd6523b542',
            },
          ],
        },
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Parallel connectivity to MCP for synchronous process execution',
              commitHash: '83a4173',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/83a417343721f6e1a9da73cdb5dd3290b91a7392',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.2.0',
      date: '2026-10-04',
      sections: [
        {
          category: 'Release',
          items: [
            {
              text: 'Published stable release on PyPI with web search, filesystem tools, and async runtime',
              commitHash: 'c04fc45',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/c04fc45',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.1.0',
      date: '2026-10-04',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Web search tool integration (Tavily, Exa, Brave adapters via standard library)',
              commitHash: 'e5f051b',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/e5f051b6b53ba14237f9aab4254715c36a68dcf8',
            },
            {
              text: 'Scoped filesystem tools (list, read, search, create, write, delete)',
              commitHash: 'ccc0ef9',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/ccc0ef94e14c0f1dd1f89db14aefd21d1a658a5d',
            },
            {
              text: 'Built-in calculator and current time tools',
              commitHash: '6fb96c2',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/6fb96c2c83fc50eb51728d7811b671f05ea32382',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.0.0',
      date: '2026-09-30',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Stable release with tool primitives (@tool, Tool, execution loop)',
              commitHash: 'ccb21cb',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/ccb21cbc821b2f65ea8eedfae7de556c8c8f4073',
            },
            {
              text: 'Async agent conversations (send_async) and async tool execution loops',
              commitHash: '5ad1759',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/5ad1759bd66198db6d34ef7742b300e0ff582cfd',
            },
          ],
        },
      ],
    },
  ],
  recentCommits: [
    {
      hash: 'cb6572a',
      shortHash: 'cb6572a',
      message: '1.4.0',
      date: '2026-10-10',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/cb6572a',
    },
    {
      hash: 'c93a8efd766446a2fce8e90a9a13be1c791ccb26',
      shortHash: 'c93a8ef',
      message: 'fix(retry): harden llm retry policies, async backoff, and telemetry coordination',
      date: '2026-10-10',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/c93a8efd766446a2fce8e90a9a13be1c791ccb26',
    },
    {
      hash: '2ed8f12ee8ff8e9c44f58501a898b05c656e7325',
      shortHash: '2ed8f12',
      message: 'feat(agent): added configurable agent retries',
      date: '2026-10-10',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/2ed8f12ee8ff8e9c44f58501a898b05c656e7325',
    },
    {
      hash: '6ae868f37c7c3916760bcdd55173b6ebbe800f61',
      shortHash: '6ae868f',
      message: 'feat(telemetry): add sink-level capture_content option for PII protection',
      date: '2026-10-09',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/6ae868f37c7c3916760bcdd55173b6ebbe800f61',
    },
    {
      hash: '188fa50ec176e96e30708f51149e87adf9a79e25',
      shortHash: '188fa50',
      message: 'feat(telemetry): add Langfuse, Arize Phoenix, and Prometheus adapters',
      date: '2026-10-09',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/188fa50ec176e96e30708f51149e87adf9a79e25',
    },
    {
      hash: '44ad88d1b03e0923fc0f7a47fd1ec9d1ec3ff7c0',
      shortHash: '44ad88d',
      message: 'feat(mcp): mcp integration',
      date: '2026-10-06',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/44ad88d1b03e0923fc0f7a47fd1ec9d1ec3ff7c0',
    },
  ],
};

export function parseChangelogMarkdown(markdown: string): ReleaseVersion[] {
  const versions: ReleaseVersion[] = [];
  const versionBlocks = markdown.split(/^##\s+/m);

  for (let i = 1; i < versionBlocks.length; i++) {
    const block = versionBlocks[i].trim();
    const lines = block.split('\n');
    const headerLine = lines[0].trim();

    // Match "v1.4.0 (2026-10-10)" or "1.4.0 (2026-10-10)"
    const headerMatch = headerLine.match(/^(v?[\w.-]+)(?:\s*\(([\d-]+)\))?/);
    const ver = headerMatch ? headerMatch[1] : headerLine;
    const date = headerMatch && headerMatch[2] ? headerMatch[2] : '';

    const sections: ChangelogSection[] = [];
    let currentCategory = 'General';
    let currentItems: ChangelogItem[] = [];

    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();
      if (!line) continue;

      if (line.startsWith('### ')) {
        if (currentItems.length > 0) {
          sections.push({ category: currentCategory, items: currentItems });
          currentItems = [];
        }
        currentCategory = line.replace('### ', '').trim();
      } else if (line.startsWith('- ')) {
        const fullItemText = line.substring(2).trim();

        // Extract commit hash and link if present: ([`9edbf58`](https://...))
        const commitMatch = fullItemText.match(/\(\[`([a-f0-9]+)`\]\((https?:\/\/[^\)]+)\)\)/);
        const textWithoutCommit = fullItemText
          .replace(/\(\[`[a-f0-9]+`\]\([^\)]+\)\)/, '')
          .trim();

        currentItems.push({
          text: textWithoutCommit || fullItemText,
          commitHash: commitMatch ? commitMatch[1] : undefined,
          commitUrl: commitMatch ? commitMatch[2] : undefined,
        });
      }
    }

    if (currentItems.length > 0) {
      sections.push({ category: currentCategory, items: currentItems });
    }

    // Skip empty version headers with no sections
    if (sections.length > 0) {
      versions.push({
        version: ver.startsWith('v') ? ver : `v${ver}`,
        date,
        sections,
      });
    }
  }

  return versions;
}
