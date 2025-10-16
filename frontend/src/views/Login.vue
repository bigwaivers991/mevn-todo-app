<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Email or Username</label>
        <input v-model="form.emailOrUsername" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Password</label>
        <input v-model="form.password" type="password" class="w-full p-2 border rounded" required />
      </div>
      <button class="w-full py-2 rounded btn-primary">Login</button>
    </form>

    <div class="mt-4 text-sm text-center">
      Don't have an account? <router-link class="text-primary-500" to="/register">Create one</router-link>
    </div>
  </div>
</template>

<script>
import { login } from '../services/auth';

export default {
  data() {
    return { form: { emailOrUsername: '', password: '' } };
  },
  methods: {
    async submit() {
      try {
        await login({ emailOrUsername: this.form.emailOrUsername, password: this.form.password });
        // notify parent to reload user
        this.$root?.$emit?.('user-updated');
        this.$router.push('/tasks');
        // try to call parent event so App reloads user (we also emit)
        this.$emit('user-updated');
      } catch (err) {
        alert(err?.response?.data?.message || 'Login failed');
      }
    }
  }
}
</script>
