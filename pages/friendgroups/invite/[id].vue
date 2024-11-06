<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const group = ref({
  name: '',
  image: ''
})
const inviteNotFound = ref(false) // To handle the case where invite is not found

// Fetch group data based on ID
onMounted(async () => {
  const groupId = route.params.id
  try {
    // Replace this mock data with an actual API call to fetch group data
    // Simulate fetching group data
    if (groupId === 'valid-id') {
      group.value = {
        name: 'Friend Group', // Replace with actual group data
        image: 'https://via.placeholder.com/150' // Replace with actual group image URL
      }
    }
    else {
      inviteNotFound.value = true // Set to true if group data is not found
    }
  }
  catch (error) {
    console.error(error)
    inviteNotFound.value = true // Handle errors by marking invite as not found
  }
})

// Function to join group
function joinGroup() {
  if (!inviteNotFound.value) {
    // Add your logic to handle joining the group here
    console.info(`Joining group: ${group.value.name}`)
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100">
    <div v-if="inviteNotFound" class="w-full max-w-lg p-6 bg-white rounded-lg shadow-md text-center">
      <h1 class="text-2xl font-semibold text-gray-800">
        Oops...
      </h1>
      <p class="text-gray-600">
        The invite you’re looking for could not be found.
      </p>
    </div>

    <div v-else class="w-full max-w-lg p-6 sm:bg-white rounded-lg sm:shadow-md">
      <div class="flex flex-col items-center space-y-4">
        <!-- Group Image -->
        <img :src="group.image" alt="Group Image" class="w-24 h-24 rounded-full object-cover shadow">

        <!-- Group Name -->
        <h1 class="text-2xl font-semibold text-gray-800">
          You’re invited to join {{ group.name }}
        </h1>

        <!-- Join Button -->
        <n-button type="primary" class="w-full mt-4" @click="joinGroup">
          Join Group
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional styling */
</style>
