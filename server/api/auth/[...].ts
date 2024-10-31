import AppleProvider from 'next-auth/providers/apple'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'

const prisma = new PrismaClient()

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: useRuntimeConfig().authSecret,
  providers: [
    // // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // AppleProvider.default({
    //   clientId: useRuntimeConfig().appleClientId,
    //   clientSecret: useRuntimeConfig().appleClientSecret,
    // }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
    }),
  ],
  pages: {
    signIn: '/auth/signin'
  }
})
