<template>
  <!-- Mobile Burger Button -->
  <button
    class="fixed right-4 top-4 z-50 rounded-md bg-primary p-2 text-white shadow lg:hidden"
    @click="(isMobileOpen = !isMobileOpen)"
  >
    <SvgIcon name="menu" size="24" v-if="!isMobileOpen" />
    <SvgIcon name="cross" size="24" v-else />
  </button>

  <!-- Sidebar -->
  <aside
    :class="[
      'sidebar fixed left-0 top-0 z-40 flex h-full flex-col bg-sidebar transition-all duration-300 lg:static',

      // ✅ Mobile slide-down only
      isMobileOpen ? 'w-full translate-y-0' : '-translate-y-full lg:translate-y-0',

      // ✅ Desktop collapse width only
      isDesktop && !isMobileOpen ? (isCollapsed ? 'w-20' : 'w-72') : 'w-72'
    ]"
  >
    <!-- Collapse/Expand Button (Desktop Only) -->
    <button
      @click="toggleSidebar"
      class="absolute -right-3 top-8 z-10 hidden h-8 w-8 rounded-full border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md lg:block"
    >
      <SvgIcon v-if="isCollapsed" size="24" name="expand" class="text-neutral-600" />
      <SvgIcon v-else size="24" name="collapse" class="text-neutral-600" />
    </button>

    <!-- Logo/Title Area -->
    <div class="mx-6 py-6">
      <div v-if="!isCollapsed || !isDesktop || isMobileOpen" class="text-sidebar">
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
    <nav class="sidebar-scrollbar flex-1 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.id"
        :to="item.path"
        class="sidebar-item group"
        :class="[
          item.active ? 'active' : '',
          isDesktop && isCollapsed ? 'justify-center px-3' : ''
        ]"
        @click="handleItemClick"
      >
        <SvgIcon size="24" :name="item.icon" class="h-5 w-5 flex-shrink-0" />

        <!-- Animated label (desktop only) -->
        <div
          class="overflow-hidden transition-[width,opacity] duration-300"
          :class="[
            isDesktop && isCollapsed
              ? 'w-0 opacity-0'
              : isDesktop
                ? 'ml-2 w-auto opacity-100'
                : 'ml-2 w-auto opacity-100'
          ]"
        >
          <span class="block whitespace-nowrap transition-opacity duration-300">
            {{ item.name }}
          </span>
        </div>
      </router-link>
    </nav>

    <!-- User Profile -->
    <div class="sticky bottom-6 mt-6 p-5" v-show="!isCollapsed || !isDesktop || isMobileOpen">
      <ProfileMenu />
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import SvgIcon from '@/components/svgicon/SvgIcon.vue'
  import ProfileMenu from '@/components/sidebar/ProfileMenu.vue'
  import type { NavItem } from '@/types/navitems'
  import { IconName } from '../svgicon'

  const route = useRoute()

  const isCollapsed = ref(false)
  const isMobileOpen = ref(false)
  const isDesktop = ref(window.innerWidth >= 1024)

  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 1024
  })

  const toggleSidebar = () => {
    if (isDesktop.value) {
      isCollapsed.value = !isCollapsed.value
    }
  }

  const handleItemClick = () => {
    isMobileOpen.value = false // ✅ auto-close on mobile
  }

  const navItems = computed<NavItem[]>(() =>
    [
      { id: 1, name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
      { id: 2, name: 'Customer Management', icon: 'people', path: '/customers' },
      { id: 3, name: 'Business Management', icon: 'briefcase', path: '/' },
      { id: 4, name: 'Support', icon: 'lifeguard', path: '/' },
      { id: 5, name: 'Partners/Galaxies', icon: 'people', path: '/' },
      { id: 6, name: 'Bookings', icon: 'calendar', path: '/' },
      { id: 7, name: 'Reports', icon: 'report', path: '/' },
      { id: 8, name: 'Payments', icon: 'payment', path: '/' },
      { id: 9, name: 'Settings', icon: 'setting', path: '/' },
      { id: 10, name: 'Reviews', icon: 'star', path: '/' }
    ].map((item) => ({
      ...item,
      icon: item.icon as IconName,
      active: route.path === item.path
    }))
  )
</script>

<style scoped>
  /* Tailwind handles everything */
</style>
