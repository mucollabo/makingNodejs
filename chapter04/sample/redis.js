// const redis = require('redis');
// const client = redis.createClient(6379, '127.0.0.1');

// client.get('name', (err, value) => {
//     console.log(value);
// });

import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('name', 'charles');
const value = await client.get('name');
console.log(value);
