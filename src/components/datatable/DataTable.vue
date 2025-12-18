<template>
  <div class="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
    <!-- Scrollable Table (header + body together) -->
    <div class="overflow-x-auto">
      <table class="min-w-full table-fixed divide-y divide-neutral-200">
        <!-- Header -->
        <DataTableHeader :columns="columnsWithActions" />

        <!-- Body -->
        <tbody class="divide-y divide-neutral-100">
          <!-- Loading -->
          <tr v-if="loading">
            <td :colspan="columnsWithActions.length">
              <slot name="loading">
                <DataTableEmpty message="Loading..." />
              </slot>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-else-if="rows.length === 0">
            <td :colspan="columnsWithActions.length">
              <slot name="empty">
                <DataTableEmpty message="No records found." />
              </slot>
            </td>
          </tr>

          <!-- Rows -->
          <DataTableRow
            v-else
            v-for="row in rows"
            :key="row.id"
            :row="row"
            :columns="columns"
            :actions="actions"
            @view="$emit('view', row)"
            @edit="$emit('edit', row)"
            @delete="$emit('delete', row)"
          >
            <template v-for="col in columns" #[`cell-${col.key}`]="slotProps">
              <slot :name="`cell-${col.key}`" v-bind="slotProps" />
            </template>
          </DataTableRow>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <DataTablePagination
      :page="page"
      :pageSize="pageSize"
      :total="total"
      @update:page="$emit('update:page', $event)"
      @update:pageSize="$emit('update:pageSize', $event)"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import DataTableHeader from './DataTableHeader.vue'
  import DataTableRow from './DataTableRow.vue'
  import DataTablePagination from './DataTablePagination.vue'
  import DataTableEmpty from './DataTableEmpty.vue'

  interface Column {
    key: string
    label: string
    width?: string
  }

  const props = defineProps<{
    rows: any[]
    columns: Column[]
    page: number
    pageSize: number
    total: number
    loading?: boolean
    actions?: {
      view?: boolean
      edit?: boolean
      delete?: boolean
    }
  }>()

  defineEmits(['update:page', 'update:pageSize', 'view', 'edit', 'delete'])

  const hasActions = computed(
    () => props.actions && (props.actions.view || props.actions.edit || props.actions.delete)
  )

  const columnsWithActions = computed(() => {
    if (!hasActions.value) return props.columns
    return [...props.columns, { key: '__actions', label: 'Actions', width: '120px' }]
  })
</script>

<style>
  .shadow-left {
    box-shadow: -4px 0 6px -2px rgba(0, 0, 0, 0.05);
  }
</style>
