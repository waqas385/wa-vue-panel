<template>
  <AuthLayout>
    <template #default>
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Customers Management</h1>
      </header>

      <section class="mb-8">
        <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 class="text-lg font-semibold text-gray-800">
            Manage your customer information and interactions
          </h2>

          <div class="w-full sm:w-64">
            <SearchInput v-model="search" placeholder="Search customers..." />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6">
          <CustomersList
            :search="search"
            @on-user-delete="showConfirmDialog"
            @on-user-view="showViewUser"
            @on-user-edit="editUser"
            :refresh="refreshList"
          />
        </div>
      </section>
    </template>

    <template #dialogs>
      <ConfirmDialog
        :open="showDeleteUserConfirm"
        title="Confirm user deletion"
        confirmText="Delete"
        cancelText="Cancel"
        @confirm="onDeleteUser"
        @close="(showDeleteUserConfirm = false)"
      >
        <p>
          Are you sure you want to delete user
          <span class="font-bold">{{ deleteUser?.name }}</span
          >?
        </p>
      </ConfirmDialog>
      <CustomerView
        :open="showViewUserDialog"
        :customer="viewUser"
        @close="(showViewUserDialog = false)"
      ></CustomerView>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useApi } from '@/composables/useApi'
  import AuthLayout from '@/components/layouts/AuthLayout.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
  import CustomersList from './CustomerList.vue'
  import { Customer } from './types/customers'
  import CustomerView from './CustomerView.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const api = useApi()
  const search = ref('')
  const deleteUser = ref<Customer | null>(null)
  const viewUser = ref<Customer | null>(null)
  const showDeleteUserConfirm = ref(false)
  const showViewUserDialog = ref(false)
  const refreshList = ref(0)

  const showConfirmDialog = (user: Customer) => {
    showDeleteUserConfirm.value = true
    deleteUser.value = user
  }

  const showViewUser = (user: Customer) => {
    viewUser.value = user
    showViewUserDialog.value = true
  }

  const onDeleteUser = async () => {
    if (!deleteUser.value?.id) return

    try {
      await api.delete(`users/${deleteUser.value.id}`)
      refreshList.value++
    } catch (error) {
      console.error('Delete failed:', error)
    } finally {
      showDeleteUserConfirm.value = false
    }
  }

  const editUser = (user: Customer) => {
    router.push('/customers/' + user.id + '/edit')
  }
</script>
