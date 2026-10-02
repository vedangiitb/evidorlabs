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

// Fallback data reflecting the published PyPI package
export const FALLBACK_RELEASE_INFO: DynamicReleaseInfo = {
  version: '1.2.0',
  publishedDate: '2026-10-04',
  pypiUrl: 'https://pypi.org/project/evidor/',
  testPypiUrl: 'https://pypi.org/project/evidor/',
  fetchedAt: new Date().toISOString(),
  source: 'fallback',
  changelog: [
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
        {
          category: 'Documentation',
          items: [
            {
              text: 'Documentation updates for web search and filesystem tools',
              commitHash: 'f07d47f',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/f07d47f7f988d2e0751fd4981ef94160d09f48da',
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
    {
      version: 'v0.1.0',
      date: '2026-09-25',
      sections: [
        {
          category: 'Initial Release',
          items: [
            {
              text: 'Initial release of provider-agnostic agent harness with context compaction',
            },
          ],
        },
      ],
    },
  ],
  recentCommits: [
    {
      hash: 'c04fc45',
      shortHash: 'c04fc45',
      message: '1.2.0',
      date: '2026-10-04',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/c04fc45',
    },
    {
      hash: 'f07d47f7f988d2e0751fd4981ef94160d09f48da',
      shortHash: 'f07d47f',
      message: 'docs(tools): doc updates for web search tool',
      date: '2026-10-04',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/f07d47f7f988d2e0751fd4981ef94160d09f48da',
    },
    {
      hash: 'e5f051b6b53ba14237f9aab4254715c36a68dcf8',
      shortHash: 'e5f051b',
      message: 'feat(tools): web search tool',
      date: '2026-10-04',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/e5f051b6b53ba14237f9aab4254715c36a68dcf8',
    },
    {
      hash: 'ccc0ef94e14c0f1dd1f89db14aefd21d1a658a5d',
      shortHash: 'ccc0ef9',
      message: 'feat: adding fs tools',
      date: '2026-10-04',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/ccc0ef94e14c0f1dd1f89db14aefd21d1a658a5d',
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

    // Match "v1.2.0 (2026-10-04)" or "1.2.0 (2026-10-04)"
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
