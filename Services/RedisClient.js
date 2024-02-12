import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

class RedisClient {
    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL,
        });
        this.client.on("error", (err) => this.handleError(err));
        this.client.connect();
    }

    handleError(err) {
        if (!this.connectionAlerted) {
            console.log("Could not connect to Redis, continuing without cache.");
            this.connectionAlerted = true;
        }
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
