<template>
  <aside 
    :class="[
      'h-full flex flex-col transition-all duration-300 relative sidebar',
      isCollapsed ? 'w-20' : 'w-72'
    ]"
  >
    <!-- Collapse/Expand Button -->
    <button
      @click="toggleSidebar"
      class="absolute -right-3 top-8 bg-white border border-neutral-200 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow z-10"
    >
      <svg 
        v-if="isCollapsed"
        class="w-4 h-4 text-neutral-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <svg 
        v-else
        class="w-4 h-4 text-neutral-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Logo/Title Area -->
    <div class="mx-6 py-6">
      <div v-if="!isCollapsed" class="text-sidebar">
        <h2 class="text-xl font-bold">Admin</h2>
        <p class="opacity-80 mt-1">Business</p>
      </div>
      <div v-else class="flex justify-center">
        <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span class="font-bold text-sm text-primary">A</span>
        </div>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="space-y-1 flex-1 overflow-y-auto sidebar-scrollbar">
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
        <svg 
          v-if="item.name === 'Customer Management'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        
        <!-- Business Management Icon -->
        <svg 
          v-else-if="item.name === 'Business Management'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        
        <!-- Support Icon -->
        <svg 
          v-else-if="item.name === 'Support'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        
        <!-- Partners Icon -->
        <svg 
          v-else-if="item.name === 'Partners/Galaxies'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        
        <!-- Bookings Icon -->
        <svg 
          v-else-if="item.name === 'Bookings'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        
        <!-- Reports Icon -->
        <svg 
          v-else-if="item.name === 'Reports'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        
        <!-- Payments Icon -->
        <svg 
          v-else-if="item.name === 'Payments'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
        
        <!-- Settings Icon -->
        <svg 
          v-else-if="item.name === 'Settings'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        
        <!-- Reviews Icon -->
        <svg 
          v-else-if="item.name === 'Reviews'" 
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        
        <!-- Default Icon -->
        <svg 
          v-else
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        
        <span 
          v-if="!isCollapsed"
          class="transition-opacity duration-200"
        >
          {{ item.name }}
        </span>
        <span 
          v-if="isCollapsed"
          class="absolute left-full ml-2 px-2 py-1 bg-neutral-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none"
        >
          {{ item.name }}
        </span>
      </a>
    </nav>

    <!-- User Profile (Sticky to Bottom) -->
    <div 
      class="sticky bottom-6 mt-6 p-5"
      v-show="!isCollapsed"
    >
      <div class="flex items-center gap-3 p-3 rounded-lg sidebar-profile">
        <div class="w-10 h-10 rounded-full flex items-center justify-center sidebar-profile-initials">
          <span class="font-semibold">JD</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-white truncate">John Doe</p>
          <p class="text-sm opacity-80 truncate text-white">Admin</p>
        </div>
        
        <!-- Three-dot menu button -->
        <div class="relative">
          <button
            @click="toggleProfileMenu"
            class="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-md transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
          
          <!-- Dropdown Menu -->
          <div 
            v-if="showProfileMenu"
            class="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50"
          >
            <!-- Profile Info -->
            <div class="px-4 py-3 border-b border-neutral-100">
              <p class="font-medium text-neutral-900">John Doe</p>
              <p class="text-sm text-neutral-500">john.doe@example.com</p>
            </div>
            
            <!-- Menu Items -->
            <button
              @click="handleMenuClick('profile')"
              class="w-full flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
            >
              <svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Profile</span>
            </button>
            
            <button
              @click="handleMenuClick('account')"
              class="w-full flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
            >
              <svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Account Settings</span>
            </button>
            
            <button
              @click="handleMenuClick('help')"
              class="w-full flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
            >
              <svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help & Support</span>
            </button>
            
            <div class="border-t border-neutral-100 my-1"></div>
            
            <button
              @click="handleMenuClick('logout')"
              class="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-light transition-colors text-left"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Click outside to close menu -->
    <div 
      v-if="showProfileMenu"
      class="fixed inset-0 z-40"
      @click="showProfileMenu = false"
    ></div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isCollapsed = ref(false)
const showProfileMenu = ref(false)
const activeNavItem = ref(1)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  // Close profile menu when collapsing sidebar
  if (isCollapsed.value) {
    showProfileMenu.value = false
  }
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const setActiveItem = (id) => {
  activeNavItem.value = id
}

const handleMenuClick = (action) => {
  showProfileMenu.value = false
  console.log('Menu action:', action)
  
  switch(action) {
    case 'profile':
      alert('Opening profile page...')
      break
    case 'account':
      alert('Opening account settings...')
      break
    case 'help':
      alert('Opening help & support...')
      break
    case 'logout':
      if (confirm('Are you sure you want to logout?')) {
        alert('Logging out...')
      }
      break
  }
}

// Close menu when clicking outside
const closeMenuOnClickOutside = (event) => {
  if (showProfileMenu.value && !event.target.closest('.relative')) {
    showProfileMenu.value = false
  }
}

// Close menu when pressing Escape key
const closeMenuOnEscape = (event) => {
  if (event.key === 'Escape' && showProfileMenu.value) {
    showProfileMenu.value = false
  }
}

// Add event listeners
onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside)
  document.addEventListener('keydown', closeMenuOnEscape)
})

// Remove event listeners
onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside)
  document.removeEventListener('keydown', closeMenuOnEscape)
})

const navItems = computed(() => [
  { id: 1, name: 'Customer Management', active: activeNavItem.value === 1 },
  { id: 2, name: 'Business Management', active: activeNavItem.value === 2 },
  { id: 3, name: 'Support', active: activeNavItem.value === 3 },
  { id: 4, name: 'Partners/Galaxies', active: activeNavItem.value === 4 },
  { id: 5, name: 'Bookings', active: activeNavItem.value === 5 },
  { id: 6, name: 'Reports', active: activeNavItem.value === 6 },
  { id: 7, name: 'Payments', active: activeNavItem.value === 7 },
  { id: 8, name: 'Settings', active: activeNavItem.value === 8 },
  { id: 9, name: 'Reviews', active: activeNavItem.value === 9 },
])
</script>

<style scoped>
/* No need for custom styles here as they're in style.css */
</style>