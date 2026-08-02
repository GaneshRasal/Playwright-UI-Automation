// services/cache-service.js

import { DOMService } from "./dom-service.js";

export class CacheService {

    static cache = new Map();

    static async getDOM(page) {

        const url = page.url();

        if (this.cache.has(url)) {
            console.log("⚡ Using Cached DOM");
            return this.cache.get(url);
        }

        console.log("🔍 Extracting DOM...");

        const dom = await DOMService.extract(page);

        this.cache.set(url, dom);

        return dom;
    }

    static invalidate(page) {

        const url = page.url();

        this.cache.delete(url);

        console.log("♻️ DOM Cache Cleared");

    }

    static clearAll() {

        this.cache.clear();

        console.log("♻️ Complete DOM Cache Cleared");

    }

}