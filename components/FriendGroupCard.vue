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
    default: 'This is a brief description of the friend group.',
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="flex items-stretch bg-white rounded-lg shadow-lg max-w-md hover:shadow-2xl hover:scale-105 transition-all duration-300 w-96">
    <template v-if="isLoading">
      <div class="w-24 h-24 flex-shrink-0 overflow-hidden">
        <NSkeleton :text="false" class="w-full h-full rounded-lg" />
      </div>

      <div class="flex flex-col justify-between flex-1 px-4 py-2">
        <NTypography class="font-semibold text-lg text-gray-800">
          <NSkeleton :text="true" width="70%" />
        </NTypography>

        <NTypography class="text-gray-600 text-sm">
          <NSkeleton :text="true" width="90%" />
          <NSkeleton :text="true" width="60%" />
        </NTypography>
      </div>
    </template>
    <template v-else>
      <div class="w-24 h-24 flex-shrink-0 overflow-hidden">
        <img :src="image || '/default-image.jpg'" alt="Friend Group" class="object-cover w-full h-full rounded-lg">
      </div>

      <div class="flex flex-col justify-between flex-1 px-4 py-2">
        <NTypography class="font-semibold text-lg text-gray-800">
          {{ title }}
        </NTypography>

        <NTypography class="text-gray-600 truncate-description">
          {{ description }}
        </NTypography>
      </div>
    </template>
  </div>
</template>

<style scoped>
.w-24 {
  width: 96px;
}

.h-32 {
  height: 128px;
}

.truncate-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  white-space: normal;
}
</style>
