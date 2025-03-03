import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    meta: { showHeader: false },
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Document/Home.vue')
  },
  {
    path: '/graph',
    name: 'graph',
    component: () => import('@/views/Graph/WholeGraph.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
