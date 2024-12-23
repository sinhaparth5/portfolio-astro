import { Cache } from "@/utils/cache";

// Interface for the raw GitHub API response
interface GitHubApiRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
  private: boolean;
}

// Interface for our transformed repository data
export interface Repository {
  id: number;
  name: string;
  description: string | null;
  url: string;  // This matches what we use in the component
  homepage: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
}

export class GitHubService {
  private cache: Cache;
  private readonly CACHE_KEY_PREFIX = 'github-repos';
  private readonly CACHE_TTL = 3600000; // 1 hour

  constructor() {
      this.cache = Cache.getInstance();
  }

  private getCacheKey(username: string): string {
      return `${this.CACHE_KEY_PREFIX}-${username}`;
  }

  async getPublicRepositories(username: string): Promise<Repository[]> {
      try {
          const cacheKey = this.getCacheKey(username);
          
          // Try to get from cache first
          const cached = await this.cache.get<Repository[]>(cacheKey);
          if (cached) {
              console.log(`Returning cached repositories for ${username}`);
              return cached;
          }

          // If not in cache, fetch from GitHub API
          const response = await fetch(
              `https://api.github.com/users/${username}/repos?type=public&sort=updated`,
              {
                  headers: {
                      'Accept': 'application/vnd.github.v3+json'
                  }
              }
          );

          if (!response.ok) {
              throw new Error(`Failed to fetch repositories: ${response.statusText}`);
          }

          const repos: GitHubApiRepo[] = await response.json();

          // Transform data
          const publicRepos: Repository[] = repos
              .filter(repo => !repo.private)
              .map(repo => ({
                  id: repo.id,
                  name: repo.name,
                  description: repo.description,
                  url: repo.html_url,
                  homepage: repo.homepage,
                  stars: repo.stargazers_count,
                  language: repo.language,
                  topics: repo.topics,
                  updatedAt: new Date(repo.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                  })
              }));

          // Store in cache with username-specific key
          await this.cache.set(cacheKey, publicRepos);

          return publicRepos;
      } catch (error) {
          console.error('Error fetching public repositories:', error);
          return [];
      }
  }
}