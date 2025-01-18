import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface User {
  id: number;
  name: string;
}

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const user: User = {
        id: 1,
        name: input.name,
      };
      return user;
    }),
});
