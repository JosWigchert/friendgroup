import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { friendgroupRouter } from './friend_group'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        time: new Date()
      }
    }),
  friendGroup: friendgroupRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
