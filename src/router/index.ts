import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Arms and Antiques - Rare & Collectible Firearms, Antiques & Military Items',
      },
    },
    {
      path: '/for-sale',
      name: 'for-sale',
      component: () => import('@/views/ProductView.vue'),
      meta: {
        title: 'Products For Sale - Arms and Antiques',
      },
    },
    {
      path: '/for-sale/:region',
      name: 'for-sale-region',
      component: () => import('@/views/ProductView.vue'),
      meta: {
        title: 'Products For Sale - Arms and Antiques',
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/ProductView.vue'),
      meta: {
        title: 'Search Results - Arms and Antiques',
      },
    },
    {
      path: '/sold',
      name: 'sold',
      component: () => import('@/views/ProductView.vue'),
      meta: {
        title: 'Sold Items - Arms and Antiques',
      },
    },
    {
      path: '/sold/:region',
      name: 'sold-for-region',
      component: () => import('@/views/ProductView.vue'),
      meta: {
        title: 'Sold Items - Arms and Antiques',
      },
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: () => import('@/views/DetailView.vue'),
      meta: {
        title: 'Arms and Antiques - Product',
      },
    },
  ],
})

// Global navigation guard for page titles
router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
