// const redis = require('redis');
// const client = redis.createClient(6379, '127.0.0.1');

import { createClient } from 'redis';
const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.rPush('myKey', 0);
await client.rPush('myKey', 1);
await client.rPush('myKey', 2);
