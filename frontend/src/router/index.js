import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Trips from '../views/Trips.vue';
import Profile from '../views/Profile.vue';
import Contact from '../views/Contact.vue';
import api from '../services/api'; // Use your API service instead of axios directly

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/trips', component: Trips, name: 'Trips', meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, name: 'Profile', meta: { requiresAuth: true } },
  { path: '/contact', component: Contact, name: 'Contact' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protect authenticated routes
router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next();
  
  try {
    const res = await api.get('/api/auth/me');
    if (res.data.user) return next();
    next({ name: 'Login' });
  } catch (error) {
    console.error('Auth check failed:', error);
    next({ name: 'Login' });
  }
});

export default router;