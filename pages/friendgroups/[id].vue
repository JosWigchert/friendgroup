<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { NTag } from 'naive-ui'

const { $client } = useNuxtApp()

const { isLoading, hasGroup, groups, selectedGroup, selectGroup } = useFriendgroup()

const route = useRoute()
const groupId = route.params.id

const groupResult = await $client.friendGroup.get.query({ groupId })
if (groupResult.error) {
  console.log(groupResult.error)
}
const group = ref(groupResult.data)
console.log(group.value)
// Simulate fetching data for the selected friend group
// const group = computed(() => groups.value.find(group => group.id === groupId))
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        Group: {{ group?.name }}
      </h1>
    </div>

    <!-- List of Users in the Group -->
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="user in group?.members"
        :key="user.name"
        class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
      >
        <div class="text-gray-700 font-medium">
          {{ user.user.name }}
        </div>
        <NTag :type="user.role === 'ADMIN' ? 'info' : user.role === 'FOUNDER' ? 'success' : undefined">
          {{ user.role }}
        </NTag>
      </div>
    </div>
  </div>
</template>
