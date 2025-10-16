<template>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-semibold mb-4">Contact us</h2>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">Name</label>
        <input v-model="form.name" required class="w-full p-2 border rounded" />
      </div>
      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="form.email" type="email" required class="w-full p-2 border rounded" />
      </div>
      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">Subject</label>
        <input v-model="form.subject" class="w-full p-2 border rounded" />
      </div>
      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">Message</label>
        <textarea v-model="form.message" rows="5" class="w-full p-2 border rounded" required></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 rounded btn-primary">Send message</button>
      </div>
    </form>

    <div v-if="success" class="mt-4 text-green-600">{{ success }}</div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      form: { name: '', email: '', subject: '', message: '' },
      success: null
    };
  },
  methods: {
    async submit() {
      try {
        const res = await api.post('/api/contact', this.form);
        this.success = res.data?.message || 'Message sent';
        this.form = { name: '', email: '', subject: '', message: '' };
      } catch (err) {
        alert('Failed to send message');
      }
    }
  }
}
</script>
