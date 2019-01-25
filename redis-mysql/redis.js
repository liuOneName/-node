const redis = new require('redis');

const client = redis.createClient();

module.exports = client;