<script setup>
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String,
    default: '/default-image.jpg',
  },
  title: {
    type: String,
    default: 'Friend Group Name',
  },
  description: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="flex items-stretch bg-white rounded-lg shadow-lg max-w-md">
    <!-- Left side - Image (or Skeleton) -->
    <div class="w-24 h-full flex-shrink-0 overflow-hidden rounded-lg">
      <template v-if="isLoading">
        <NSkeleton :text="false" class="w-full h-full" />
      </template>
      <template v-else>
        <img :src="image" alt="Friend Group" class="object-cover h-full">
      </template>
    </div>

    <!-- Right side - Text Content -->
    <div class="flex flex-col justify-between flex-1 p-4">
      <!-- Title -->
      <NTypography v-if="isLoading" class="font-semibold text-lg text-gray-800">
        <NSkeleton :text="true" width="70%" />
      </NTypography>
      <NTypography v-else class="font-semibold text-lg text-gray-800">
        {{ title }}
      </NTypography>

      <!-- Description -->
      <NTypography v-if="isLoading" class="text-gray-600 mt-2">
        <NSkeleton :text="true" width="90%" />
        <NSkeleton :text="true" width="60%" />
      </NTypography>
      <NTypography v-else class="text-gray-600 mt-2">
        {{ description }}
      </NTypography>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Custom styling for skeleton or other parts */
</style>
