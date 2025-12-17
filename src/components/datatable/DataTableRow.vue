<template>
  <tr class="transition hover:bg-neutral-50">
    <!-- Normal cells -->
    <td
      v-for="col in columns"
      :key="col.key"
      :style="{ width: col.width }"
      class="whitespace-normal break-words px-4 py-3 text-sm text-neutral-700"
    >
      <slot :name="`cell-${col.key}`" :row="row">
        {{ row[col.key] }}
      </slot>
    </td>

    <!-- Sticky Actions Column -->
    <td
      v-if="actions && (actions.view || actions.edit || actions.delete)"
      class="shadow-left sticky right-0 whitespace-normal break-words bg-white px-4 py-3"
      style="width: 120px"
    >
      <div class="flex items-center justify-end gap-2">
        <button
          v-if="actions?.view"
          class="btn btn-secondary p-1"
          @click="$emit('view', row)"
          title="View"
        >
          <SvgIcon name="eye" size="24" />
        </button>
        <button
          v-if="actions?.edit"
          class="btn btn-secondary p-1"
          @click="$emit('edit', row)"
          title="Edit"
        >
          <SvgIcon name="edit" class="text-neutral-600" size="24" />
        </button>
        <button
          v-if="actions?.delete"
          class="btn btn-secondary p-1"
          @click="$emit('delete', row)"
          title="Delete"
        >
          <SvgIcon name="delete" class="text-neutral-600" size="24" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
  import SvgIcon from '../svgicon/SvgIcon.vue'

  interface Column {
    key: string
    label: string
    width?: string
  }

  defineProps<{
    row: any
    columns: Column[]
    actions?: {
      view?: boolean
      edit?: boolean
      delete?: boolean
    }
  }>()

  defineEmits(['view', 'edit', 'delete'])
</script>
