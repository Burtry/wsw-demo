import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'
import LayoutView from '@/views/layout/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/space',
          name: 'space',
          component: () => import('@/views/space/index.vue')
        },
        {
          path: '/equipment',
          name: 'equipment',
          component: () => import('@/views/equipment/index.vue')
        }
      ]
    }
  ]
})

export default router
