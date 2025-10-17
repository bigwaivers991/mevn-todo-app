<template>
  <div class="min-h-screen flex flex-col">
    <NavBar :user="user" @logout="doLogout" />
    <main class="container mx-auto px-4 py-8 flex-1">
      <router-view @user-updated="loadUser" />
    </main>
    <footer class="gradient-bg text-white py-6">
      <div class="container mx-auto px-6 text-center">
        <p class="text-sm"> Your trusted travel planner for every journey.</p>
        <div class="text-sm">&copy; {{ new Date().getFullYear() }} TripTrove. All rights reserved.
</div>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { me, logout } from './services/auth';

export default {
  name: 'App',
  components: { NavBar },
  data() {
    return { 
      user: null,
      loading: true
    };
  },
  methods: {
    async loadUser() {
      try {
        console.log('Loading user...');
        const res = await me();
        this.user = res.user || null;
        console.log('User loaded:', this.user);
      } catch (err) {
        console.error('Error loading user:', err);
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
    async doLogout() {
      try {
        await logout();
      } catch (e) {
        console.error('Logout error:', e);
      }
      this.user = null;
      this.$router.push('/');
    }
  },
  async mounted() {
    // Make loadUser available to child components
    this.$root.loadUser = this.loadUser;
    
    // Load user on app start
    await this.loadUser();
    
    // Listen for user updates from child components
    this.$root.$on('user-updated', this.loadUser);
  },
  beforeUnmount() {
    this.$root.$off('user-updated', this.loadUser);
  }
}
</script>
