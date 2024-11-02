<script setup>
import { defineProps } from 'vue'
import { NAvatar, NSkeleton, NTypography } from 'naive-ui'

const props = defineProps({
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
    default: 'This is a brief description of the friend group.',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="flex items-center p-4 bg-white rounded-lg shadow-lg max-w-md">
    <NAvatar :size="64" class="flex-shrink-0 mr-4">
      <template v-if="isLoading">
        <NSkeleton :text="false" :width="64" :height="64" />
      </template>
      <template v-else>
        <img :src="image" alt="Friend Group" class="object-cover w-16 h-16 rounded-full">
      </template>
    </NAvatar>

    <div class="flex flex-col flex-1">
      <NTypography v-if="isLoading" class="font-semibold text-lg text-gray-800">
        <NSkeleton :text="true" width="70%" />
      </NTypography>
      <NTypography v-else class="font-semibold text-lg text-gray-800">
        {{ title }}
      </NTypography>

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
