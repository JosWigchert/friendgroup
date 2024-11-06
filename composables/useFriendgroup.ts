import type { FriendGroup } from '@prisma/client'

export default function useFriendgroup() {
  const { $client } = useNuxtApp()

  const isLoading = ref(false)
  const groups = ref<FriendGroup[]>([])
  const hasGroup = computed(() => groups.value.length > 0)
  const selectedGroup = ref<FriendGroup | undefined>(undefined)

  const getDefaultGroup = async () => {
    isLoading.value = true
    const defaultGroup = await $client.friendGroup.getDefaultGroup.query()
    if (defaultGroup.error) {
      selectedGroup.value = undefined
    }
    else {
      selectedGroup.value = defaultGroup.data
    }
    isLoading.value = false
  }

  const update = async () => {
    isLoading.value = true
    const friendgroups = await $client.friendGroup.getFriendgroups.query()
    if (friendgroups.error) {
      groups.value = []
    }
    else if (friendgroups.data) {
      groups.value = friendgroups.data
    }
    isLoading.value = false
  }

  const selectGroup = async (groupId: string) => {
    isLoading.value = true
    const result = await $client.friendGroup.updateDefaultGroup.mutate({
      groupId,
    })
    if (!result.error) {
      selectedGroup.value = groups.value.find(group => group.id === groupId)
    }
    isLoading.value = false

    return result
  }

  const createGroup = async (group: FriendGroup) => {
    isLoading.value = true
    const result = await $client.friendGroup.create.mutate({
      name: group.name,
      description: group.description,
      image: group.image
    })
    if (!result.error) {
      update()
    }
    isLoading.value = false

    return result
  }

  getDefaultGroup()
  update()

  return {
    isLoading,
    hasGroup,
    groups,
    selectedGroup,
    update,
    selectGroup,
    createGroup
  }
}
