<template>
  <div class="api-test space-y-8">
    <h1 class="text-2xl font-bold">API Test</h1>

    <!-- 1. GET USERS -->
    <section>
      <h3 class="mb-2 font-semibold">1. Get Users</h3>
      <button @click="getUsers" :disabled="getLoading">
        {{ getLoading ? 'Loading...' : 'Get Users' }}
      </button>

      <p v-if="getError" class="error">Error: {{ getError }}</p>

      <pre v-if="users">{{ formattedUsers }}</pre>
    </section>

    <!-- 2. CREATE USER -->
    <section>
      <h3 class="mb-2 font-semibold">2. Create User</h3>

      <input v-model="newUser.name" placeholder="Name" />
      <input v-model="newUser.email" placeholder="Email" />

      <button @click="createUser" :disabled="postLoading">
        {{ postLoading ? 'Creating...' : 'Create User' }}
      </button>

      <p v-if="postError" class="error">Error: {{ postError }}</p>
    </section>

    <!-- 3. AUTH -->
    <section>
      <h3 class="mb-2 font-semibold">3. Authentication</h3>

      <div v-if="!token">
        <input v-model="loginData.email" placeholder="Email" />
        <input v-model="loginData.password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
      </div>

      <div v-else>
        <p>Token: {{ token.slice(0, 20) }}...</p>
        <button>Logout</button>
        <button @click="fetchProtected">Fetch Protected Data</button>
      </div>
    </section>

    <!-- 4. GLOBAL STATUS -->
    <section>
      <h3 class="mb-2 font-semibold">4. Global Status</h3>
      <p>Any request loading: {{ api.loading ? 'Yes' : 'No' }}</p>
      <p>Active requests: {{ api.requestCount }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useApi } from '@/composables/useApi'

  const api = useApi()

  /* -----------------------------
   1. GET USERS
----------------------------- */
  const users = ref<any[] | null>(null)
  const getLoading = ref(false)
  const getError = ref<string | null>(null)

  const formattedUsers = computed(() => (users.value ? JSON.stringify(users.value, null, 2) : ''))

  const getUsers = async () => {
    getLoading.value = true
    getError.value = null

    try {
      const res = await api.get('https://jsonplaceholder.typicode.com/users')
      users.value = res.data
    } catch (err: any) {
      getError.value = err?.message ?? 'Unknown error'
    } finally {
      getLoading.value = false
    }
  }

  /* -----------------------------
   2. CREATE USER
----------------------------- */
  const newUser = ref({ name: '', email: '' })
  const postLoading = ref(false)
  const postError = ref<string | null>(null)

  const createUser = async () => {
    postLoading.value = true
    postError.value = null

    try {
      const res = await api.post('https://jsonplaceholder.typicode.com/users', newUser.value)

      window.alert(`User created with ID: ${res.data.id}`)
      newUser.value = { name: '', email: '' }
    } catch (err: any) {
      postError.value = err?.message ?? 'Unknown error'
    } finally {
      postLoading.value = false
    }
  }

  /* -----------------------------
   3. AUTH
----------------------------- */
  const loginData = ref({ email: '', password: '' })
  const token = ref(api.getToken())

  const login = async () => {
    try {
      const res = await api.post(import.meta.env.VITE_API_BASE_URL + 'auth/login', loginData.value)

      // Simulated token
      const mockToken = 'mock_jwt_' + Date.now()
      api.setToken(mockToken)
      token.value = mockToken

      window.alert('Logged in (simulated)')
    } catch (err: any) {
      window.alert('Login failed: ' + err?.message)
    }
  }

  const fetchProtected = async () => {
    if (!token.value) {
      window.alert('Please login first')
      return
    }

    try {
      const res = await api.get('/api/protected-data')
      console.log('Protected data:', res.data)
      window.alert('Protected data fetched!')
    } catch (err: any) {
      window.alert('Error: ' + err?.message)
    }
  }
</script>
