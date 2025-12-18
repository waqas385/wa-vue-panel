<template>
  <AuthLayout>
    <!-- Page content -->
    <template #default>
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Support</h1>
      </header>

      <section class="mb-8">
        <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 class="text-lg font-semibold text-gray-800">Business & Customers Support</h2>
          <div class="w-full sm:w-64">
            <SearchInput />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="space-y-4">
            <CheckboxGroup />
            <PartnerList />
            <Heading />
          </div>

          <BusinessList />
        </div>
      </section>

      <hr class="my-8 border-gray-300" />

      <section class="mb-8">
        <FormDemo />
      </section>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/components/layouts/AuthLayout.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import CheckboxGroup from '@/components/CheckboxGroup.vue'
  import PartnerList from '@/components/PartnerList.vue'
  import BusinessList from '@/components/BusinessList.vue'
  import FormDemo from '@/components/FormDemo.vue'
  import Heading from '@/components/Heading.vue'
</script>
