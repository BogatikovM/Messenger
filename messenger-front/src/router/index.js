import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const { cookies } = useCookies()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
      meta: { requiresAuth: false }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = cookies.get('token')
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/');
      /*
      return {
        path: '/',
        query: { redirect: to.fullPath }
      }
        */
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
