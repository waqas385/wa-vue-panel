<template>
    <div class="sidebar-profile flex items-center gap-3 rounded-lg p-3 relative" ref="profileMenuRef">
        <div class="sidebar-profile-initials flex h-10 w-10 items-center justify-center rounded-full">
            <span class="font-semibold">JD</span>
        </div>
        <div class="min-w-0 flex-1">
            <p class="truncate font-medium text-white">John Doe</p>
            <p class="truncate text-sm text-white opacity-80">Admin</p>
        </div>

        <!-- Three-dot menu button -->
        <div class="relative">
            <button @click="toggleProfileMenu"
                class="flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/20">
                <SvgIcon name="dotted" class="h-5 w-5" />
            </button>

            <!-- Dropdown Menu -->
            <div v-if="showProfileMenu"
                class="absolute bottom-full right-0 z-50 mb-2 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg"
                @click.stop>
                <!-- Profile Info -->
                <div class="border-b border-neutral-100 px-4 py-3">
                    <p class="font-medium text-neutral-900">John Doe</p>
                    <p class="text-sm text-neutral-500">john.doe@example.com</p>
                </div>

                <!-- Menu Items -->
                <button @click="handleMenuClick('profile')"
                    class="flex w-full items-center gap-3 px-4 py-3 text-left text-neutral-700 transition-colors hover:bg-neutral-50">
                    <SvgIcon name="profile" class="h-5 w-5 text-neutral-500" />
                    <span>My Profile</span>
                </button>

                <button @click="handleMenuClick('account')"
                    class="flex w-full items-center gap-3 px-4 py-3 text-left text-neutral-700 transition-colors hover:bg-neutral-50">
                    <SvgIcon name="setting" class="h-5 w-5 text-neutral-500" />
                    <span>Account Settings</span>
                </button>

                <button @click="handleMenuClick('help')"
                    class="flex w-full items-center gap-3 px-4 py-3 text-left text-neutral-700 transition-colors hover:bg-neutral-50">
                    <SvgIcon name="help" class="h-5 w-5 text-neutral-500" />
                    <span>Help & Support</span>
                </button>

                <div class="my-1 border-t border-neutral-100"></div>

                <button @click="handleMenuClick('logout')"
                    class="flex w-full items-center gap-3 px-4 py-3 text-left text-error transition-colors hover:bg-error-light">
                    <SvgIcon name="out" class="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
         <ConfirmDialog
            :open="showConfirm"
            title="Confirm logout"
            message="Are you sure you want to logout?"
            confirmText="Logout"
            cancelText="Cancel"
            @confirm="logout"
            @close="showConfirm = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { useClickOutside } from '@/composables/useClickOutside'
import SvgIcon from '@/components/svgicon/SvgIcon.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const router = useRouter()
const api = useApi()
const showProfileMenu = ref(false)
const showConfirm = ref(false)
const profileMenuRef = ref<HTMLElement | null>(null)

const toggleProfileMenu = () => {
    showProfileMenu.value = !showProfileMenu.value
}

useClickOutside(profileMenuRef, () => {
    showProfileMenu.value = false
})


const clearAuthData = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    localStorage.removeItem('token_expiry')
    api.clearToken()
}

const logout = () => {
    clearAuthData()
    router.push('/login')
}


const handleMenuClick = (action: string) => {
    showProfileMenu.value = false
    console.log('Menu action:', action)

    switch (action) {
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
            showConfirm.value=true
            break
    }
}


</script>
