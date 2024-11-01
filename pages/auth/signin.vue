<script setup>
import { LogoApple, LogoGithub, LogoGoogle } from '@vicons/ionicons5'

const { signIn } = useAuth()
const { query } = useRoute()

function oauthSignIn(provider) {
  signIn(provider, { callbackUrl: query.redirect })
}
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <NCard title="Login" class="m-auto w-64 md:w-96 center-content">
      <NButton type="primary" ghost class="w-full mb-4 flex login">
        <NIcon size="24" class="mr-4 text-black left-0 justify-left" :component="LogoApple" />
        <div>
          Sign in with Apple
        </div>
      </NButton>
      <NButton type="primary" ghost class="w-full mb-4 flex login" @click="oauthSignIn('google')">
        <NIcon size="24" class="mr-4 text-black left-0 justify-left" :component="LogoGoogle" />
        <div>
          Sign in with Google
        </div>
      </NButton>
      <NButton type="primary" ghost class="w-full mb-4 flex login" @click="oauthSignIn('github')">
        <NIcon size="24" class="mr-4 text-black left-0 justify-left" :component="LogoGithub" />
        <div>
          Sign in with Github
        </div>
      </NButton>
    </NCard>
  </div>
</template>
