<template>
  <thead class="border-b border-neutral-200 bg-neutral-50">
    <tr>
      <!-- Normal columns -->
      <th
        v-for="col in displayColumns"
        :key="col.key"
        :style="{ width: col.width }"
        class="whitespace-normal break-words px-4 py-3 text-left text-sm font-semibold text-neutral-700"
      >
        {{ col.label }}
      </th>

      <!-- Sticky Actions Header -->
      <th
        v-if="hasActions"
        class="shadow-left sticky right-0 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700"
        style="width: 120px"
      >
        Actions
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Column {
    key: string
    label: string
    width?: string
  }

  const props = defineProps<{
    columns: Column[]
  }>()

  /* ✅ Filter out actions column */
  const displayColumns = computed(() => props.columns.filter((col) => col.key !== '__actions'))

  /* ✅ Detect actions column */
  const hasActions = computed(() => props.columns.some((col) => col.key === '__actions'))
</script>
