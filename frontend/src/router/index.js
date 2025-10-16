import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Tasks from '../views/Tasks.vue';
import Profile from '../views/Profile.vue';
import Contact from '../views/Contact.vue';
import axios from 'axios';

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/tasks', component: Tasks, name: 'Tasks', meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, name: 'Profile', meta: { requiresAuth: true } },
  { path: '/contact', component: Contact, name: 'Contact' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// route guard for pages that require authentication
router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next();
  try {
    // queries backend endpoint that checks token cookie
    const base = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const res = await axios.get(`${base}/api/auth/me`, { withCredentials: true });
    if (res.data.user) return next();
    return next({ name: 'Login' });
  } catch (err) {
    return next({ name: 'Login' });
  }
});

export default router;
