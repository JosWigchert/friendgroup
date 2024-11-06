<script setup lang="ts">
import { ChevronDownOutline } from '@vicons/ionicons5'

const { isLoading, hasGroup, groups, selectedGroup, selectGroup } = useFriendgroup()

const groupOptions = computed(() => {
  return groups.value.map(group => ({
    key: group.id,
    label: group.name,
  }))
})

function handleGroupSelect(key: string) {
  selectGroup(key)
}

// TODO: make popselect
</script>

<template>
  <NDropdown v-if="hasGroup" :options="groupOptions" @select="handleGroupSelect">
    <div class="flex items-center cursor-pointer space-x-2">
      <NSkeleton v-if="isLoading" text :width="96" />
      <span v-else class="text-gray-800 font-medium">{{ selectedGroup ? selectedGroup?.name : "Select a group" }}</span>
      <NIcon size="20" :component="ChevronDownOutline" />
    </div>
  </NDropdown>
</template>
