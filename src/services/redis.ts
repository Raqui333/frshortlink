import { createClient } from 'redis';

export const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

export async function connectRedis() {
  try {
    await client.connect();
    console.log('Connected to Redis Successfully');
  } catch (err) {
    console.error('Error trying to connect to Redis Server:', err);
    throw err;
  }
}

process.on('SIGINT', async () => {
  if (client.isOpen) await client.quit();
  process.exit(0);
});
