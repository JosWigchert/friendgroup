<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'

// Props definition
defineProps({
  inviteLink: {
    type: String,
    required: true
  },
})
</script>

<template>
  <NCard style="width: 600px" :bordered="true" size="small" role="dialog" aria-modal="true">
    <div class="flex flex-col items-center space-y-4">
      <!-- QR Code with Naive UI QR component -->
      <NQrCode :value="inviteLink" :size="250" class="rounded-lg" />

      <!-- Invite Link -->
      <div class="text-center">
        <p class="text-gray-600">
          Scan the QR code or use the link below to join:
        </p>
        <NuxtLink :href="inviteLink" target="_blank" class="text-blue-600 underline">
          {{ inviteLink }}
        </NuxtLink>
      </div>
    </div>
  </NCard>
</template>

<style scoped>
    /* Optional styling */
</style>
