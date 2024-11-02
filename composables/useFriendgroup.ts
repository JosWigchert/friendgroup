import type { FriendGroup } from '@prisma/client'

export default function useFriendgroup() {
    const { $client } = useNuxtApp()

    const hasGroup = computed(() => groups.value.length > 0)
    const groups = ref<FriendGroup[]>([])
    const selectedGroup = ref<FriendGroup|undefined>(undefined)

    const update = async () => {
        const friendgroups = await $client.friendGroup.getFriendgroups.query()
        if (friendgroups.error) {
            groups.value = []
            selectedGroup.value = undefined
        } else if (friendgroups.data) {
            groups.value = friendgroups.data
            selectedGroup.value = groups.value[0]
        }
    }

    const selectGroup = async(group: FriendGroup) => {
        const result = await $client.friendGroup.updateDefaultGroup.mutate({ groupId: group.id });
        if (!result.error) {
            selectedGroup.value = group
        }
    }

    const createGroup = async(group: FriendGroup) => {
        const result = await $client.friendGroup.create.mutate({ 
            name: group.name, 
            description: group.description, 
            image: group.image 
        }); 
        if (!result.error) {
            update()
        }
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