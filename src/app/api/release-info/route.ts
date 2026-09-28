import { NextResponse } from 'next/server';
import {
  DynamicReleaseInfo,
  FALLBACK_RELEASE_INFO,
  parseChangelogMarkdown,
  GitCommitItem,
  ReleaseVersion,
} from '@/lib/release';

export const revalidate = 120; // Revalidate at most every 2 minutes

function normalizeVersion(versionStr: string): string {
  // Turn "1.0.0.dev3" into "1.0.0-dev.3"
  const devMatch = versionStr.match(/^(\d+\.\d+\.\d+)\.dev(\d+)$/i);
  if (devMatch) {
    return `${devMatch[1]}-dev.${devMatch[2]}`;
  }
  return versionStr;
}

export async function GET() {
  let version = FALLBACK_RELEASE_INFO.version;
  let publishedDate = FALLBACK_RELEASE_INFO.publishedDate;
  let changelog: ReleaseVersion[] = FALLBACK_RELEASE_INFO.changelog;
  let recentCommits: GitCommitItem[] = FALLBACK_RELEASE_INFO.recentCommits;
  let isLive = false;

  // 1. Fetch latest version from TestPyPI
  try {
    const pypiRes = await fetch('https://test.pypi.org/pypi/evidor/json', {
      next: { revalidate: 120 },
      headers: { Accept: 'application/json' },
    });

    if (pypiRes.ok) {
      const pypiData = await pypiRes.json();
      const rawVersion = pypiData?.info?.version;
      if (rawVersion) {
        version = normalizeVersion(rawVersion);
        isLive = true;

        // Extract upload date if present
        const releaseFiles = pypiData.releases?.[rawVersion];
        if (Array.isArray(releaseFiles) && releaseFiles.length > 0) {
          const uploadTime =
            releaseFiles[0].upload_time_iso_8601 || releaseFiles[0].upload_time;
          if (uploadTime) {
            publishedDate = uploadTime.split('T')[0];
          }
        }
      }
    }
  } catch (err) {
    console.warn('Failed to fetch version from TestPyPI:', err);
  }

  // 2. Fetch CHANGELOG.md from GitHub raw (dev branch, fallback to main)
  try {
    let changelogRes = await fetch(
      'https://raw.githubusercontent.com/vedangiitb/evidor-core/dev/CHANGELOG.md',
      { next: { revalidate: 120 } }
    );

    if (!changelogRes.ok) {
      changelogRes = await fetch(
        'https://raw.githubusercontent.com/vedangiitb/evidor-core/main/CHANGELOG.md',
        { next: { revalidate: 120 } }
      );
    }

    if (changelogRes.ok) {
      const markdown = await changelogRes.text();
      const parsed = parseChangelogMarkdown(markdown);
      if (parsed && parsed.length > 0) {
        changelog = parsed;
        isLive = true;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch changelog from GitHub:', err);
  }

  // 3. Fetch recent commits from GitHub API
  try {
    const commitsRes = await fetch(
      'https://api.github.com/repos/vedangiitb/evidor-core/commits?per_page=6',
      {
        next: { revalidate: 120 },
        headers: {
          'User-Agent': 'EvidorLabs-Web/1.0',
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (commitsRes.ok) {
      const commitsData = await commitsRes.json();
      if (Array.isArray(commitsData) && commitsData.length > 0) {
        recentCommits = commitsData.map((c: any) => ({
          hash: c.sha,
          shortHash: c.sha.substring(0, 7),
          message: (c.commit?.message || '').split('\n')[0],
          date: (c.commit?.author?.date || '').split('T')[0],
          author: c.author?.login || c.commit?.author?.name || 'contributor',
          url: c.html_url || `https://github.com/vedangiitb/evidor-core/commit/${c.sha}`,
        }));
        isLive = true;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch commits from GitHub:', err);
  }

  const responseData: DynamicReleaseInfo = {
    version,
    publishedDate,
    testPypiUrl: 'https://test.pypi.org/project/evidor/',
    changelog,
    recentCommits,
    source: isLive ? 'live' : 'fallback',
    fetchedAt: new Date().toISOString(),
  };

  return NextResponse.json(responseData, {
    headers: {
      'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
    },
  });
}
