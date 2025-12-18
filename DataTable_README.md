# 📊 DataTable — Quick Usage Guide

The `DataTable` component provides a flexible, server‑driven table with pagination, loading states, custom cell rendering, and built‑in action buttons (View / Edit / Delete).

This is the **recommended usage pattern** inside your pages or feature components.

---

## ✅ Basic Example

```vue
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
  <!-- Custom cell example -->
  <template #cell-status="{ row }">
    <span
      class="rounded px-2 py-1 text-xs font-medium"
      :class="row.status === 'active'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700'"
    >
      {{ row.status }}
    </span>
  </template>
</DataTable>
```

---

## ✅ Columns Definition

```ts
const columns = [
  { key: 'name', label: 'Name', width: '180px' },
  { key: 'email', label: 'Email', width: '220px' },
  { key: 'phone', label: 'Phone', width: '160px' },
  { key: 'gender', label: 'Gender', width: '80px' }
]
```

Each column automatically renders a cell unless you override it using a slot:

```vue
<template #cell-email="{ row }">
  <span class="text-blue-600 underline">{{ row.email }}</span>
</template>
```

---

## ✅ Server‑Side Data Fetching

The table is designed for **server‑side pagination + search**:

```ts
async function loadCustomers() {
  loading.value = true

  const response = await api.get('users', {
    params: {
      page: page.value,
      take: pageSize.value,
      order: 'ASC',
      search: props.search || ''
    }
  })

  if (response.ok) {
    customers.value = response.data.data
    total.value = response.data.meta.itemCount
    page.value = response.data.meta.page
    pageSize.value = response.data.meta.take
  }

  loading.value = false
}
```

---

## ✅ Pagination Handlers

```ts
function onPageChange(newPage: number) {
  page.value = newPage
  loadCustomers()
}

function onPageSizeChange(newSize: number) {
  pageSize.value = newSize
  page.value = 1
  loadCustomers()
}
```

---

## ✅ Search & Refresh Watchers

```ts
watch(() => props.search, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(loadCustomers, 400)
})

watch(() => props.refresh, loadCustomers)
```

---

## ✅ Action Handlers

```ts
const onView = (row) => emit('onUserView', row)
const onEdit = (row) => emit('onUserEdit', row)
const onDelete = (row) => emit('onUserDelete', row)
```

---

# ✅ Summary

The DataTable component gives you:

- ✅ Server‑side pagination  
- ✅ Customizable columns  
- ✅ Custom cell slots (`cell-{key}`)  
- ✅ Built‑in actions (view/edit/delete)  
- ✅ Loading + empty states  
- ✅ Sticky action column  
- ✅ Clean API for real‑world CRUD tables  

This usage pattern is ideal for:

- Customer lists  
- User management  
- Orders / invoices  
- Any paginated dataset  

