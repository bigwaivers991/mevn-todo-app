<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6 text-center">Create account</h2>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">Username</label>
        <input v-model="form.username" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="form.email" type="email" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Password</label>
        <input v-model="form.password" type="password" class="w-full p-2 border rounded" required />
      </div>

      <button class="w-full py-2 rounded btn-primary">Create account</button>
    </form>

    <div class="mt-4 text-sm text-center">
      Already have an account? <router-link class="text-primary-500" to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import { register } from '../services/auth';

export default {
  data() {
    return { form: { username: '', email: '', password: '' } };
  },
  methods: {
    async submit() {
      try {
        await register(this.form);
        this.$router.push('/tasks');
        this.$emit('user-updated');
      } catch (err) {
        alert(err?.response?.data?.message || 'Registration failed');
      }
    }
  }
}
</script>
