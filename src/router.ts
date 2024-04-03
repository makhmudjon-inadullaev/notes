import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'
import CallbackView from './views/CallbackView.vue'
import { useAuthStore } from './store/auth.store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/callback',
    component: CallbackView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if(authStore.isLogged()) {
    if(to.path === '/login')
      return '/'
    return next()
  }
  return handleNotLogged(to, from, next)
})

async function handleNotLogged(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  const authStore = useAuthStore();
  if (!to?.query?.code && !to?.query?.state) {
    await authStore.login();
  }
  next();
}