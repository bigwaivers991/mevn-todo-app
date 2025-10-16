<template>
  <div class="trip-booker p-4 max-w-3xl mx-auto">
    <h2 class="text-2xl font-semibold mb-4">Trip Booker</h2>

    <!-- Add trip form -->
    <form @submit.prevent="addTrip" class="mb-6 bg-white p-4 rounded shadow">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input v-model="form.destination" placeholder="Destination (city, country)" required class="p-2 border rounded" />
        <input v-model="form.people" type="number" min="1" placeholder="People" class="p-2 border rounded" />
        <input v-model="form.startDate" type="date" required class="p-2 border rounded" />
        <input v-model="form.endDate" type="date" required class="p-2 border rounded" />
        <input v-model="form.price" type="number" placeholder="Budget / price" class="p-2 border rounded" />
        <select v-model="form.booked" class="p-2 border rounded">
          <option :value="false">Not Booked</option>
          <option :value="true">Booked</option>
        </select>
      </div>
      <textarea v-model="form.notes" placeholder="Notes" class="mt-3 p-2 border rounded w-full"></textarea>
      <div class="mt-3 flex gap-2">
        <button class="px-4 py-2 rounded bg-blue-600 text-white" type="submit">Add Trip</button>
        <button type="button" class="px-4 py-2 rounded border" @click="resetForm">Reset</button>
      </div>
    </form>

    <!-- Trip list -->
    <div v-if="trips.length === 0" class="text-gray-500">No trips yet — add one!</div>
    <ul>
      <li v-for="trip in trips" :key="trip._id" class="mb-3 bg-white p-3 rounded shadow flex flex-col md:flex-row md:justify-between">
        <div class="flex-1">
          <div class="flex items-baseline justify-between">
            <h3 class="text-lg font-medium">{{ trip.destination }} <span class="text-sm text-gray-500">({{ formatDate(trip.startDate) }} → {{ formatDate(trip.endDate) }})</span></h3>
            <div class="text-sm">
              <span v-if="trip.booked" class="px-2 py-1 rounded bg-green-100 text-green-800">Booked</span>
              <span v-else class="px-2 py-1 rounded bg-yellow-100 text-yellow-800">Planned</span>
            </div>
          </div>
          <div class="text-sm text-gray-600 mt-1">People: {{ trip.people }} • Budget: ${{ trip.price }}</div>
          <p class="mt-2 text-sm">{{ trip.notes }}</p>
        </div>

        <!-- actions -->
        <div class="mt-3 md:mt-0 md:ml-4 flex flex-col gap-2">
          <button @click="toggleBooked(trip)" class="px-3 py-1 rounded border text-sm">
            {{ trip.booked ? 'Unbook' : 'Mark as Booked' }}
          </button>
          <button @click="startEdit(trip)" class="px-3 py-1 rounded border text-sm">Edit</button>
          <button @click="deleteTrip(trip._id)" class="px-3 py-1 rounded border text-sm text-red-600">Delete</button>
        </div>
      </li>
    </ul>

    <!-- simple edit modal/area -->
    <div v-if="editing" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white p-4 rounded w-full max-w-lg">
        <h4 class="font-semibold mb-2">Edit Trip</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input v-model="editing.destination" class="p-2 border rounded" />
          <input v-model="editing.people" type="number" class="p-2 border rounded" />
          <input v-model="editing.startDate" type="date" class="p-2 border rounded" />
          <input v-model="editing.endDate" type="date" class="p-2 border rounded" />
          <input v-model="editing.price" type="number" class="p-2 border rounded" />
          <select v-model="editing.booked" class="p-2 border rounded">
            <option :value="false">Not Booked</option>
            <option :value="true">Booked</option>
          </select>
        </div>
        <textarea v-model="editing.notes" class="mt-2 p-2 border rounded w-full"></textarea>
        <div class="mt-3 flex gap-2 justify-end">
          <button @click="saveEdit" class="px-4 py-2 rounded bg-green-600 text-white">Save</button>
          <button @click="cancelEdit" class="px-4 py-2 rounded border">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const trips = ref([]);
const form = ref({
  destination: '',
  startDate: '',
  endDate: '',
  people: 1,
  price: 0,
  notes: '',
  booked: false
});

const editing = ref(null);

const apiBase = '/api/trips';

function formatDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString();
}

function resetForm() {
  form.value = {
    destination: '',
    startDate: '',
    endDate: '',
    people: 1,
    price: 0,
    notes: '',
    booked: false
  };
}

async function loadTrips() {
  try {
    const res = await api.get(apiBase);
    trips.value = res.data;
  } catch (err) {
    console.error('loadTrips', err);
    if (err.response?.status === 401) {
      alert('Please login to view trips');
      window.location.href = '/login';
    }
  }
}

async function addTrip() {
  try {
    if (new Date(form.value.endDate) < new Date(form.value.startDate)) {
      alert('End date must be after start date');
      return;
    }
    const res = await api.post(apiBase, form.value);
    trips.value.push(res.data);
    resetForm();
  } catch (err) {
    console.error('addTrip', err);
    alert(err.response?.data?.message || 'Could not create trip');
  }
}

async function deleteTrip(id) {
  if (!confirm('Delete this trip?')) return;
  try {
    await api.delete(`${apiBase}/${id}`);
    trips.value = trips.value.filter(t => t._id !== id);
  } catch (err) {
    console.error('deleteTrip', err);
    alert('Could not delete trip');
  }
}

function startEdit(trip) {
  editing.value = { 
    ...trip,
    startDate: trip.startDate.split('T')[0],
    endDate: trip.endDate.split('T')[0]
  };
}

function cancelEdit() {
  editing.value = null;
}

async function saveEdit() {
  try {
    const id = editing.value._id;
    const payload = { ...editing.value };
    delete payload._id;
    delete payload.__v;
    delete payload.createdAt;
    delete payload.updatedAt;
    
    const res = await api.put(`${apiBase}/${id}`, payload);
    const idx = trips.value.findIndex(t => t._id === id);
    if (idx !== -1) trips.value[idx] = res.data;
    editing.value = null;
  } catch (err) {
    console.error('saveEdit', err);
    alert(err.response?.data?.message || 'Could not save changes');
  }
}

async function toggleBooked(trip) {
  try {
    const res = await api.put(`${apiBase}/${trip._id}`, { booked: !trip.booked });
    const idx = trips.value.findIndex(t => t._id === trip._id);
    if (idx !== -1) trips.value[idx] = res.data;
  } catch (err) {
    console.error('toggleBooked', err);
  }
}

onMounted(loadTrips);
</script>

<style scoped>
.trip-booker { color: #111827; }
</style>