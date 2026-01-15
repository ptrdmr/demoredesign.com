/**
 * GitHub API utilities for fetching repository content.
 */

interface GitHubRepoInfo {
  owner: string;
  repo: string;
}

/**
 * Parse a GitHub URL to extract owner and repo name.
 * Supports formats:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - https://github.com/owner/repo/tree/branch
 */
export function parseGitHubUrl(url: string): GitHubRepoInfo | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') {
      return null;
    }
    
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) {
      return null;
    }
    
    const owner = pathParts[0];
    // Remove .git suffix if present
    const repo = pathParts[1].replace(/\.git$/, '');
    
    return { owner, repo };
  } catch {
    return null;
  }
}

/**
 * Fetch the README content from a GitHub repository.
 * Uses GitHub's API to get the README regardless of branch or filename.
 * Falls back to raw content URLs if the API fails.
 */
export async function fetchGitHubReadme(repoUrl: string): Promise<string | null> {
  const repoInfo = parseGitHubUrl(repoUrl);
  if (!repoInfo) {
    return null;
  }
  
  const { owner, repo } = repoInfo;
  
  // Try GitHub API first (most reliable - handles any branch/filename)
  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'Demore-Design-Portfolio',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // API failed, try raw URLs as fallback
  }
  
  // Fallback: Try raw.githubusercontent.com with common branch names
  const branches = ['main', 'master'];
  const readmeNames = ['README.md', 'readme.md', 'Readme.md'];
  
  for (const branch of branches) {
    for (const filename of readmeNames) {
      try {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`;
        const response = await fetch(rawUrl, {
          next: { revalidate: 3600 },
        });
        
        if (response.ok) {
          return await response.text();
        }
      } catch {
        continue;
      }
    }
  }
  
  return null;
}

/**
 * Get the GitHub repository URL for display (cleaned up).
 */
export function getCleanRepoUrl(url: string): string {
  const repoInfo = parseGitHubUrl(url);
  if (!repoInfo) {
    return url;
  }
  return `https://github.com/${repoInfo.owner}/${repoInfo.repo}`;
}

/**
 * Get a short display name for the repository.
 */
export function getRepoDisplayName(url: string): string {
  const repoInfo = parseGitHubUrl(url);
  if (!repoInfo) {
    return url;
  }
  return `${repoInfo.owner}/${repoInfo.repo}`;
}

