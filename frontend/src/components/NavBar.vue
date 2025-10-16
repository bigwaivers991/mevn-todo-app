<template>
  <nav class="gradient-bg text-white shadow">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <router-link to="/" class="text-xl font-bold tracking-tight">TripTrove</router-link>
      </div>

      <div class="hidden md:flex items-center space-x-4">
        <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
        <router-link to="/trips" class="px-3 py-2 rounded-md text-sm font-medium">My Trips</router-link>
        <router-link to="/profile" class="px-3 py-2 rounded-md text-sm font-medium">Profile</router-link>
        <router-link to="/contact" class="px-3 py-2 rounded-md text-sm font-medium">Contact</router-link>
      </div>

      <div class="flex items-center space-x-3">
        <template v-if="!user">
          <router-link to="/login" class="px-4 py-2 rounded-md bg-white text-primary-700">Login</router-link>
          <router-link to="/register" class="px-4 py-2 rounded-md border border-white">Register</router-link>
        </template>
        <template v-else>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-white text-primary-700 flex items-center justify-center font-bold">
              {{ user.username.charAt(0).toUpperCase() }}
            </div>
            <div class="hidden sm:block">
              <div class="text-sm font-semibold">{{ user.username }}</div>
              <div class="text-xs text-white/80">{{ user.email }}</div>
            </div>
            <button @click="signOut" class="px-3 py-1 rounded bg-white bg-opacity-20">Sign out</button>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    signOut() {
      this.$emit('logout');
    }
  }
}
</script>

<style scoped>
.gradient-bg { background: linear-gradient(135deg, #38b2ac 0%, #ed8936 100%); }
</style>
