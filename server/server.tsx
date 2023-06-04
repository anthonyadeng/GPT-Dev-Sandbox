import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";
import rateLimiter from "./rateLimiter";

const appRouter = router({

  userList: publicProcedure
    .query(async () => {
      const users = await db.user.findMany();
      return users;
    }),
    
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.user.findById(input);
      return user;
    }),

    // getUser: t.procedure
    // .input(z.string())
    // .query((opts) => {
    //   opts.input; // string
    //   return { id: opts.input, name: 'Bilbo' };
    // }),

  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.create(input);
      return user;
    }),
});

// createUser: t.procedure
// .input(z.object({ name: z.string().min(5) }))
// .mutation(async (opts) => {
//   // use your ORM of choice
//   return await UserModel.create({
//     data: opts.input,
//   });
// }),

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);  
