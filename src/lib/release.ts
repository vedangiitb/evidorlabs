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
  testPypiUrl: string;
  changelog: ReleaseVersion[];
  recentCommits: GitCommitItem[];
  source: 'live' | 'cached' | 'fallback';
  fetchedAt: string;
}

// Fallback data if network is unavailable
export const FALLBACK_RELEASE_INFO: DynamicReleaseInfo = {
  version: '1.0.0-dev.3',
  publishedDate: '2026-09-28',
  testPypiUrl: 'https://test.pypi.org/project/evidor/',
  fetchedAt: new Date().toISOString(),
  source: 'fallback',
  changelog: [
    {
      version: 'v1.0.0-dev.3',
      date: '2026-09-28',
      sections: [
        {
          category: 'Features',
          items: [
            {
              text: 'Introduced tool primitives for integrating tool calls',
              commitHash: '9edbf58',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/9edbf58c74b6ea3c9b6a184227353e36a794ad54',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.0.0-dev.2',
      date: '2026-09-26',
      sections: [
        {
          category: 'Bug Fixes',
          items: [
            {
              text: 'Yml changes for adding missing dependencies',
              commitHash: '7130909',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/71309090357628c2d9c37977b19d8c9c13cd4882',
            },
          ],
        },
        {
          category: 'Chores',
          items: [
            {
              text: 'Readme updates and adding requirements file',
              commitHash: '9e9a28b',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/9e9a28b8e14db5c0a4f0b718fa97c8376f8d5199',
            },
            {
              text: 'Updated environment names',
              commitHash: '8d4b5ce',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/8d4b5ce10a664ba38673982e20f480ff677f3561',
            },
          ],
        },
        {
          category: 'Features',
          items: [
            {
              text: 'Context memory for longer chats',
              commitHash: '6103b4f',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/6103b4f91b83b80cc588c3a61cb5ab28041b21a5',
            },
          ],
        },
      ],
    },
    {
      version: 'v1.0.0-dev.1',
      date: '2026-09-25',
      sections: [
        {
          category: 'Chores',
          items: [
            {
              text: 'Added git yml',
              commitHash: 'd48c4f4',
              commitUrl: 'https://github.com/vedangiitb/evidor-core/commit/d48c4f491633669908b01b0b5437424c1bc6a4e1',
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
              text: 'Initial release of core provider-agnostic harness',
            },
          ],
        },
      ],
    },
  ],
  recentCommits: [
    {
      hash: '9edbf58c74b6ea3c9b6a184227353e36a794ad54',
      shortHash: '9edbf58',
      message: 'feat: introduced tool primitives for integrating tool calls',
      date: '2026-09-28',
      author: 'vedangiitb',
      url: 'https://github.com/vedangiitb/evidor-core/commit/9edbf58c74b6ea3c9b6a184227353e36a794ad54',
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

    // Match "v1.0.0-dev.3 (2026-09-28)" or "1.0.0 (2026-09-28)"
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

    versions.push({
      version: ver.startsWith('v') ? ver : `v${ver}`,
      date,
      sections,
    });
  }

  return versions;
}
