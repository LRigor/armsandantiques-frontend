import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'

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
      component: HomeView,
      meta: {
        title: 'Arms and Antiques - Rare & Collectible Firearms, Antiques & Military Items',
      },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: HomeView,
      meta: {
        title: 'Catalog - Arms and Antiques',
      },
    },
    {
      path: '/catalog/:category',
      name: 'catalog-category',
      component: HomeView,
      meta: {
        title: 'Category - Arms and Antiques',
      },
    },
    {
      path: '/products/:slug',
      name: 'product',
      component: ProductView,
      meta: {
        title: 'Product - Arms and Antiques',
      },
    },
    {
      path: '/museums',
      name: 'museums',
      component: HomeView,
      meta: {
        title: 'Museums of the World - Arms and Antiques',
      },
    },
    {
      path: '/museum/:slug',
      name: 'museum',
      component: HomeView,
      meta: {
        title: 'Museum - Arms and Antiques',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: HomeView,
      meta: {
        title: 'Contact Us - Arms and Antiques',
      },
    },
    {
      path: '/sell-to-us',
      name: 'sell-to-us',
      component: HomeView,
      meta: {
        title: 'Sell to Us - Arms and Antiques',
      },
    },
    {
      path: '/request-info/:productId?',
      name: 'request-info',
      component: HomeView,
      meta: {
        title: 'Request More Info - Arms and Antiques',
      },
    },
    {
      path: '/price-request/:productId?',
      name: 'price-request',
      component: HomeView,
      meta: {
        title: 'Price on Request - Arms and Antiques',
      },
    },
    {
      path: '/wire-transfer',
      name: 'wire-transfer',
      component: HomeView,
      meta: {
        title: 'Wire Transfer - Arms and Antiques',
      },
    },
    {
      path: '/search',
      name: 'search',
      component: HomeView,
      meta: {
        title: 'Search Results - Arms and Antiques',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: HomeView,
      meta: {
        title: 'About Us - Arms and Antiques',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: HomeView,
      meta: {
        title: 'Page Not Found - Arms and Antiques',
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
