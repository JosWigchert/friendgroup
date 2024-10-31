<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <div>
    <div class="w-full h-screen flex flex-col">
      <Header />
      <div class="flex-grow">
        <slot />
      </div>
    </div>
  </div>
  <SpeedInsights />
</template>
