<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">{{ task ? 'Edit Task' : 'Add Task' }}</h3>
        <button @click="$emit('close')" class="text-gray-500">✕</button>
      </div>

      <form @submit.prevent="save">
        <div class="grid grid-cols-1 gap-3">
          <div>
            <label class="block text-sm font-medium">Title</label>
            <input v-model="form.title" required class="w-full border p-2 rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full border p-2 rounded"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium">Due date</label>
              <input v-model="form.dueDate" type="date" class="w-full border p-2 rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium">Priority</label>
              <select v-model="form.priority" class="w-full border p-2 rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-4">
            <button type="button" @click="$emit('close')" class="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" class="px-4 py-2 rounded btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  props: ['task'],
  data() {
    return {
      form: {
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
      }
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(t) {
        if (t) {
          this.form = {
            title: t.title || '',
            description: t.description || '',
            dueDate: t.dueDate ? t.dueDate.slice(0,10) : '',
            priority: t.priority || 'medium'
          };
        } else {
          this.form = { title: '', description: '', dueDate: '', priority: 'medium' };
        }
      }
    }
  },
  methods: {
    async save() {
      try {
        if (this.task) {
          // edit
          await api.put(`/api/tasks/${this.task._id}`, this.form);
        } else {
          await api.post('/api/tasks', this.form);
        }
        this.$emit('saved');
        this.$emit('close');
      } catch (err) {
        alert(err?.response?.data?.message || 'Failed to save task');
      }
    }
  }
}
</script>

<style scoped>
.btn-primary { background: var(--primary-500); color: white; }
</style>
