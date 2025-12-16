<template>
  <div class="space-y-8">
    <!-- Section Toggle -->
    <div class="mb-6 flex items-center gap-4">
      <h2 class="text-lg font-semibold">Form Components Demo</h2>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Enable All Fields</span>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            v-model="allFieldsEnabled"
            class="peer sr-only"
            @change="toggleAllFields"
          />
          <div
            class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"
          ></div>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Text Fields -->
        <div class="card">
          <h3 class="mb-4 font-medium text-gray-700">Text Fields</h3>
          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                class="input-field"
                :class="{ 'disabled-field': !allFieldsEnabled }"
                placeholder="Enter your name"
                v-model="name"
                :disabled="!allFieldsEnabled"
              />
              <p class="mt-1 text-xs text-gray-500">Disabled when toggle is off</p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                class="input-field"
                :class="{ 'disabled-field': !allFieldsEnabled }"
                placeholder="Enter your email"
                v-model="email"
                :disabled="!allFieldsEnabled"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                class="input-field"
                :class="{ 'disabled-field': !allFieldsEnabled }"
                placeholder="Enter your password"
                v-model="password"
                :disabled="!allFieldsEnabled"
              />
            </div>

            <!-- Disabled Text Field Example -->
            <div>
              <label class="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>Disabled Read-only Field</span>
                <span class="badge badge-disabled">Always Disabled</span>
              </label>
              <input
                type="text"
                class="input-field disabled-field"
                value="This field is always disabled"
                disabled
                readonly
              />
            </div>
          </div>
        </div>

        <!-- Radio Buttons -->
        <div class="card">
          <h3 class="mb-4 font-medium text-gray-700">Radio Buttons</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input
                type="radio"
                name="plan"
                value="basic"
                v-model="selectedPlan"
                class="radio-field"
                :class="{ 'disabled-radio': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <div>
                <span
                  :class="{ 'text-gray-900': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }"
                  >Basic Plan</span
                >
                <p
                  class="text-sm"
                  :class="{ 'text-gray-500': allFieldsEnabled, 'text-gray-300': !allFieldsEnabled }"
                >
                  $9/month
                </p>
              </div>
            </label>

            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input
                type="radio"
                name="plan"
                value="pro"
                v-model="selectedPlan"
                class="radio-field"
                :class="{ 'disabled-radio': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <div>
                <span
                  :class="{ 'text-gray-900': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }"
                  >Pro Plan</span
                >
                <p
                  class="text-sm"
                  :class="{ 'text-gray-500': allFieldsEnabled, 'text-gray-300': !allFieldsEnabled }"
                >
                  $19/month
                </p>
              </div>
            </label>

            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input
                type="radio"
                name="plan"
                value="enterprise"
                v-model="selectedPlan"
                class="radio-field"
                :class="{ 'disabled-radio': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <div>
                <span
                  :class="{ 'text-gray-900': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }"
                  >Enterprise Plan</span
                >
                <p
                  class="text-sm"
                  :class="{ 'text-gray-500': allFieldsEnabled, 'text-gray-300': !allFieldsEnabled }"
                >
                  $49/month
                </p>
              </div>
            </label>

            <!-- Disabled Radio Example -->
            <label class="disabled-label flex items-center gap-3">
              <input
                type="radio"
                name="plan"
                value="disabled"
                class="radio-field disabled-radio"
                disabled
              />
              <div>
                <span class="text-gray-400">Disabled Plan</span>
                <p class="text-sm text-gray-300">Unavailable</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Dropdown Select -->
        <div class="card">
          <h3 class="mb-4 font-medium text-gray-700">Dropdown Select</h3>
          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Country</label>
              <select
                class="select-field"
                :class="{ 'disabled-select': !allFieldsEnabled }"
                v-model="selectedCountry"
                :disabled="!allFieldsEnabled"
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Business Type</label>
              <select
                class="select-field"
                :class="{ 'disabled-select': !allFieldsEnabled }"
                v-model="selectedBusinessType"
                :disabled="!allFieldsEnabled"
              >
                <option value="">Select business type</option>
                <option value="spa">Spa & Beauty</option>
                <option value="salon">Hair Salon</option>
                <option value="clinic">Medical Clinic</option>
                <option value="wellness">Wellness Center</option>
              </select>
            </div>

            <!-- Disabled Select Example -->
            <div>
              <label class="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>Disabled Select</span>
                <span class="badge badge-disabled">Read Only</span>
              </label>
              <select class="select-field disabled-select" disabled>
                <option value="disabled" selected>Always Disabled Selection</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Checkbox Group -->
        <div class="card">
          <h3 class="mb-4 font-medium text-gray-700">Notifications</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input
                type="checkbox"
                v-model="notifications.email"
                class="checkbox-field"
                :class="{ 'disabled-checkbox': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <span
                :class="{ 'text-gray-700': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }"
                >Email notifications</span
              >
            </label>

            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input
                type="checkbox"
                v-model="notifications.sms"
                class="checkbox-field"
                :class="{ 'disabled-checkbox': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <span
                :class="{ 'text-gray-700': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }"
                >SMS notifications</span
              >
            </label>

            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input
                type="checkbox"
                v-model="notifications.push"
                class="checkbox-field"
                :class="{ 'disabled-checkbox': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <span
                :class="{ 'text-gray-700': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }"
                >Push notifications</span
              >
            </label>

            <!-- Disabled Checkbox Example -->
            <label class="disabled-label flex items-center gap-3">
              <input type="checkbox" class="checkbox-field disabled-checkbox" disabled checked />
              <span class="text-gray-400">Disabled notification (always checked)</span>
            </label>
          </div>
        </div>

        <!-- Buttons -->
        <div class="card">
          <h3 class="mb-4 font-medium text-gray-700">Buttons</h3>
          <div class="flex flex-wrap gap-3">
            <button
              class="btn btn-primary"
              :class="{ 'btn-disabled': !allFieldsEnabled }"
              :disabled="!allFieldsEnabled"
            >
              Primary Button
            </button>
            <button
              class="btn btn-secondary"
              :class="{ 'btn-disabled': !allFieldsEnabled }"
              :disabled="!allFieldsEnabled"
            >
              Secondary Button
            </button>
            <button class="btn bg-error text-white hover:bg-error-dark">Always Enabled</button>
            <button class="btn btn-disabled" disabled>Always Disabled</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const allFieldsEnabled = ref(true)

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const selectedPlan = ref('basic')
  const selectedCountry = ref('')
  const selectedBusinessType = ref('')

  const notifications = reactive({
    email: true,
    sms: false,
    push: true
  })

  const toggleAllFields = () => {
    // Reset form values when disabling
    if (!allFieldsEnabled.value) {
      name.value = ''
      email.value = ''
      password.value = ''
      selectedCountry.value = ''
      selectedBusinessType.value = ''
      notifications.email = false
      notifications.sms = false
      notifications.push = false
    } else {
      // Restore default values when enabling
      notifications.email = true
      notifications.push = true
      selectedPlan.value = 'basic'
    }
  }
</script>
