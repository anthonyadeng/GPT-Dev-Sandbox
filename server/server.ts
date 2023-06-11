import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import rateLimiter from './rateLimiter';
import { initTRPC } from '@trpc/server';
import {
  listModels,
  openaiRequest,
  openaiSetConfig,
} from '../server/api/openai';

const trpc = initTRPC.create();
const appRouter = trpc.router({
  openaiSetConfig: trpc.procedure
    .input(
      z.object({
        organization: z.string(),
        apiKey: z.string(),
      })
    )
    .query(async (opts) => {
      openaiSetConfig(opts.input);
    }),

  openaiListModels: trpc.procedure.query(async () => {
    return await listModels();
  }),

  openaiRequest: trpc.procedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(['system', 'user', 'assistant']),
            content: z.string(),
            name: z.string().optional(),
          })
        ),
        model: z.string(),
        temperature: z.number().optional(),
      })
    )
    .query(async (opts) => {
      return await openaiRequest(opts.input);
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
