<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NIcon, NInput, NModal } from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'

const router = useRouter()

const friendGroups = ref([
  { id: 1, name: 'Weekend Warriors' },
  { id: 2, name: 'Book Club' },
  { id: 3, name: 'Travel Buddies' },
])

const showModal = ref(false)
const newGroupName = ref('')

function openModal() {
  showModal.value = true
}

function addFriendGroup() {
  if (newGroupName.value) {
    friendGroups.value.push({
      id: friendGroups.value.length + 1,
      name: newGroupName.value,
    })
    newGroupName.value = ''
    showModal.value = false
  }
}

function goToGroup(id) {
  router.push(`/friendgroups/${id}`)
}
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        My Friend Groups
      </h1>
      <NButton type="primary" @click="openModal">
        <NIcon size="24" class="mr-2" :component="AddOutline" />
        Create Friend Group
      </NButton>
    </div>

    <!-- List of Friend Groups -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="group in friendGroups"
        :key="group.id"
        class="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-50"
        @click="goToGroup(group.id)"
      >
        <h2 class="text-lg font-medium text-gray-700">
          {{ group.name }}
        </h2>
      </div>
    </div>

    <!-- Create Friend Group Modal -->
    <NModal v-model:show="showModal" title="Create New Friend Group" size="small">
      <div class="flex flex-col space-y-4">
        <NInput
          v-model:value="newGroupName"
          placeholder="Enter friend group name"
          autofocus
        />
        <NButton type="primary" block @click="addFriendGroup">
          Add Group
        </NButton>
      </div>
    </NModal>
  </div>
</template>
