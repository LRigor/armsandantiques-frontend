<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { reactive, computed, onMounted, onUnmounted, ref, watch } from 'vue'
import SubscribeModal from './SubscribeModal.vue'

const router = useRouter()
const route = useRoute()

const state = reactive({
  showCategoryMenu: false,
  isScrollingDown: false,
  lastScrollY: 0,
  ticking: false,
  showSearchBox: false,
  searchQuery: '',
  showMainMenu: false,
})

const toggleCategoryMenu = (): void => {
  state.showCategoryMenu = !state.showCategoryMenu
}

const toggleSearchBox = (): void => {
  state.showSearchBox = !state.showSearchBox
}

const handleSearch = (): void => {
  if (state.searchQuery) {
    toggleSearchBox()
    router.push('/search?type=all&q=' + state.searchQuery)
  }
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
  return state.isScrollingDown ? 'lg:py-2' : 'lg:py-6'
})

const logoSizeClass = computed(() => {
  return state.isScrollingDown ? 'scale-[0.85]' : 'scale-100'
})

const headerGapClass = computed(() => {
  return state.isScrollingDown ? 'lg:gap-0' : 'lg:gap-4'
})

const subscribeModalVisible = ref(false)
const subscribeDialogVisible = () => {
  subscribeModalVisible.value = true
}

const toggleMainMenu = () => {
  state.showMainMenu = !state.showMainMenu
  // Prevent body scroll when menu is open
  if (state.showMainMenu) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// Watch for route changes and close mobile menu
watch(
  () => route.path,
  () => {
    state.showMainMenu = false
    // Restore body scroll when menu closes
    document.body.style.overflow = ''
  },
)

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
    <div class="bg-[#1b1b1b] lg:bg-black">
      <div
        class="relative flex flex-row items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-between py-3 lg:py-0"
      >
        <!-- Logo -->
        <div class="flex items-center flex-row gap-2">
          <RouterLink to="/" class="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              class="transition-transform duration-300 hidden lg:block"
              :class="logoSizeClass"
            />
            <span class="text-base block lg:hidden">Arms and Antiques</span>
          </RouterLink>
          <div class="block lg:hidden cursor-pointer" @click="toggleMainMenu">
            <Icon icon="heroicons-outline:bars-3" class="w-6 h-6" />
          </div>
        </div>
        <div class="flex flex-row lg:flex-col transition-all duration-300" :class="headerGapClass">
          <div
            class="max-w-7xl px-4 sm:px-6 lg:px-8 hidden md:flex items-center justify-between lg:items-end lg:justify-end"
          >
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

          <div class="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8 text-base xl:text-lg">
            <div class="flex justify-between items-center">
              <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
                <div
                  @click="toggleCategoryMenu"
                  class="text-white cursor-pointer hover:text-gray-300 font-medium transition-colors flex items-center gap-2"
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
                  to="/sold"
                  class="text-white hover:text-gray-300 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  Sold Items
                </RouterLink>

                <RouterLink
                  to="/about"
                  class="text-white hover:text-gray-300 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  About Us
                </RouterLink>

                <RouterLink
                  to="/sell-to-us"
                  class="text-white hover:text-gray-300 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  Sell to Us
                </RouterLink>

                <RouterLink
                  to="/contact"
                  class="text-white hover:text-gray-300 font-medium transition-colors"
                  active-class="text-gray-300 font-semibold"
                >
                  Contact Us
                </RouterLink>

                <div
                  class="text-white hover:text-gray-300 font-medium transition-colors cursor-pointer"
                  active-class="text-gray-300 font-semibold"
                  @click="subscribeDialogVisible"
                >
                  Subscribe to Updates
                </div>
              </nav>

              <div class="relative">
                <button
                  class="py-3 xl:py-6 bg-transparent justify-center text-white hover:text-gray-300 flex items-center"
                  aria-label="Search"
                  :class="
                    state.showSearchBox
                      ? 'px-2 xl:px-6 2xl:px-8 lg:bg-[#1b1b1b]'
                      : 'px-2 w-10 xl:w-[72px] 2xl:w-24'
                  "
                  @click="toggleSearchBox"
                >
                  <span v-if="!state.showSearchBox" class="hidden 2xl:block">Search</span>
                  <Icon
                    v-if="!state.showSearchBox"
                    icon="heroicons-outline:search"
                    class="w-5 h-5 rotate-90 text-[#f8e6ad]"
                  />
                  <Icon
                    v-if="state.showSearchBox"
                    icon="heroicons-outline:x"
                    class="w-6 2xl:w-8 h-5 2xl:h-7 text-[#f8e6ad]"
                  />
                </button>
                <div
                  v-if="state.showSearchBox"
                  class="justify-center bg-[#1b1b1b] shadow-lg p-5 absolute top-full right-0 w-full lg:w-auto z-50 text-base hidden lg:block"
                >
                  <div class="w-full max-w-5xl flex border border-gray-500">
                    <input
                      type="text"
                      class="flex-1 bg-[#222] text-white px-4 py-3 outline-none"
                      @keyup.enter="handleSearch"
                      v-model="state.searchQuery"
                    />
                    <button
                      class="px-12 bg-[#222] text-white tracking-wide border-l border-gray-500"
                      @click="handleSearch"
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="state.showSearchBox"
      class="justify-center bg-[#1b1b1b] shadow-lg p-5 absolute right-0 w-full lg:w-auto z-50 text-base border-t block lg:hidden border-black"
    >
      <div class="w-full flex border border-gray-500">
        <input
          type="text"
          class="flex-1 bg-[#222] text-white px-4 py-3 outline-none w-full"
          @keyup.enter="handleSearch"
          v-model="state.searchQuery"
        />
        <button
          class="px-4 bg-[#222] text-white tracking-wide border-l border-gray-500"
          @click="handleSearch"
        >
          <Icon
            icon="heroicons-outline:search"
            class="w-5 h-5 rotate-90 text-[#f8e6ad] block sm:hidden"
          />
          <span class="hidden sm:block">SEARCH</span>
        </button>
      </div>
    </div>
    <div
      class="bg-black/90 absolute left-0 w-full top-full transition-all duration-300 hidden lg:block"
    >
      <div
        v-show="state.showCategoryMenu"
        class="max-w-7xl mx-auto flex flex-row border-t border-[#858585] gap-12 text-lg 2xl:text-xl text-[#ccc] transition-all duration-300"
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
    <div
      class="items-center px-10 sm:px-20 gap-2 xl:gap-6 lg:hidden text-lg md:text-2xl overflow-y-auto bg-[#1b1b1b] p-4 border-t border-black absolute min-h-screen top-full left-0 w-full flex flex-col"
      :class="state.showMainMenu ? 'block' : 'hidden'"
    >
      <div
        @click="toggleCategoryMenu"
        class="text-white w-full justify-between cursor-pointer hover:text-gray-300 px-3 font-medium transition-colors flex items-center gap-2 border-b border-gray-600 py-2"
        active-class="text-gray-300 font-semibold"
      >
        <span>Items for Sale</span>
        <Icon
          icon="heroicons-outline:chevron-down"
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': state.showCategoryMenu }"
        />
      </div>

      <div
        v-show="state.showCategoryMenu"
        class="flex flex-col text-[#ccc] transition-all duration-300 w-full px-4"
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

      <RouterLink
        to="/sold"
        class="text-white hover:text-gray-300 px-3 font-medium transition-colors w-full border-b border-gray-600 py-2"
        active-class="text-gray-300 font-semibold"
      >
        Sold Items
      </RouterLink>

      <RouterLink
        to="/about"
        class="text-white hover:text-gray-300 px-3 font-medium transition-colors w-full border-b border-gray-600 py-2"
        active-class="text-gray-300 font-semibold"
      >
        About Us
      </RouterLink>

      <RouterLink
        to="/sell-to-us"
        class="text-white hover:text-gray-300 px-3 font-medium transition-colors w-full border-b border-gray-600 py-2"
        active-class="text-gray-300 font-semibold"
      >
        Sell to Us
      </RouterLink>

      <RouterLink
        to="/contact"
        class="text-white hover:text-gray-300 px-3 font-medium transition-colors w-full border-b border-gray-600 py-2"
        active-class="text-gray-300 font-semibold"
      >
        Contact Us
      </RouterLink>

      <div
        class="hidden md:block text-white hover:text-gray-300 px-3 font-medium transition-colors cursor-pointer w-full border-b border-gray-600 py-2"
        active-class="text-gray-300 font-semibold"
        @click="subscribeDialogVisible"
      >
        Subscribe to Updates
      </div>

      <div
        class="fixed bottom-0 w-full flex flex-col gap-2 bg-black/90 px-10 sm:px-20 py-4 md:hidden"
      >
        <div
          class="flex flex-col sm:flex-row justify-start sm:justify-between w-full border-b border-gray-600 py-4 gap-y-4"
        >
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
        <div
          class="text-white hover:text-gray-300 px-3 font-medium transition-colors cursor-pointer w-full py-2 justify-center flex items-center"
          active-class="text-gray-300 font-semibold"
          @click="subscribeDialogVisible"
        >
          Subscribe to Updates
        </div>
      </div>
    </div>
    <SubscribeModal :visible="subscribeModalVisible" @close="subscribeModalVisible = false" />
  </header>
</template>
