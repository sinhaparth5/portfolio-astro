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
  private readonly CACHE_KEY = 'github-public-repos';
  private readonly CACHE_TTL = 3600000; // 1 hour

  constructor() {
    this.cache = Cache.getInstance();
  }

  async getPublicRepositories(username: string): Promise<Repository[]> {
    try {
      // Try to get from cache first
      const cached = await this.cache.get<Repository[]>(this.CACHE_KEY);
      if (cached) {
        console.log('Returning cached public repositories');
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
        throw new Error('Failed to fetch repositories');
      }

      const repos: GitHubApiRepo[] = await response.json();

      // Filter for public repos and transform data
      const publicRepos: Repository[] = repos
        .filter(repo => !repo.private)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,  // Transform html_url to url
          homepage: repo.homepage,
          stars: repo.stargazers_count,  // Transform stargazers_count to stars
          language: repo.language,
          topics: repo.topics,
          updatedAt: new Date(repo.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }));

      // Store in cache
      await this.cache.set(this.CACHE_KEY, publicRepos);

      return publicRepos;
    } catch (error) {
      console.error('Error fetching public repositories:', error);
      return [];
    }
  }
}