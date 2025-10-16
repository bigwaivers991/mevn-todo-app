<template>
  <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <h1 class="text-4xl font-bold mb-4">Plan your next adventure with TripTrove</h1>
      <p class="text-gray-700 mb-6">Your personal trip planner — track destinations, dates, budgets, and bookings all in one place.</p>
      <div class="flex space-x-3">
        <router-link to="/register" class="px-6 py-3 rounded btn-primary">Start Planning</router-link>
        <router-link to="/trips" class="px-6 py-3 rounded border">View Trips</router-link>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="font-semibold mb-3">Travel Tips</h3>
      <ul class="text-sm text-gray-600 space-y-2">
        <li>Plan early to get better deals.</li>
        <li>Track your travel budget.</li>
        <li>Keep all trip details in one place.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>
