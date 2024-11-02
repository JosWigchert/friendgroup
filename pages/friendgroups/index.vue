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
      <div v-else-if="">
        <NCard hoverable :title="<NSkeleton height="40px" width="33%" />">
        <div class="flex flex-row">
          <NImage width="64" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F004%2F141%2F669%2Foriginal%2Fno-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg&f=1&nofb=1&ipt=3e712b018bbbfcb204eedd690f5fc63781fd7a23fa849a10e3a106d26b463399&ipo=images" />
          <div>...</div>
        </div>
        </NCard>
      </div>
      <div v-if="hasGroup" class="flex flex-col md:flex-row w-full">
        <div v-for="group in groups" class="w-full md:w-4/12 mr-4 mb-4">
          <NCard :key="group.id" hoverable :title="group.name" @click="goToGroup(group.id)">
            <img v-if="group.image" :src="group.image">
            {{ group.description }}
          </NCard>
        </div>
      </div>
      <div v-else-if="">
        <NCard hoverable title="No Friend Groups">
          <div class="flex flex-row">
            <NImage width="64" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F004%2F141%2F669%2Foriginal%2Fno-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg&f=1&nofb=1&ipt=3e712b018bbbfcb204eedd690f5fc63781fd7a23fa849a10e3a106d26b463399&ipo=images" />
            <div>...</div>
          </div>
        </NCard>
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
