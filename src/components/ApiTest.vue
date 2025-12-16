<!-- src/components/ApiTest.vue -->
<template>
  <div class="api-test">
    <h1 class="text-2xl font-bold">API Test</h1>
    
    <!-- Section 1: Basic GET -->
    <section>
      <h3>1. Get Users</h3>
      <button @click="getUsers" :disabled="getLoading">
        {{ getLoading ? 'Loading...' : 'Get Users' }}
      </button>
      <div v-if="getError" class="error">Error: {{ getError.message }}</div>
      <pre v-if="users">{{ users }}</pre>
    </section>
    
    <!-- Section 2: POST -->
    <section>
      <h3>2. Create User</h3>
      <input v-model="newUser.name" placeholder="Name" />
      <input v-model="newUser.email" placeholder="Email" />
      <button @click="createUser" :disabled="postLoading">
        {{ postLoading ? 'Creating...' : 'Create User' }}
      </button>
      <div v-if="postError" class="error">Error: {{ postError.message }}</div>
    </section>
    
    <!-- Section 3: Auth -->
    <section>
      <h3>3. Authentication</h3>
      <div v-if="!token">
        <input v-model="loginData.email" placeholder="Email" />
        <input v-model="loginData.password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
      </div>
      <div v-else>
        <p>Token: {{ token.substring(0, 20) }}...</p>
        <button @click="logout">Logout</button>
        <button @click="fetchProtected">Fetch Protected Data</button>
      </div>
    </section>
    
    <!-- Section 4: Global Loading -->
    <section>
      <h3>4. Global Status</h3>
      <p>Any request loading: {{ globalLoading ? 'Yes' : 'No' }}</p>
      <p>Active requests: {{ requestCount }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApi, useAuth } from '@/composables/useApi';

const api = useApi();
const auth = useAuth();

// 1. GET Example
const users = ref(null);
const getLoading = ref(false);
const getError = ref(null);

const getUsers = async () => {
  getLoading.value = true;
  getError.value = null;
  
  try {
    // Using JSONPlaceholder for testing
    const response = await api.get('https://jsonplaceholder.typicode.com/users');
    users.value = response.data;
  } catch (error) {
    getError.value = error;
  } finally {
    getLoading.value = false;
  }
};

// 2. POST Example
const newUser = ref({ name: '', email: '' });
const postLoading = ref(false);
const postError = ref(null);

const createUser = async () => {
  postLoading.value = true;
  postError.value = null;
  
  try {
    const response = await api.post(
      'https://jsonplaceholder.typicode.com/users',
      newUser.value
    );
    alert(`User created with ID: ${response.data.id}`);
    newUser.value = { name: '', email: '' };
  } catch (error) {
    postError.value = error;
  } finally {
    postLoading.value = false;
  }
};

// 3. Auth Example
const loginData = ref({ email: '', password: '' });
const token = ref(api.getToken());

const login = async () => {
  const response = await api.post(
    import.meta.env.VITE_API_BASE_URL+'auth/login',
    loginData.value
  );
  // For demo, we'll simulate login
  console.log(response);
  const mockToken = 'mock_jwt_token_' + Date.now();
  api.setToken(mockToken);
  token.value = mockToken;
  alert('Logged in (simulated)', response.data.message);
};

const logout = () => {
  auth.logout();
  token.value = null;
  alert('Logged out');
};

const fetchProtected = async () => {
  if (!token.value) {
    alert('Please login first');
    return;
  }
  
  try {
    // Token is automatically added to headers!
    const response = await api.get('/api/protected-data');
    console.log('Protected data:', response.data);
    alert('Protected data fetched!');
  } catch (error) {
    alert('Error fetching protected data: ' + error.message);
  }
};

// 4. Global status
const globalLoading = ref(api.loading);
const requestCount = ref(api.requestCount);

// Watch for changes
setInterval(() => {
  globalLoading.value = api.loading;
  requestCount.value = api.requestCount;
}, 100);
</script>

<style scoped>
.api-test section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.error {
  color: red;
  margin-top: 10px;
}

input {
  display: block;
  margin: 5px 0;
  padding: 8px;
  width: 200px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
}
</style>