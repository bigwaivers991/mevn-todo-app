<template>
  <div class="max-w-6xl mx-auto px-6 py-12 space-y-16">
    <!-- Hero Section -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <!-- Left Side -->
      <div>
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-[#0B1132]">
          Plan your next adventure with TripTrove
        </h1>
        <p class="text-gray-700 mb-6 leading-relaxed">
          Every great journey starts with a solid plan — and we’re here to make that easier for you.
          Track destinations, dates, budgets, and accommodations in one simple dashboard.
          From spontaneous weekend getaways to bucket-list adventures, TripTrove helps turn your travel dreams into real experiences.
        </p>
        <div class="flex space-x-4">
          <router-link
            to="/trips"
            class="px-6 py-3 rounded-lg bg-[#0B1132] text-white hover:bg-[#1a2270] transition"
          >
            Start Planning
          </router-link>
          <router-link
            to="/trips"
            class="px-6 py-3 rounded-lg border border-[#0B1132] text-[#0B1132] hover:bg-[#0B1132] hover:text-white transition"
          >
            View Trips
          </router-link>
        </div>
      </div>

      <!-- Hero Image -->
      <div>
        <img
          src="/images/travel.jpg"
          alt="Trip inspiration"
          class="rounded-2xl shadow-md w-full h-[450px] md:h-[500px] lg:h-[550px] object-cover object-center"
        />
      </div>
    </section>

    <!-- Additional Info Section -->
    <section>
      <h2 class="text-3xl font-bold text-center text-[#0B1132] mb-8">
        From Beaches to Metros — Explore It All
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Destination 1 -->
        <div class="overflow-hidden rounded-2xl hover:shadow-xl transition">
          <img
            src="/images/beach.jpg"
            alt="Beach paradise"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 text-center">
            <h3 class="font-semibold text-[#0B1132]">Tropical Getaway</h3>
            <p class="text-sm text-gray-600">
              Find your peace in the islands’ warm embrace.
            </p>
          </div>
        </div>

        <!-- Destination 2 -->
        <div class="overflow-hidden rounded-2xl hover:shadow-xl transition">
          <img
            src="/images/mountain.jpg"
            alt="Mountain escape"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 text-center">
            <h3 class="font-semibold text-[#0B1132]">Mountain Adventures</h3>
            <p class="text-sm text-gray-600">
              Chase the clouds and conquer new heights.
            </p>
          </div>
        </div>

        <!-- Destination 3 -->
        <div class="overflow-hidden rounded-2xl hover:shadow-xl transition">
          <img
            src="/images/city.jpg"
            alt="Urban getaway"
            class="w-full h-60 object-cover"
          />
          <div class="p-4 text-center">
            <h3 class="font-semibold text-[#0B1132]">Urban Exploration</h3>
            <p class="text-sm text-gray-600">
              Lights, culture, and a dash of chaos — explore it all.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
img {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

img:hover {
  transform: scale(1.05) translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

</style>
