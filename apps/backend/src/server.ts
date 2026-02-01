import Fastify from 'fastify';
import { setupApp } from './composition.js';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

async function main() {
  const { appRouter, logger } = await setupApp();

  logger.info('App setup complete. Ready to start the server.');
  const fastify = Fastify({ loggerInstance: logger });
  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter },
  });
  fastify.listen({ port: 3000 }, () =>
    logger.info('Server listening on port 3000'),
  );
}

await main();
