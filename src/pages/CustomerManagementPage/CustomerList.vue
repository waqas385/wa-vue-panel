<template>
  <DataTable
    :rows="customers"
    :columns="columns"
    :page="page"
    :pageSize="pageSize"
    :total="total"
    :loading="loading"
    :actions="{ view: true, edit: true, delete: true }"
    @update:page="onPageChange"
    @update:pageSize="onPageSizeChange"
    @view="onView"
    @edit="onEdit"
    @delete="onDelete"
  >
    <template #cell-status="{ row }">
      <span
        class="rounded px-2 py-1 text-xs font-medium"
        :class="row.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
      >
        {{ row.status }}
      </span>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import DataTable from '@/components/datatable/DataTable.vue'
  import { useApi } from '@/composables/useApi'
  import { Customer } from './types/interface'

  const props = defineProps<{
    search: string
    refresh: number
  }>()

  const emit = defineEmits(['onUserDelete', 'onUserView', 'onUserEdit'])

  let debounceTimer: any = null
  const api = useApi()
  /* ✅ State */
  const customers = ref<Customer[]>([])
  const loading = ref(true)

  /* ✅ Pagination */
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  /* ✅ Table Columns */
  const columns = [
    { key: 'name', label: 'Name', width: '180px' },
    { key: 'email', label: 'Email', width: '220px' },
    { key: 'phone', label: 'Phone', width: '160px' },
    { key: 'gender', label: 'Gender', width: '80px' }
  ]

  /* ✅ Fetch customers from API */
  async function loadCustomers() {
    loading.value = true

    try {
      const response = await api.get('users', {
        params: {
          page: page.value,
          take: pageSize.value,
          order: 'ASC',
          search: props.search || ''
        }
      })

      if (response.ok && response.data) {
        customers.value = response.data.data
        total.value = response.data.meta.itemCount
        page.value = response.data.meta.page
        pageSize.value = response.data.meta.take
      }
    } catch (error) {
      console.error('Error loading customers:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(loadCustomers)
  watch(
    () => props.search,
    (newValue) => {
      clearTimeout(debounceTimer)

      debounceTimer = setTimeout(() => {
        loadCustomers()
      }, 400)
    }
  )
  /* ✅ Refresh watcher (triggered after delete) */
  watch(
    () => props.refresh,
    () => {
      loadCustomers()
    }
  )

  /* ✅ Pagination handlers */
  function onPageChange(newPage: number) {
    page.value = newPage
    loadCustomers()
  }

  function onPageSizeChange(newSize: number) {
    pageSize.value = newSize
    page.value = 1
    loadCustomers()
  }

  /* ✅ Action handlers */
  const onView = (row: Customer) => emit('onUserView', row)
  const onEdit = (row: Customer) => emit('onUserEdit', row)
  const onDelete = (row: Customer) => emit('onUserDelete', row)
</script>
