<template>
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-semibold mb-4">Your profile</h2>

    <div v-if="user" class="grid grid-cols-1 gap-3">
      <div>
        <label class="text-sm text-gray-500">Username</label>
        <div v-if="!isEditingUsername" class="flex items-center justify-between mt-1">
            <div class="text-lg font-medium">{{ user.username }}</div>
            <button @click="isEditingUsername = true" class="text-blue-500 hover:underline text-sm">Edit</button>
          </div>
        <div v-else class="flex items-center mt-1 gap-2">
        <input
          v-model="editUsername"
          class="px-3 py-2 border rounded w-full"
          type="text"
        />
        <button @click="saveUsername" class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
          Save
        </button>
        <button @click="cancelEdit" class="text-gray-500 hover:underline text-sm">
          Cancel
        </button>
      </div>
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
    return { user: null, 
      isEditingUsername: false,
      editUsername: '',
    };
  },
  methods: {
    async refresh() {
      try {
        const res = await api.get('/api/auth/me');
        this.user = res.data.user;
        this.editUsername = res.data.user.username;
      } catch (err) {
        this.user = null;
      }
    },
   async saveUsername() {
  try {
    const userId = this.user._id || this.user.id;
    if (!userId) {
      alert('User ID missing. Please log in again.');
      return;
    }

    const res = await api.put(`/api/auth/${userId}/username`, {
      username: this.editUsername,
    });

    this.user = res.data.user || res.data;
    this.isEditingUsername = false;
    alert('✅ Username updated!');
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || '❌ Failed to update username');
  }
}
  },

  mounted() {
    this.refresh();
  },
};
</script>
