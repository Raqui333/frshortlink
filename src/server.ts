import Fastify from 'fastify';
import Routes from './routes/routes.js';

import { connectRedis } from './services/redis.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(Routes);

async function booststrap() {
  try {
    await connectRedis();
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

booststrap();
