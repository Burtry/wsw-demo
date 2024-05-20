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
          path: 'advertise',
          component: () => import('@/views/advertise/index.vue')
        },
        {
          path: 'assess',
          component: () => import('@/views/assess/index.vue')
        },
        {
          path: '/management',
          name: 'management',
          component: () => import('@/views/management/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/management/components/InfoView.vue')
            },
            {
              path: 'usermanagement',
              component: () => import('@/views/management/components/admin/UserManagementView.vue')
            },
            {
              path: 'systemmanagement',
              component: () => import('@/views/management/components/admin/SystemManagement.vue')
            },
            {
              path: 'place',
              children: [
                {
                  path: 'type',
                  component: () => import('@/views/management/components/admin/TypeView.vue')
                },
                {
                  path: 'info',
                  component: () => import('@/views/management/components/admin/InfoView.vue')
                },
                {
                  path: 'reserve',
                  component: () => import('@/views/management/components/admin/ReserveView.vue')
                },
                {
                  path: 'evaluate',
                  component: () => import('@/views/management/components/admin/EvaluateView.vue')
                }
              ]
            },
            {
              path: 'equipment',
              children: [
                {
                  path: 'type',
                  component: () => import('@/views/management/components/admin/TypeView.vue')
                },
                {
                  path: 'info',
                  component: () => import('@/views/management/components/admin/InfoView.vue')
                },
                {
                  path: 'reserve',
                  component: () => import('@/views/management/components/admin/ReserveView.vue')
                },
                {
                  path: 'evaluate',
                  component: () => import('@/views/management/components/admin/EvaluateView.vue')
                }
              ]
            },

            // 用户路由
            {
              path: 'user',
              component: () => import('@/views/management/components/InfoView.vue')
            },
            {
              path: 'user/reservation',
              component: () => import('@/views/management/components/ReserveView.vue')
            },
            {
              path: 'user/rental',
              component: () => import('@/views/management/components/RentalView.vue')
            },
            {
              path: 'user/favorite',
              component: () => import('@/views/management/components/FavoriteView.vue')
            },
            // 404界面
            {
              path: ':pathMatch(.*)*',
              name: 'NotFound',
              component: () => import('@/views/management/components/404View.vue')
            }
          ]
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
