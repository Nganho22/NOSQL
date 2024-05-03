const redis = require('redis');

function connectToRedis() {
    const redisClient = redis.createClient();
    // Kết nối tới Redis
    redisClient.on("error", error => console.error(`Error: ${error}`));
    redisClient.on("connect", () => console.log("Connected to Redis"));

    return redisClient;
}

module.exports = { connectToRedis };
