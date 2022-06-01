// const redis = require('redis');

// async function run() {
//   const client = redis.createClient();

//   console.log(client.isOpen); // this is false

//   await client.disconnect();
// }

// run();

// const redis = require('redis');

// const client = redis.createClient();

// async function stop() {
//   await client.disconnect();
// }

// stop();

import { createClient } from 'redis';

(async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
})();
