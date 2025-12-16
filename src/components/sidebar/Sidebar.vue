<template>
  <aside
    :class="[
      'sidebar relative flex h-full flex-col transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-72'
    ]"
  >
    <!-- Collapse/Expand Button -->
    <button
      @click="toggleSidebar"
      class="absolute -right-3 top-8 z-10 rounded-full border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md w-8 h-8"
    >
      <SvgIcon
        v-if="isCollapsed"
        size="24"
        name="expand" class="text-neutral-600" />
      <SvgIcon
        v-else
        size="24"
        name="collapse" class="text-neutral-600" />
    </button>

    <!-- Logo/Title Area -->
    <div class="mx-6 py-6">
      <div v-if="!isCollapsed" class="text-sidebar">
        <h2 class="text-xl font-bold">Admin</h2>
        <p class="mt-1 opacity-80">Business</p>
      </div>
      <div v-else class="flex justify-center">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
          <span class="text-sm font-bold text-primary">A</span>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-scrollbar flex-1 space-y-1 overflow-y-auto">
      <a
        v-for="item in navItems"
        :key="item.id"
        href="#"
        :class="[
          'sidebar-item group',
          item.active ? 'active' : '',
          isCollapsed ? 'justify-center px-3' : ''
        ]"
        :title="isCollapsed ? item.name : ''"
        @click="setActiveItem(item.id)"
      >
        <!-- Customer Icon -->
        <SvgIcon
          v-if="item.name === 'Customer Management'"
          size="24"
          name="people"
          class="h-5 w-5 flex-shrink-0" />

        <!-- Business Management Icon -->
        <SvgIcon
          v-else-if="item.name === 'Business Management'"
          size="24"
          name="briefcase" class="h-5 w-5 flex-shrink-0" />
        <!-- Support Icon -->
        <SvgIcon
          v-else-if="item.name === 'Support'"
          name="lifeguard"
          size="24"
          class="h-5 w-5 flex-shrink-0"          
        />
        <!-- Partners Icon -->
        <SvgIcon
          v-else-if="item.name === 'Partners/Galaxies'"
          class="h-5 w-5 flex-shrink-0"
          name="people"
          size="24"
        />
        <!-- Bookings Icon -->
        <SvgIcon
          v-else-if="item.name === 'Bookings'"
          class="h-5 w-5 flex-shrink-0"
          name="calendar"
          size="24"
        />
        <!-- Reports Icon -->
        <SvgIcon
          v-else-if="item.name === 'Reports'"
          class="h-5 w-5 flex-shrink-0"
          name="report"
        />
        <!-- Payments Icon -->
        <SvgIcon
          v-else-if="item.name === 'Payments'"
          name="payment"
          class="h-5 w-5 flex-shrink-0"
        />
        <!-- Settings Icon -->
        <SvgIcon
          name="setting"
          v-else-if="item.name === 'Settings'"
          class="h-5 w-5 flex-shrink-0"
        />

        <!-- Reviews Icon -->
        <SvgIcon
          name="star"
          v-else-if="item.name === 'Reviews'"
          class="h-5 w-5 flex-shrink-0"
        />
        <!-- Default Icon -->
        <SvgIcon
          v-else
          name="home"
          class="h-5 w-5 flex-shrink-0"
        />

        <span v-if="!isCollapsed" class="transition-opacity duration-200">
          {{ item.name }}
        </span>
        <span
          v-if="isCollapsed"
          class="pointer-events-none absolute left-full z-20 ml-2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          {{ item.name }}
        </span>
      </a>
    </nav>

    <!-- User Profile (Sticky to Bottom) -->
    <div class="sticky bottom-6 mt-6 p-5" v-show="!isCollapsed">
      <ProfileMenu />
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import SvgIcon from '@/components/svgicon/SvgIcon.vue'
  import ProfileMenu from '@/components/sidebar/ProfileMenu.vue'

  const isCollapsed = ref(false)
  const activeNavItem = ref(1)

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
  }

  const setActiveItem = (id: number) => {
    activeNavItem.value = id
  }

  const navItems = computed(() => [
    { id: 1, name: 'Customer Management', active: activeNavItem.value === 1 },
    { id: 2, name: 'Business Management', active: activeNavItem.value === 2 },
    { id: 3, name: 'Support', active: activeNavItem.value === 3 },
    { id: 4, name: 'Partners/Galaxies', active: activeNavItem.value === 4 },
    { id: 5, name: 'Bookings', active: activeNavItem.value === 5 },
    { id: 6, name: 'Reports', active: activeNavItem.value === 6 },
    { id: 7, name: 'Payments', active: activeNavItem.value === 7 },
    { id: 8, name: 'Settings', active: activeNavItem.value === 8 },
    { id: 9, name: 'Reviews', active: activeNavItem.value === 9 }
  ])

</script>

<style scoped>
  /* No need for custom styles here as they're in style.css */
</style>
