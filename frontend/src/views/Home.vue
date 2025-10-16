<template>
  <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <h1 class="text-4xl font-bold mb-4">Organize your day with TaskTamer</h1>
      <p class="text-gray-700 mb-6">A clean, minimal to-do experience with secure authentication and task management. Add, update, complete, and delete tasks — all synced to your account.</p>
      <div class="flex space-x-3">
        <router-link to="/register" class="px-6 py-3 rounded btn-primary">Get Started — Free</router-link>
        <router-link to="/tasks" class="px-6 py-3 rounded border">View Tasks</router-link>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="font-semibold mb-3">Quick Tips</h3>
      <ul class="text-sm text-gray-600 space-y-2">
        <li>Use priorities to focus on top tasks.</li>
        <li>Set due dates to plan your week.</li>
        <li>Edit or delete tasks anytime.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>
