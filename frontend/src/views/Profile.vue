<template>
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-semibold mb-4">Your profile</h2>

    <div v-if="user" class="grid grid-cols-1 gap-3">
      <div>
        <label class="text-sm text-gray-500">Username</label>
        <div class="text-lg font-medium">{{ user.username }}</div>
      </div>
      <div>
        <label class="text-sm text-gray-500">Email</label>
        <div class="text-lg">{{ user.email }}</div>
      </div>
      <div>
        <label class="text-sm text-gray-500">Member since</label>
        <div>{{ new Date(user.createdAt).toLocaleString() }}</div>
      </div>
      <div class="pt-4">
        <button @click="refresh" class="px-4 py-2 rounded btn-primary">Refresh</button>
      </div>
    </div>

    <div v-else class="text-center py-6">
      <p>Please login to view your profile.</p>
      <router-link to="/login" class="inline-block mt-3 px-4 py-2 rounded btn-primary">Login</router-link>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { user: null };
  },
  methods: {
    async refresh() {
      try {
        const res = await api.get('/api/auth/me');
        this.user = res.data.user;
      } catch (err) {
        this.user = null;
      }
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>
