import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: 'personal',
        component: () => import('../views/profile/ProfileData.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/profile/ProfileOrders')
      },
      {
        path: 'favourites',
        component: () => import('../views/profile/ProfileFavourites.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
