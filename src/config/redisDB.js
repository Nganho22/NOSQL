const redis = require('redis')

const redis = require('redis');

function connectToRedis() {
    const client = redis.createClient({
        host: 'localhost', // Thay đổi thông tin kết nối nếu cần
        port: 6379,        // Thay đổi thông tin kết nối nếu cần
    });

    client.on('connect', () => {
        console.log('Connected to Redis');
    });

    client.on('error', (err) => {
        console.error('Redis connection error:', err);
    });

    return client;
}

module.exports = { connectToRedis };
