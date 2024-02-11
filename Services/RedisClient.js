import { createClient } from "redis";

class RedisClient {
    constructor() {
        this.client = createClient({
            url: "redis://localhost:6379", // Simplified connection string
        });
        this.client.on("error", (err) =>
            console.error("Redis Client Error", err)
        );
        this.client.connect();
    }

    isAlive() {
        return this.client.isOpen();
    }

    async get(key) {
        return await this.client.get(key);
    }

    async set(key, value, duration) {
        console.log(
            "Setting key:",
            key,
            "with value:",
            value,
            "and duration:",
            duration
        );
        await this.client.set(key, value, {
            EX: duration,
        });
    }

    async del(key) {
        await this.client.del(key);
    }
}

const redisClient = new RedisClient();

export default redisClient;
