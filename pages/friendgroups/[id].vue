<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { NTag } from 'naive-ui'

const route = useRoute()
const groupId = route.params.id

// Simulate fetching data for the selected friend group
const groupName = ref('')
const users = ref([])

onMounted(() => {
  // Replace with API call if needed
  const friendGroups = [
    { id: '1', name: 'Weekend Warriors', users: [{ name: 'Alice', role: 'Admin' }, { name: 'Bob', role: 'User' }] },
    { id: '2', name: 'Book Club', users: [{ name: 'Charlie', role: 'Creator' }, { name: 'Dave', role: 'User' }] },
    { id: '3', name: 'Travel Buddies', users: [{ name: 'Eve', role: 'Admin' }, { name: 'Frank', role: 'User' }] },
  ]

  const group = friendGroups.find(g => g.id === groupId)
  if (group) {
    groupName.value = group.name
    users.value = group.users
  }
})
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        Group: {{ groupName }}
      </h1>
    </div>

    <!-- List of Users in the Group -->
    <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="user in users"
        :key="user.name"
        class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
      >
        <div class="text-gray-700 font-medium">
          {{ user.name }}
        </div>
        <NTag type="info" :color="user.role === 'Admin' ? 'blue' : user.role === 'Creator' ? 'green' : 'gray'">
          {{ user.role }}
        </NTag>
      </div>
    </div>
  </div>
</template>
