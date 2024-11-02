<script setup>
import { ChevronDownOutline, CloseOutline, MenuOutline } from '@vicons/ionicons5'

const isMobileMenuOpen = ref(false)
const { status, data, signOut } = useAuth()

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const friendGroups = ref([
  { id: '1', name: 'Weekend Warriors' },
  { id: '2', name: 'Book Club' },
  { id: '3', name: 'Travel Buddies' },
])

const selectedGroup = ref(friendGroups.value[0]?.name)

// Define dropdown options for friend groups
const groupOptions = ref(friendGroups.value.map(group => ({
  key: group.id,
  label: group.name,
})))

// Redirect to the group page on selection
function handleGroupSelect(key) {
  const selected = friendGroups.value.find(group => group.id === key)
  if (selected) {
    selectedGroup.value = selected.name
    router.push(`/friendgroups/${selected.id}`)
  }
}

// Watch for changes in friendGroups to update dropdown options
watchEffect(() => {
  groupOptions.value = friendGroups.value.map(group => ({
    key: group.id,
    label: group.name,
  }))
})
</script>

<template>
  <header class="flex items-center justify-between p-4 bg-white shadow-md md:flex-row">
    <div class="flex items-center space-x-4">
      <!-- Logo and Title -->
      <NuxtLink to="/" class="text-xl font-semibold text-gray-800">
        FriendGroup
      </NuxtLink>

      <!-- Friend Group Dropdown -->
      <NDropdown :options="groupOptions" @select="handleGroupSelect">
        <div class="flex items-center cursor-pointer space-x-2">
          <span class="text-gray-800 font-medium">{{ selectedGroup }}</span>
          <NIcon size="20" :component="ChevronDownOutline" />
        </div>
      </NDropdown>
    </div>

    <nav class="hidden space-x-6 md:flex ml-auto">
      <a href="#features" class="hover:text-blue-600 content-center">Features</a>
      <a href="#pricing" class="hover:text-blue-600 content-center">Pricing</a>
      <NuxtLink href="/friendgroups" class="hover:text-blue-600 content-center">Groups</NuxtLink>
      <NButton type="primary">
        Try for Free
      </NButton>
    </nav>

    <NButton v-if="status === 'unauthenticated'" type="primary" ghost class="ml-auto md:ml-4" @click="navigateToSignin">
      Login
    </NButton>
    <NAvatar
      v-else class="ml-auto md:ml-4 cursor-pointer" round :src="data.user.image" size="medium"
      @click="signOut"
    />

    <button class="md:hidden focus:outline-none ml-4" @click="toggleMobileMenu">
      <NIcon size="24" :component="isMobileMenuOpen ? CloseOutline : MenuOutline" />
    </button>

    <div
      v-show="isMobileMenuOpen"
      class="absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col space-y-4 p-4 md:hidden overflow-hidden transition-all duration-300 ease-in-out"
      :class="isMobileMenuOpen ? 'max-h-96' : 'max-h-0'"
    >
      <a href="#features" class="hover:text-blue-600" @click="toggleMobileMenu">Features</a>
      <a href="#pricing" class="hover:text-blue-600" @click="toggleMobileMenu">Pricing</a>
      <a href="#about" class="hover:text-blue-600" @click="toggleMobileMenu">About</a>
      <NButton type="primary" class="w-full" @click="toggleMobileMenu">
        Try for Free
      </NButton>
    </div>
  </header>
</template>

<style scoped>
.max-h-96 {
    max-height: 24rem;
}

.max-h-0 {
    max-height: 0;
}
</style>
