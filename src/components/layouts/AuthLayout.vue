<template>
  <div class="grid min-h-screen grid-cols-1 bg-gray-50 lg:grid-cols-[auto_1fr]">

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="overflow-auto">
      <div class="p-8">
        <slot />
      </div>
    </div>

    <!-- Global Dialogs -->
    <slot name="dialogs" />

    <!-- Floating Buttons -->
    <slot name="floating" />

  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
</script>