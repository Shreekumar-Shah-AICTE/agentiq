import { RepoMeta } from '../types';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'AgentIQ-Code-Auditor'
  };
  
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'optional_for_public_repos') {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  
  return headers;
}

// 1. Fetch Repository Metadata
export async function fetchRepoMeta(owner: string, repo: string): Promise<RepoMeta> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const response = await fetch(url, { headers: getHeaders(), next: { revalidate: 3600 } });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch metadata for ${owner}/${repo}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return {
    owner: data.owner.login,
    name: data.name,
    fullName: data.full_name,
    description: data.description || 'No description provided.',
    language: data.language || 'Mixed',
    stars: data.stargazers_count,
    forks: data.forks_count,
    fileCount: 0, // Will be updated when tree is fetched
    defaultBranch: data.default_branch || 'main'
  };
}

// 2. Fetch File Tree Recursively
export async function fetchFileTree(owner: string, repo: string, defaultBranch = 'main'): Promise<string[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`;
  const response = await fetch(url, { headers: getHeaders(), next: { revalidate: 600 } });
  
  if (!response.ok) {
    // Attempt fallback to master branch if main fails
    if (defaultBranch === 'main') {
      return fetchFileTree(owner, repo, 'master');
    }
    throw new Error(`Failed to fetch file tree for ${owner}/${repo}: ${response.statusText}`);
  }
  
  const data = await response.json();
  if (!data.tree || !Array.isArray(data.tree)) {
    return [];
  }
  
  // Filter for blobs (files), not trees (directories)
  return data.tree
    .filter((item: any) => item.type === 'blob')
    .map((item: any) => item.path);
}

// 3. Detect key configuration and documentation files to analyze
export function detectKeyFiles(paths: string[]): string[] {
  const targetFiles = [
    'package.json',
    'tsconfig.json',
    'package-lock.json',
    'yarn.lock',
    'requirements.txt',
    'setup.py',
    'pyproject.toml',
    'Cargo.toml',
    'go.mod',
    'Makefile',
    'Dockerfile',
    'docker-compose.yml',
    'eslint.config.mjs',
    'eslint.config.js',
    '.eslintrc.json',
    '.eslintrc.js',
    '.eslintrc',
    '.prettierrc',
    'README.md',
    'CONTRIBUTING.md',
    'AGENTS.md',
    'CLAUDE.md',
    '.cursorrules'
  ];

  // Match files exactly or subfolder files like src/package.json
  return paths.filter(path => {
    const filename = path.split('/').pop() || '';
    return targetFiles.includes(filename.toLowerCase());
  }).slice(0, 15); // Limit to top 15 key files to save token limits
}

// 4. Fetch Key File Contents (Base64 decode + limit to 200 lines)
export async function fetchKeyFiles(owner: string, repo: string, paths: string[]): Promise<Record<string, string>> {
  const fileContents: Record<string, string> = {};
  
  const fetchPromises = paths.map(async (path) => {
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const response = await fetch(url, { headers: getHeaders() });
      if (!response.ok) return;
      
      const data = await response.json();
      if (data.content && data.encoding === 'base64') {
        const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
        // Limit to first 200 lines to fit in AI context window
        const limitedLines = decoded.split('\n').slice(0, 200).join('\n');
        fileContents[path] = limitedLines;
      }
    } catch (err) {
      console.warn(`Error fetching file content for ${path}:`, err);
    }
  });
  
  await Promise.all(fetchPromises);
  return fileContents;
}

// 5. Fetch PR and Issue Comments for Tribal Knowledge
export async function fetchPRComments(owner: string, repo: string, limit = 5): Promise<string[]> {
  const comments: string[] = [];
  
  try {
    // Get last merged Pull Requests
    const pullsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&sort=updated&per_page=${limit}`;
    const pullsResponse = await fetch(pullsUrl, { headers: getHeaders() });
    
    if (!pullsResponse.ok) return [];
    const pulls = await pullsResponse.json();
    
    const mergedPulls = pulls.filter((pr: any) => pr.merged_at !== null);
    
    const commentPromises = mergedPulls.map(async (pr: any) => {
      try {
        // Fetch review comments
        const reviewUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/comments`;
        const reviewResponse = await fetch(reviewUrl, { headers: getHeaders() });
        if (reviewResponse.ok) {
          const reviewComments = await reviewResponse.json();
          reviewComments.forEach((c: any) => {
            if (c.body && c.body.trim().length > 10) {
              comments.push(`[PR #${pr.number} Review] ${c.body}`);
            }
          });
        }
        
        // Fetch issue comments (general discussion on the PR)
        const issueUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${pr.number}/comments`;
        const issueResponse = await fetch(issueUrl, { headers: getHeaders() });
        if (issueResponse.ok) {
          const issueComments = await issueResponse.json();
          issueComments.forEach((c: any) => {
            if (c.body && c.body.trim().length > 10) {
              comments.push(`[PR #${pr.number} Discussion] ${c.body}`);
            }
          });
        }
      } catch (err) {
        console.warn(`Error fetching comments for PR #${pr.number}:`, err);
      }
    });
    
    await Promise.all(commentPromises);
  } catch (error) {
    console.warn('Error fetching tribal knowledge comments:', error);
  }
  
  return comments;
}

// Parse owner and repo from various GitHub URL formats
export function parseGitHubUrl(url: string): [string, string] {
  try {
    // Strip trailing slash and git extension
    let cleanUrl = url.trim().replace(/\/$/, '').replace(/\.git$/, '');
    
    // Support ssh format: git@github.com:owner/repo
    if (cleanUrl.startsWith('git@github.com:')) {
      const path = cleanUrl.split('git@github.com:')[1];
      const parts = path.split('/');
      return [parts[0], parts[1]];
    }
    
    // Support https: https://github.com/owner/repo
    const parsed = new URL(cleanUrl);
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      return [pathParts[0], pathParts[1]];
    }
  } catch (err) {
    // Ignore and fallback
  }
  
  // Return fallback if parse fails
  throw new Error('Invalid GitHub Repository URL. Use format: https://github.com/owner/repo');
}
