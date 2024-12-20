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
    private readonly CACHE_KEY = 'medium-articles';
    private readonly CACHE_TTL = 3600000;

    constructor() {
        this.parser = new Parser();
        this.cache = Cache.getInstance();
    }

    async getArticles(username: string): Promise<MediumArticle[]> {
        try {
            const cached = await this.cache.get<MediumArticle[]>(this.CACHE_KEY);
            if (cached) {
                console.log('Returning cached articles');
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

            await this.cache.set(this.CACHE_KEY, articles);

            return articles;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    }
}