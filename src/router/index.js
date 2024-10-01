import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'
import LayoutView from '@/views/layout/index.vue'
import InfoView from '@/views/management/components/InfoView.vue'

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
          path: 'space',
          name: 'space',
          component: () => import('@/views/space/index.vue'),
        },
        {
          path: 'space/:id',
          component: () => import('@/views/detail/SpaceDetailView.vue')
        },
        {
          path: 'equipment',
          component: () => import('@/views/equipment/index.vue')
        },
        {
          path: 'equipment/:id',
          component: () => import('@/views/detail/EquipmentDetailView.vue')
        },
        {
          path: '/search',
          component: () => import('@/views/home/components/SearchView.vue')
        },
        {
          path: '/management',
          name: 'management',
          component: () => import('@/views/management/index.vue'),
          children: [
            {
              path: '',
              component: InfoView
            },
            {
              path: 'usermanagement',
              component: () => import('@/views/management/components/admin/UserManagementView.vue')
            },
            {
              path: 'system',
              component: () => import('@/views/management/components/admin/SystemManagement.vue')
            },
            {
              path: 'space',
              component: () => import('@/views/management/components/admin/SpaceView.vue')
            },

            {
              path: 'equipment',
              component: () => import('@/views/management/components/admin/EquipmentView.vue')

            },
            {
              path: 'rental',
              component: () => import('@/views/management/components/admin/RentalManagementView.vue')
            },
            {
              path: 'reserve',
              component: () => import('@/views/management/components/admin/ReserveManagementView.vue')
            },


            // 用户路由
            {
              path: 'user',
              component: () => import('@/views/management/components/InfoView.vue')
            },
            {
              path: 'user/reservation',
              component: () => import('@/views/management/components/user/ReserveView.vue')
            },
            {
              path: 'user/rental',
              component: () => import('@/views/management/components/user/RentalView.vue')
            },
            {
              path: 'user/favorite',
              component: () => import('@/views/management/components/user/FavoriteView.vue')
            },
            // 404界面
            {
              path: ':pathMatch(.*)*',
              name: 'NotFound',
              component: () => import('@/views/404/index.vue')
            }
          ]
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/404/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
