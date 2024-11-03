<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'

const router = useRouter()

const { hasGroup, groups, selectedGroup, update, selectGroup, createGroup } = useFriendgroup()

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
      console.log(result.error)
    }
  }
  catch (error) {
    console.log(error)
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

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-if="hasGroup" class="flex flex-col md:flex-row w-full">
        <div v-for="group in groups" class="w-full md:w-4/12 mr-4 mb-4">
          <NCard :key="group.id" hoverable :title="group.name" @click="goToGroup(group.id)">
            <img v-if="group.image" :src="group.image">
            {{ group.description }}
          </NCard>
        </div>
      </div>
      <div v-else>
        <FriendGroupCard :is-loading="isLoading" title="No Friend Groups" description="You don't have any friend groups yet. Create one to get started! no wthere is more textand even mor eeadjkflasjflasjk faslfsalfjsaldfjks alfjl sfj salkfd " />
      </div>
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
