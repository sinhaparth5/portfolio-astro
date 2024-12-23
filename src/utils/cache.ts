interface CacheData<T> {
    data: T;
    timestamp: number;
    expiresAt: number;
}

export class Cache {
    private static instance: Cache;
    private cacheMap: Map<string, CacheData<any>>;
    private ttl: number;

    private constructor(ttl: number = 3600000) {
        this.cacheMap = new Map();
        this.ttl = ttl;
        // Periodically clean expired cache entries
        setInterval(() => this.cleanExpiredCache(), ttl);
    }

    public static getInstance(): Cache {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            const cached = this.cacheMap.get(key);
            if (!cached) {
                return null;
            }

            // Check if cache has expired
            if (Date.now() >= cached.expiresAt) {
                this.cacheMap.delete(key);
                return null;
            }

            return cached.data;
        } catch (error) {
            console.error(`Cache get error for key ${key}:`, error);
            return null;
        }
    }

    async set<T>(key: string, data: T): Promise<void> {
        try {
            const timestamp = Date.now();
            this.cacheMap.set(key, {
                data,
                timestamp,
                expiresAt: timestamp + this.ttl
            });
        } catch (error) {
            console.error(`Cache set error for key ${key}:`, error);
        }
    }

    private cleanExpiredCache(): void {
        const now = Date.now();
        for (const [key, value] of this.cacheMap.entries()) {
            if (now >= value.expiresAt) {
                this.cacheMap.delete(key);
            }
        }
    }

    // Utility method to get cache stats
    public getCacheStats(): { size: number; keys: string[] } {
        return {
            size: this.cacheMap.size,
            keys: Array.from(this.cacheMap.keys())
        };
    }

    // Method to manually clear specific cache
    public clearCache(key: string): void {
        this.cacheMap.delete(key);
    }

    // Method to clear all cache
    public clearAllCache(): void {
        this.cacheMap.clear();
    }
}