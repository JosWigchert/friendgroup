// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n'
  ],
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appleClientId: process.env.APPLE_CLIENT_ID,
    appleClientSecret: process.env.APPLE_CLIENT_SECRET,
  },
  auth: {
    baseURL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/auth` : 'http://localhost:3000/api/auth',
  },
  i18n: {
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      {
        name: 'English',
        code: 'en',
        file: 'en.json'
      }
    ],
    experimental: {
      localeDetector: './localeDetector.ts'
    }
  },
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  compatibilityDate: '2024-08-19',
  devtools: {
    enabled: true
  },
  typescript: {
    shim: false
  }
})
