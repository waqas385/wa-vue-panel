<template>
  <Dialog :open="open" @close="emit('close')">
    <!-- Header -->
    <template #header>
      <h2 class="text-xl font-semibold text-gray-900">Customer Details</h2>
    </template>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium text-gray-900">
          {{ customer?.name ?? '—' }}
        </h3>
      </div>

      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table class="min-w-full divide-y divide-gray-200">
          <tbody class="divide-y divide-gray-200">
            <tr>
              <th
                class="w-1/3 bg-gray-50 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500"
              >
                Name
              </th>
              <td class="px-4 py-3 text-sm text-gray-900">
                {{ customer?.name ?? '—' }}
              </td>
            </tr>

            <tr>
              <th
                class="bg-gray-50 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500"
              >
                Email
              </th>
              <td class="px-4 py-3 text-sm text-gray-900">
                {{ customer?.email ?? '—' }}
              </td>
            </tr>

            <tr>
              <th
                class="bg-gray-50 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500"
              >
                Phone
              </th>
              <td class="px-4 py-3 text-sm text-gray-900">
                {{ customer?.phone ?? '—' }}
              </td>
            </tr>

            <tr>
              <th
                class="bg-gray-50 px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500"
              >
                Gender
              </th>
              <td class="px-4 py-3 text-sm text-gray-900">
                {{ genderLabel(customer?.gender ?? null) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <button
        @click="emit('close')"
        class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
      >
        Close
      </button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import Dialog from '@/components/ui/Dialog.vue'
  import { Customer, Gender } from './types/interface'

  const props = defineProps<{
    open: boolean
    customer: Customer | null
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const genderLabel = (gender: Gender) => {
    if (!gender) return '—'
    if (gender === 'male') return 'Male'
    if (gender === 'female') return 'Female'
    return 'Other'
  }
</script>
