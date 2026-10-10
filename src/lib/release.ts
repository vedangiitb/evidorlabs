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

// Fallback data reflecting the published PyPI package (v1.4.0)
export const FALLBACK_RELEASE_INFO: DynamicReleaseInfo = {
  version: '1.4.0',
  publishedDate: '2026-10-10',
  pypiUrl: 'https://pypi.org/project/evidor/',
  testPypiUrl: 'https://pypi.org/project/evidor/',
  fetchedAt: new Date().toISOString(),
  source: 'fallback',
  changelog: [
    {
      version: 'v1.4.0',
      date: '2026-10-10',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Configurable agent LLM retries with exponential backoff, jitter, and Retry-After support',
              commitHash: '2ed8f12',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/2ed8f12ee8ff8e9c44f58501a898b05c656e7325',
            },
            {
              text: 'Decoupled telemetry & observability actor runtime (<1µs latency on agent thread)',
              commitHash: '124deb0',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/124deb0531985b1a2a781c395db5db177bd38e33',
            },
            {
              text: 'Observability adapters for OpenTelemetry, Langfuse, Arize Phoenix, and Prometheus',
              commitHash: '188fa50',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/188fa50ec176e96e30708f51149e87adf9a79e25',
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
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Harden LLM retry policies, async backoff, and telemetry coordination',
              commitHash: 'c93a8ef',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/c93a8efd766446a2fce8e90a9a13be1c791ccb26',
            },
            {
              text: 'Guarantee telemetry queue draining on shutdown and in-flight flush synchronization',
              commitHash: '6d20487',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/6d204878a24ac8f52652b4dd077c071d6154f9a8',
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
