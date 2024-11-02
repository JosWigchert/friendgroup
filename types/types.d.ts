// types.d.ts
import '@sidebase/nuxt-auth';

declare module '@sidebase/nuxt-auth' {
  interface Session {
    user: {
      id: string; 
    };
  }
}
