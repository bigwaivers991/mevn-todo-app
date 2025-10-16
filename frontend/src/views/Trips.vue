<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">My Trips</h1>
        <p class="text-sm text-gray-600">Plan and manage your trips — add, edit, or mark as booked.</p>
      </div>
    </div>
    <TripBooker />
  </div>
</template>

<script>
import TripBooker from '../components/TripBooker.vue';
export default { components: { TripBooker } };
</script>
