<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { NTag } from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'

definePageMeta({
  middleware: ['auth'],
})

const { $client } = useNuxtApp()

const route = useRoute()
const groupId = route.params.id

const showModal = ref(false)
const inviteLink = ref('')

const groupResult = await $client.friendGroup.get.query({ groupId })
if (groupResult.error) {
  console.warn(groupResult.error)
}
const group = ref(groupResult.data)
console.info(group.value)

function openModal() {
  showModal.value = true
}

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
    <div class="flex flex-col md:flex-row gap-4">
      <div
        v-for="user in group?.members" :key="user.name"
        class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between w-full sm:w-96"
      >
        <div class="text-gray-700 font-medium">
          {{ user.user.name }}
        </div>
        <NTag :type="user.role === 'ADMIN' ? 'info' : user.role === 'FOUNDER' ? 'success' : undefined">
          {{ user.role }}
        </NTag>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <NButton type="primary" class="w-full" @click="openModal">
          <NIcon size="24" class="mr-2" :component="AddOutline" />
          Add Member
        </NButton>
      </div>
    </div>
    <NModal v-model:show="showModal">
      <InviteQRCodeModalContent :invite-link="`http://localhost:3000/friendgroups/invite/${groupId}`" />
    </NModal>
  </div>
</template>
