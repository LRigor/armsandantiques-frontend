<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { reactive, computed, onMounted, onUnmounted } from 'vue'

const state = reactive({
  showCategoryMenu: false,
  isScrollingDown: false,
  lastScrollY: 0,
  ticking: false,
})

const toggleCategoryMenu = (): void => {
  state.showCategoryMenu = !state.showCategoryMenu
}

const updateScrollState = (): void => {
  const currentScrollY = window.scrollY
  const scrollDifference = currentScrollY - state.lastScrollY

  if (Math.abs(scrollDifference) > 50) {
    state.isScrollingDown = currentScrollY > state.lastScrollY
    state.lastScrollY = currentScrollY
  }

  state.ticking = false
}

const handleScroll = (): void => {
  if (!state.ticking) {
    requestAnimationFrame(updateScrollState)
    state.ticking = true
  }
}

const submenuPaddingClass = computed(() => {
  return state.isScrollingDown ? 'py-2' : 'py-6'
})

const submenuTopClass = computed(() => {
  return state.isScrollingDown ? 'top-[102px]' : 'top-[120px]'
})

const logoSizeClass = computed(() => {
  return state.isScrollingDown ? 'scale-[0.85]' : 'scale-100'
})

const headerGapClass = computed(() => {
  return state.isScrollingDown ? 'gap-0' : 'gap-4'
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  state.lastScrollY = window.scrollY
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="text-white sticky top-0 z-50 font-roboto font-medium">
    <div class="bg-black">
      <div
        class="flex flex-row items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-between py-3"
      >
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-4">
            <img
              src="/logo.png"
              alt="Logo"
              class="transition-transform duration-300"
              :class="logoSizeClass"
            />
          </RouterLink>
        </div>
        <div class="flex flex-col transition-all duration-300" :class="headerGapClass">
          <div class="bg-black">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-end items-center py-2 text-sm">
                <div class="flex items-center space-x-10">
                  <a
                    href="tel:+18559273393"
                    class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon icon="heroicons-outline:phone" class="w-4 h-4" />
                    <span>+1 (855) 927-3393</span>
                  </a>
                  <a
                    href="mailto:info@armsandantiques.com"
                    class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon icon="heroicons-outline:envelope" class="w-4 h-4" />
                    <span>info@armsandantiques.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-lg">
            <div class="flex justify-between items-center">
              <!-- Desktop Navigation -->
              <nav class="hidden lg:flex items-center space-x-6">
                <div
                  @click="toggleCategoryMenu"
                  class="text-white cursor-pointer hover:text-gray-300 px-3 font-medium transition-colors flex items-center gap-2"
                  active-class="text-gray-300 font-semibold"
                >
                  <span>Items for Sale</span>
                  <Icon
                    icon="heroicons-outline:chevron-down"
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': state.showCategoryMenu }"
                  />
                </div>

                <RouterLink
                  to="/sold-items"
                  class="text-white hover:text-gray-300 px-3 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  Sold Items
                </RouterLink>

                <RouterLink
                  to="/about"
                  class="text-white hover:text-gray-300 px-3 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  About Us
                </RouterLink>

                <RouterLink
                  to="/sell-to-us"
                  class="text-white hover:text-gray-300 px-3 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  Sell to Us
                </RouterLink>

                <RouterLink
                  to="/contact"
                  class="text-white hover:text-gray-300 px-3 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  Contact Us
                </RouterLink>

                <RouterLink
                  to="/subscribe"
                  class="text-white hover:text-gray-300 px-3 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  Subscribe to Updates
                </RouterLink>
              </nav>

              <div class="flex items-center space-x-4">
                <button
                  class="p-2 text-white hover:text-gray-300 transition-colors flex items-center gap-2"
                  aria-label="Search"
                >
                  <span>Search</span>
                  <Icon icon="heroicons-outline:search" class="w-5 h-5 rotate-90 text-[#f8e6ad]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-black/90 absolute left-0 w-full transition-all duration-300"
      :class="submenuTopClass"
    >
      <div
        v-show="state.showCategoryMenu"
        class="max-w-7xl mx-auto flex flex-row border-t border-[#858585] gap-12 text-xl text-[#ccc] transition-all duration-300"
        :class="submenuPaddingClass"
      >
        <RouterLink
          to="/for-sale"
          class="py-2 transition-colors font-medium hover:text-[#f8e6ad]"
          active-class="text-[#f8e6ad]"
        >
          View All
        </RouterLink>
        <RouterLink
          to="/for-sale/india"
          class="py-2 transition-colors font-medium hover:text-[#f8e6ad]"
          active-class="text-[#f8e6ad]"
        >
          India
        </RouterLink>
        <RouterLink
          to="/for-sale/china-east-asia-tibet"
          class="py-2 transition-colors font-medium hover:text-[#f8e6ad]"
          active-class="text-[#f8e6ad]"
        >
          China, East Asia, Tibet
        </RouterLink>
        <RouterLink
          to="/for-sale/middle-east-ottoman-turkey-persia"
          class="py-2 transition-colors font-medium hover:text-[#f8e6ad]"
          active-class="text-[#f8e6ad]"
        >
          Middle East, Ottoman Turkey, Persia
        </RouterLink>
        <RouterLink
          to="/for-sale/europe"
          class="py-2 transition-colors font-medium hover:text-[#f8e6ad]"
          active-class="text-[#f8e6ad]"
        >
          Europe
        </RouterLink>
        <RouterLink
          to="/for-sale/islamic-antiques"
          class="py-2 transition-colors font-medium hover:text-[#f8e6ad]"
          active-class="text-[#f8e6ad]"
        >
          Islamic Antiques
        </RouterLink>
      </div>
    </div>
  </header>
</template>
