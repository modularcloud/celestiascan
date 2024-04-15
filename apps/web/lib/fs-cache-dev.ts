import fs from "fs/promises";
import path from "path";

type CacheId = string | number | (string | number)[];
type CacheEntry<T> = { value: T; expiry: number | null };

export class FileSystemCacheDEV {
  constructor(private cacheDir = `.next/cache/fs-cache`) {
    this.initCacheDir();
  }

  private async initCacheDir(): Promise<void> {
    try {
      const stats = await fs.stat(this.cacheDir);
      if (!stats.isDirectory()) {
        await fs.mkdir(this.cacheDir, { recursive: true });
      }
    } catch (error) {
      if ((error as any).code === "ENOENT") {
        await fs.mkdir(this.cacheDir, { recursive: true });
        return;
      }

      console.error("Error creating cache directory:", error);
    }
  }

  private computeCacheKey(id: CacheId, updatedAt?: Date | number) {
    let fullKey = Array.isArray(id) ? id.join("-") : id.toString();
    if (updatedAt) {
      fullKey += `-${new Date(updatedAt).getTime()}`;
    }
    return fullKey;
  }

  async set<T>(key: CacheId, value: T, ttl?: number): Promise<void> {
    await this.initCacheDir();
    const cacheEntry: CacheEntry<T> = {
      value,
      expiry: ttl ? Date.now() + ttl * 1000 : null,
    };
    const filePath = this.getFilePath(this.computeCacheKey(key));
    await fs.writeFile(filePath, JSON.stringify(cacheEntry), "utf-8");
  }

  async get<T>(key: CacheId): Promise<T | null> {
    await this.initCacheDir();
    const filePath = this.getFilePath(this.computeCacheKey(key));
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const cacheEntry: CacheEntry<T> = JSON.parse(data);

      if (cacheEntry.expiry && Date.now() > cacheEntry.expiry) {
        // Data is expired
        return null;
      }

      return cacheEntry.value;
    } catch (error) {
      // If the file doesn't exist or other errors occur, return null
      return null;
    }
  }

  /**
   * Search for keys in the cache, return all keys that starts with with the key passed in argument
   * @param key The key to look up for
   * @returns the list of keys it found
   */
  async search(key: CacheId): Promise<string[]> {
    await this.initCacheDir();
    const files = await fs.readdir(this.cacheDir);
    return Promise.all(
      files
        .filter((fileName) => fileName.startsWith(this.computeCacheKey(key)))
        .map((file) => file.replaceAll(".json", "")),
    );
  }

  private getFilePath(key: string): string {
    return path.join(this.cacheDir, `${key}.json`);
  }
}
