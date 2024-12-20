interface CacheData<T> {
    data: T;
    timestamp: number;
}

export class Cache {
    private static instance: Cache;
    private cacheMap: Map<string, CacheData<any>>;
    private ttl: number;

    private constructor(ttl: number = 3600000) {
        this.cacheMap = new Map();
        this.ttl = ttl;
    }

    public static getInstance(): Cache {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }

    async get<T>(key: string): Promise<T | null> {
        const cached = this.cacheMap.get(key);
        if(!cached) return null;

        if (Date.now() - cached.timestamp > this.ttl) {
            this.cacheMap.delete(key)
            return null;
        }

        return cached.data;
    }

    async set<T>(key: string, data: T): Promise<void> {
        this.cacheMap.set(key, {
            data,
            timestamp: Date.now()
        });
    }
}