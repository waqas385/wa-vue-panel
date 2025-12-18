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
            <SearchInput :disabled="true" placeholder="Search customers..." />
          </div>
        </div>

        <div class="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <!-- Page Title -->
          <h1 class="mb-8 border-b bg-neutral-50 p-4 text-2xl font-semibold text-gray-900">
            Edit Customer
          </h1>

          <div class="space-y-6">
            <!-- Form Wrapper -->
            <div class="space-y-6 p-4">
              <!-- Row 1 -->
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    class="input-field"
                    placeholder="Customer name"
                    v-model="form.name"
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    class="input-field"
                    placeholder="Customer email"
                    v-model="form.email"
                  />
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                </div>
              </div>

              <!-- Row 2 -->
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    class="input-field"
                    placeholder="Phone number"
                    v-model="form.phone"
                  />
                  <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700">Gender</label>
                  <select class="select-field" v-model="form.gender">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <p v-if="errors.gender" class="mt-1 text-sm text-red-600">{{ errors.gender }}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-4 border-t p-4">
              <button @click="router.back()" class="btn btn-secondary">Cancel</button>
              <button @click="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/components/layouts/AuthLayout.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useApi } from '@/composables/useApi'

  const route = useRoute()
  const router = useRouter()
  const api = useApi()
  const customerId = route.params.id as string

  // ✅ Form state
  const form = ref({
    name: '',
    email: '',
    phone: '',
    gender: ''
  })

  // ✅ Validation errors
  const errors = ref({
    name: '',
    email: '',
    phone: '',
    gender: ''
  })

  // ✅ Validation rules
  function validate() {
    let valid = true
    errors.value = { name: '', email: '', phone: '', gender: '' }

    if (!form.value.name.trim()) {
      errors.value.name = 'Name is required'
      valid = false
    }

    if (!form.value.email.trim()) {
      errors.value.email = 'Email is required'
      valid = false
    } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
      errors.value.email = 'Invalid email format'
      valid = false
    }

    if (!form.value.phone.trim()) {
      errors.value.phone = 'Phone number is required'
      valid = false
    }

    if (!form.value.gender.trim()) {
      errors.value.gender = 'Please select a gender'
      valid = false
    }

    return valid
  }

  // ✅ Fetch customer details
  async function fetchCustomer() {
    try {
      const response = await api.get('users/' + customerId)

      if (response.ok && response.data) {
        form.value = {
          name: response.data.name ?? '',
          email: response.data.email ?? '',
          phone: response.data.phone ?? '',
          gender: response.data.gender ?? ''
        }
      }
    } catch (error) {
      console.error('Error loading customer:', error)
    }
  }

  // ✅ Submit handler (PATCH)
  async function submit() {
    if (!validate()) return

    try {
      const response = await api.patch('users/' + customerId, form.value)

      if (response.ok) {
        router.push('/customers')
      } else {
        console.error('Update failed:', response)
      }
    } catch (error) {
      console.error('Error updating customer:', error)
    }
  }

  onMounted(() => {
    fetchCustomer()
  })
</script>
