<script setup>
import { NIcon } from 'naive-ui'

import {
  ChatbubblesOutline as ChatIcon,
  CheckmarkCircleOutline as CheckmarkIcon,
  GameControllerOutline as GameIcon
} from '@vicons/ionicons5'

const chatIcon = ChatIcon
const gameIcon = GameIcon
const checkmarkIcon = CheckmarkIcon
</script>

<template>
  <section id="features" class="py-20 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-semibold">
        All of the results - none of the work!
      </h2>
      <p class="mt-4 text-gray-600 dark:text-gray-300">
        Easily keep track of shared memories, favorite quotes, and event plans with friends.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- Feature 1 -->
      <div class="flex flex-col items-center text-center">
        <NIcon size="40" :component="chatIcon" />
        <h3 class="mt-4 font-medium">
          Share Quotes
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Keep a collection of favorite quotes and shared memories.
        </p>
      </div>
      <!-- Feature 2 -->
      <div class="flex flex-col items-center text-center">
        <NIcon size="40" :component="gameIcon" />
        <h3 class="mt-4 font-medium">
          Plan Activities
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Organize fun activities and keep track of group events.
        </p>
      </div>
      <!-- Feature 3 -->
      <div class="flex flex-col items-center text-center">
        <NIcon size="40" :component="checkmarkIcon" />
        <h3 class="mt-4 font-medium">
          Stay Connected
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Get reminders and updates for upcoming group plans.
        </p>
      </div>
    </div>
  </section>
</template>
