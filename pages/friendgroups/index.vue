<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'

definePageMeta({
  middleware: ['auth'],
})

const { isLoading, hasGroup, groups, createGroup } = useFriendgroup()

const router = useRouter()

const showModal = ref(false)
const newGroupName = ref('')
const newGroupDescription = ref('')
const newGroupImage = ref('')

const addingGroup = ref(false)

async function createFriendGroup() {
  addingGroup.value = true
  try {
    const result = await createGroup({
      name: newGroupName.value,
      description: newGroupDescription.value,
      image: newGroupImage.value,
    })
    if (!result.error) {
      showModal.value = false
    }
    else {
      console.warn(result.error)
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    addingGroup.value = false
  }
}

function openModal() {
  showModal.value = true
}

function clearModal() {
  newGroupName.value = ''
  newGroupDescription.value = ''
  newGroupImage.value = ''
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

    <div class="flex flex-row flex-wrap">
      <template v-if="hasGroup">
        <template v-for="group in groups" :key="group.id">
          <FriendGroupCard class="mb-4 mr-6" :is-loading="isLoading" :title="group.name" :description="group.description" :image="group.image" @click="goToGroup(group.id)" />
        </template>
      </template>
      <template v-else>
        <FriendGroupCard class="mb-4 mr-6" :is-loading="isLoading" title="No Friend Groups" description="You don't have any friend groups yet. Create one to get started!" />
      </template>
    </div>

    <NModal v-model:show="showModal" title="Create New Friend Group" size="small" @after-hide="clearModal">
      <NCard title="Create New Friend Group" size="small" class="w-96">
        <NInput v-model:value="newGroupName" :disabled="addingGroup" class="my-2" placeholder="Enter friend group name" autofocus />
        <NInput v-model:value="newGroupDescription" :disabled="addingGroup" class="my-2" placeholder="Enter friend group description" />
        <NInput v-model:value="newGroupImage" :disabled="addingGroup" class="my-2" placeholder="Enter friend group image" />
        <NButton :disabled="addingGroup" class="mt-2" type="primary" block @click="createFriendGroup">
          Create Group
        </NButton>
      </NCard>
    </NModal>
  </div>
</template>
