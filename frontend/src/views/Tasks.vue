<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">My Tasks</h1>
        <p class="text-sm text-gray-600">Manage your tasks — add, edit, complete, or remove.</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="openAdd" class="px-4 py-2 rounded btn-primary">Add Task</button>
        <button @click="reload" class="px-3 py-2 rounded border">Refresh</button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">Loading...</div>
    <div v-else>
      <div v-if="tasks.length === 0" class="p-6 bg-white rounded shadow text-center">No tasks yet — create one!</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div v-for="t in tasks" :key="t._id" class="bg-white p-5 rounded-lg shadow">
          <div class="flex justify-between items-start">
            <div>
              <h3 :class="{ 'line-through': t.completed }" class="font-semibold text-lg">{{ t.title }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ t.description }}</p>
              <div class="text-xs mt-3 text-gray-500 flex items-center gap-3">
                <span>Priority: <strong class="ml-1 capitalize">{{ t.priority }}</strong></span>
                <span v-if="t.dueDate">• Due: {{ formatDate(t.dueDate) }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end space-y-2">
              <button @click="toggleComplete(t)" class="text-sm px-3 py-1 rounded bg-green-50"> {{ t.completed ? 'Undo' : 'Done' }} </button>
              <button @click="edit(t)" class="text-sm px-3 py-1 rounded border">Edit</button>
              <button @click="remove(t)" class="text-sm px-3 py-1 rounded bg-red-50">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TaskModal v-if="showModal" :task="editing" @close="closeModal" @saved="reload" />
  </div>
</template>

<script>
import api from '../services/api';
import TaskModal from '../components/TaskModal.vue';

export default {
  components: { TaskModal },
  data() {
    return {
      tasks: [],
      loading: false,
      showModal: false,
      editing: null
    };
  },
  methods: {
    async reload() {
      try {
        this.loading = true;
        const res = await api.get('/api/tasks');
        this.tasks = res.data.tasks || [];
      } catch (err) {
        alert('Could not fetch tasks. Are you logged in?');
        this.$router.push('/login');
      } finally {
        this.loading = false;
      }
    },
    openAdd() { this.editing = null; this.showModal = true; },
    edit(t) { this.editing = t; this.showModal = true; },
    closeModal() { this.showModal = false; this.editing = null; },
    async remove(t) {
      if (!confirm('Delete this task?')) return;
      try {
        await api.delete(`/api/tasks/${t._1 ?? t._id}`);
        await this.reload();
      } catch (err) {
        // fallback for id mismatch
        try {
          await api.delete(`/api/tasks/${t._id}`);
          await this.reload();
        } catch (e) {
          alert('Delete failed');
        }
      }
    },
    async toggleComplete(t) {
      try {
        await api.put(`/api/tasks/${t._id}`, { completed: !t.completed });
        await this.reload();
      } catch (err) {
        alert('Failed to update');
      }
    },
    formatDate(d) {
      if (!d) return '';
      const dt = new Date(d);
      return dt.toLocaleDateString();
    }
  },
  mounted() {
    this.reload();
  }
}
</script>
