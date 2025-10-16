<template>
  <div class="min-h-screen flex flex-col">
    <NavBar :user="user" @logout="doLogout" />
    <main class="container mx-auto px-4 py-8 flex-1">
      <router-view @user-updated="loadUser" />
    </main>
    <footer class="gradient-bg text-white py-6">
      <div class="container mx-auto px-6 text-center">
        <div class="text-sm">&copy; {{ new Date().getFullYear() }} TaskTamer — Built with ❤️</div>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { me, logout } from './services/auth';

export default {
  components: { NavBar },
  data() {
    return { user: null };
  },
  methods: {
    async loadUser() {
      try {
        const res = await me();
        this.user = res.user || null;
      } catch (err) {
        this.user = null;
      }
    },
    async doLogout() {
      try {
        await logout();
      } catch (e) {
        // ignore
      }
      this.user = null;
      this.$router.push('/');
    }
  },
  mounted() {
    this.loadUser();
  }
}
</script>

<style scoped>
/* small scoped tweaks */
</style>
