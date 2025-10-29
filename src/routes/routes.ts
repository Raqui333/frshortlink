import type { FastifyInstance, FastifyPluginOptions, FastifyReply } from 'fastify';
import { client } from '../services/redis.js';
import { generateCode } from '../utils/random.js';

const EXPIRE_TIME = 30; // in seconds

interface Body {
  url: string;
}

interface Params {
  id: string;
}

export default async function Routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Body: Body }>('/', async (request, reply: FastifyReply) => {
    const { body } = request;

    if (!body || !body.url) {
      return reply.status(400).send({ error: 'Missing url in body' });
    }

    try {
      let randomCode = generateCode();

      while (await client.exists(randomCode)) {
        randomCode = generateCode();
      }

      await client.set(randomCode, body.url, {
        EX: EXPIRE_TIME,
        NX: true,
      });

      return reply.code(200).send({
        success: 'Your short link was successfully created',
        code: randomCode,
        expire_in_seconds: EXPIRE_TIME,
      });
    } catch (err) {
      return reply.code(500).send({ error: 'An error has occurred' });
    }
  });

  fastify.get<{ Params: Params }>('/r/:id', async (request, reply: FastifyReply) => {
    const key = request.params.id;
    const url = await client.get(key);

    if (!url) {
      return reply.code(404).send({ error: 'Invalid code' });
    }

    return reply.redirect(url, 301);
  });
}
