import type { FriendGroup } from '@prisma/client'

export default function useFriendgroup() {
    const { $client } = useNuxtApp()

    const isLoading = ref(false)
    const hasGroup = computed(() => groups.value.length > 0)
    const groups = ref<FriendGroup[]>([])
    const selectedGroup = ref<FriendGroup|undefined>(undefined)

    const update = async () => {
        isLoading.value = true
        const friendgroups = await $client.friendGroup.getFriendgroups.query()
        if (friendgroups.error) {
            groups.value = []
            selectedGroup.value = undefined
        } else if (friendgroups.data) {
            groups.value = friendgroups.data
            selectedGroup.value = groups.value[0]
        }
        isLoading.value = false
    }

    const selectGroup = async(group: FriendGroup) => {
        isLoading.value = true
        const result = await $client.friendGroup.updateDefaultGroup.mutate({ groupId: group.id });
        if (!result.error) {
            selectedGroup.value = group
        }
        isLoading.value = false

        return result
    }

    const createGroup = async(group: FriendGroup) => {
        isLoading.value = true
        const result = await $client.friendGroup.create.mutate({ 
            name: group.name, 
            description: group.description, 
            image: group.image 
        }); 
        if (!result.error) {
            update()
        }
        isLoading.value = false

        return result
    }

    update();

    return {
        hasGroup,
        groups,
        selectedGroup,
        update,
        selectGroup,
        createGroup
    }
}