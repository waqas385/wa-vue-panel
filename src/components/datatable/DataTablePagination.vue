<template>
  <div
    class="flex flex-col gap-4 border-t border-neutral-200 px-4 py-4 md:flex-row md:items-center md:justify-between"
  >
    <!-- Info -->
    <div class="text-sm text-neutral-600">
      Showing <b>{{ start }}</b> to <b>{{ end }}</b> of <b>{{ total }}</b> entries
    </div>

    <!-- Controls -->
    <div class="flex flex-wrap items-center gap-4">
      <!-- Prev -->
      <button
        class="rounded border px-3 py-1 text-sm disabled:opacity-40"
        :disabled="page === 1"
        @click="$emit('update:page', page - 1)"
      >
        Prev
      </button>

      <!-- Page Selector -->
      <div class="flex items-center gap-2">
        <span>Page</span>
        <select class="rounded border px-2 py-1 text-sm" v-model="localPage" @change="updatePage">
          <option v-for="p in totalPages" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>

      <!-- Items per page -->
      <div class="flex items-center gap-2">
        <span>Show</span>
        <select
          class="rounded border px-2 py-1 text-sm"
          v-model="localPageSize"
          @change="updatePageSize"
        >
          <option v-for="n in [5, 8, 10, 15, 20]" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <!-- Next -->
      <button
        class="rounded border px-3 py-1 text-sm disabled:opacity-40"
        :disabled="page === totalPages"
        @click="$emit('update:page', page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'

  const props = defineProps<{
    page: number
    pageSize: number
    total: number
  }>()

  const emit = defineEmits(['update:page', 'update:pageSize'])

  const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

  const start = computed(() => (props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1))

  const end = computed(() => Math.min(props.page * props.pageSize, props.total))

  const localPage = ref(props.page)
  const localPageSize = ref(props.pageSize)

  watch(
    () => props.page,
    (v) => (localPage.value = v)
  )
  watch(
    () => props.pageSize,
    (v) => (localPageSize.value = v)
  )

  const updatePage = () => emit('update:page', Number(localPage.value))
  const updatePageSize = () => emit('update:pageSize', Number(localPageSize.value))
</script>
