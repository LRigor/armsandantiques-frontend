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
      path: '/product/:slug',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
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
