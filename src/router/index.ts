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
    },
    {
      path: '/for-sale',
      name: 'for-sale',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path: '/for-sale/:region',
      name: 'for-sale-region',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path: '/sold',
      name: 'sold',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path: '/sold/:region',
      name: 'sold-for-region',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      path: '/museum',
      name: 'museum',
      component: () => import('@/views/MuseumView.vue'),
    },
    {
      path: '/museum/:slug',
      name: 'museum-slug',
      component: () => import('@/views/MuseumDetailView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/CustomView.vue'),
    },
    {
      path: '/guarantee',
      name: 'guarantee',
      component: () => import('@/views/CustomView.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/CustomView.vue'),
    },
    {
      path: '/free-shipping',
      name: 'free-shipping',
      component: () => import('@/views/CustomView.vue'),
    },
    {
      path: '/our-library',
      name: 'our-library',
      component: () => import('@/views/CustomView.vue'),
    },
    {
      path: '/sell-to-us',
      name: 'sell-to-us',
      component: () => import('@/views/SellToUsView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactUsView.vue'),
    },
    {
      path: '/request-more-info/:slug',
      name: 'request-more-info',
      component: () => import('@/views/RequestMoreInfoView.vue'),
    },
    {
      path: '/request-price/:slug',
      name: 'request-price',
      component: () => import('@/views/RequestPriceView.vue'),
    },
    {
      path: '/wire-transfer',
      name: 'wire-transfer',
      component: () => import('@/views/WireTransferView.vue'),
    },
    {
      path: '/checkout/:slug',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
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
