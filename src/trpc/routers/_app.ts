import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  invoke: baseProcedure
  .input(
    z.object({
      text: z.string(),
    })
  )
  .mutation(async ({input}) =>
    {
      await inngest.send({
        name:"JobEvent",
        data:{
          email: input.text,
        }
      })
  }),

  Invoke: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;