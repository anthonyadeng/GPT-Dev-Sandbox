import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
// import rateLimiter from './rateLimiter';
import { procedure, router } from './trpc';
import cors from 'cors';
import {
  openaiListModels,
  openaiRequest,
  openaiSetConfig,
} from '../server/api/openai';

const appRouter = router({
  openaiSetConfig: procedure
    .input(
      z.object({
        organization: z.string(),
        apiKey: z.string(),
      })
    )
    .query(async (opts) => {
      openaiSetConfig(opts.input);
    }),

  greeting: procedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? 'world'}`,
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),

  openaiListModels: procedure.query(async () => {
    console.log('in trpc listmodels');
    const res = await openaiListModels();
    const responseSchema = z.promise(z.)
    const result = responseSchema.spa(res)
    if (!result.success) {
  // handle error then return
  result.error;
} else {
  // do something
  result.data;
}
    if (typeof res === 'string') {
      return JSON.parse(res);
    } else {
      console.log('Unexpected Response from listModels: ', res);
    }
  }),

  openaiRequest: procedure
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
  middleware: cors(),
  router: appRouter,
});
console.log('listening on 3001');
server.listen(3001);
