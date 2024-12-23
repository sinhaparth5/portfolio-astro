import Parser from "rss-parser";
import { Cache } from "@/utils/cache";

interface MediumArticle {
    title: string;
    link: string;
    pubDate: string;
    formattedDate: string;
    categories: string[];
}

export class MediumService {
    private parser: Parser;
    private cache: Cache;
    private readonly CACHE_KEY_PREFIX = 'medium-articles';
    private readonly CACHE_TTL = 3600000; // 1 hour

    constructor() {
        this.parser = new Parser();
        this.cache = Cache.getInstance();
    }

    private getCacheKey(username: string): string {
        return `${this.CACHE_KEY_PREFIX}-${username}`;
    }

    async getArticles(username: string): Promise<MediumArticle[]> {
        try {
            const cacheKey = this.getCacheKey(username);
            
            // Try to get from cache first
            const cached = await this.cache.get<MediumArticle[]>(cacheKey);
            if (cached) {
                console.log(`Returning cached articles for ${username}`);
                return cached;
            }

            const feed = await this.parser.parseURL(`https://medium.com/feed/@${username}`);
            const articles = feed.items.map(item => ({
                title: item.title || '',
                link: item.link || '',
                pubDate: item.pubDate || '',
                formattedDate: new Date(item.pubDate || '').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                categories: item.categories || [],
            }));

            // Store in cache with username-specific key
            await this.cache.set(cacheKey, articles);

            return articles;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    }
}