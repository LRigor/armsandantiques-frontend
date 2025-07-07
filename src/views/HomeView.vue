<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted } from 'vue'
import { ref, computed } from 'vue'
import type { Product, Category } from '@/types'
import { useProductTypesStore } from '@/stores/productTypes'
import { useRegionsStore } from '@/stores/regions'
import { useAlbumsStore } from '@/stores/albums'

const productTypesStore = useProductTypesStore()
const regionsStore = useRegionsStore()
const albumsStore = useAlbumsStore()

const currentSlide = ref(0)
const slideInterval = ref<number | null>(null)

const currentRegion = computed(() => {
  if (!regionsStore.regionsWithImages.length) return null
  return regionsStore.regionsWithImages[currentSlide.value]
})

const totalSlides = computed(() => regionsStore.regionsWithImages.length)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const getRandomSlide = (currentSlide: number) => {
  if (totalSlides.value <= 1) return 0

  const availableSlides = []
  for (let i = 0; i < totalSlides.value; i++) {
    if (i !== currentSlide) {
      availableSlides.push(i)
    }
  }

  const randomIndex = Math.floor(Math.random() * availableSlides.length)
  return availableSlides[randomIndex]
}

const nextSlide = () => {
  if (totalSlides.value > 1) {
    const newSlide = getRandomSlide(currentSlide.value)
    currentSlide.value = newSlide
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  if (slideInterval.value) clearInterval(slideInterval.value)
  slideInterval.value = setInterval(nextSlide, 3000)
}

onMounted(() => {
  productTypesStore.fetchProductTypes()
  albumsStore.fetchAlbums(3, 0)
  regionsStore.fetchRegions().then(() => {
    if (regionsStore.regionsWithImages.length > 0) {
      startAutoPlay()
    }
  })
})

// Set page meta
useHead({
  title: 'Arms and Antiques - Rare & Collectible Firearms, Antiques & Military Items',
  meta: [
    {
      name: 'description',
      content:
        'Discover rare and collectible firearms, antiques, and military items. Your premier destination for authenticated historical pieces.',
    },
    { property: 'og:title', content: 'Arms and Antiques - Rare & Collectible Items' },
    {
      property: 'og:description',
      content: 'Discover rare and collectible firearms, antiques, and military items.',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative text-white overflow-hidden bg-black h-[calc(100vh-100px)]"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <div class="relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="text-center">
          <div
            v-if="!regionsStore.loading && regionsStore.regionsWithImages.length > 0"
            class="mb-8 relative"
          >
            <div class="relative w-full h-[90vh] overflow-hidden rounded-lg">
              <Transition name="slide" mode="out-in" appear>
                <div
                  v-if="currentRegion"
                  :key="`slide-${currentSlide}-${currentRegion.id}`"
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <span
                    class="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 font-serif uppercase text-[200px] font-normal leading-normal tracking-[-1.2px] text-[#1d1d1d] text-center whitespace-nowrap pointer-events-none"
                  >
                    {{ currentRegion.name }}
                  </span>
                  <img
                    v-if="
                      currentRegion.product?.image_large ||
                      currentRegion.product?.image_medium ||
                      currentRegion.product?.image_original
                    "
                    :src="
                      currentRegion.product.image_large ||
                      currentRegion.product.image_medium ||
                      currentRegion.product.image_original
                    "
                    :alt="`${currentRegion.name} Collection`"
                    class="w-auto h-full object-cover rounded-lg shadow-2xl z-20"
                  />
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
      <!-- Current Region Info -->
      <div v-if="currentRegion" class="absolute bottom-20 right-1/4 z-30 p-4 w-[350px] text-left">
        <p v-if="currentRegion.product" class="text-gray-300 text-4xl font-georgia">
          {{ currentRegion.product.name }}
        </p>
        <RouterLink
          :to="`/catalog?region=${currentRegion.slug}`"
          class="inline-flex text-left items-center mt-2 text-[#f8e6ad] hover:text-[#f8e6ad] text-lg font-semibold"
        >
          View More
          <Icon
            icon="heroicons:arrow-right-20-solid"
            class="w-4 h-4 ml-1 text-white hover:text-white"
          />
        </RouterLink>
      </div>
    </section>

    <section class="py-24 bg-amber-50 bg-[url('/gravure-bg.jpg')] bg-center bg-cover font-georgia">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-8">
        <h2 class="text-3xl text-gray-900 mb-4">
          We collect, research, and sell antique arms and armor, curiosities, and rare objects from
          around the world
        </h2>

        <div class="flex flex-row gap-20 justify-center">
          <RouterLink to="/guarantee" class="flex flex-col items-center justify-center">
            <span class="text-[85px] text-[#baa680]">100%</span>
            <span class="text-3xl">Guarantee</span>
          </RouterLink>
          <RouterLink to="/sold-items" class="flex flex-col items-center justify-center">
            <span class="text-[85px] text-[#baa680]">1200</span>
            <span class="text-3xl">Items sold worldwide</span>
          </RouterLink>
          <RouterLink to="/about-us" class="flex flex-col items-center justify-center">
            <span class="text-[85px] text-[#baa680]">20</span>
            <span class="text-3xl">Years in business</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#1b1b1b] font-georgia flex flex-col gap-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="productTypesStore.loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"
          ></div>
          <p class="mt-4 text-gray-600">Loading collections...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="productTypesStore.error" class="text-center py-12">
          <p class="text-red-600">Error loading collections: {{ productTypesStore.error }}</p>
        </div>

        <!-- Product Types -->
        <div v-else class="space-y-16">
          <div
            v-for="productType in productTypesStore.productTypes"
            :key="productType.id"
            class="space-y-8"
          >
            <!-- Category Header -->
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-3xl text-white">{{ productType.name }}</h3>
              </div>
              <RouterLink
                :to="`/catalog/${productType.slug}`"
                class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-lg font-roboto"
              >
                View More
                <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5" />
              </RouterLink>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                v-for="product in productType.products"
                :key="product.id"
                class="bg-black shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 pb-0"
              >
                <!-- Product Image -->
                <RouterLink
                  :to="`/products/${product.slug}`"
                  class="relative bg-black cursor-pointer w-[360px] h-[537px] pt-[37px] pl-[45px] pr-[55px] box-border group flex flex-col gap-4"
                >
                  <!-- Price on Request Banner -->
                  <div
                    v-if="!product.price"
                    class="absolute font-georgia italic bottom-[10px] left-[-100px] bg-[#f1c40f] text-black py-2 px-20 text-xs font-bold uppercase tracking-wide rotate-45 shadow-lg z-20 whitespace-nowrap"
                  >
                    Price on <br />Request
                  </div>

                  <h4
                    class="relative z-10 text-lg leading-[1.72] overflow-hidden font-serif text-white transition-colors duration-300 ease-out line-clamp-2 group-hover:text-[#f8e6ad]"
                  >
                    {{ product.name }}
                  </h4>
                  <div class="flex-1">
                    <img
                      :src="product.image_large || product.image_medium || product.image_original"
                      :alt="product.image_alt_text || product.name"
                      class="absolute z-0 bottom-0 left-1/2 -translate-x-1/2 h-[76.4%] w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="albumsStore.loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"
          ></div>
          <p class="mt-4 text-gray-600">Loading albums...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="albumsStore.error" class="text-center py-12">
          <p class="text-red-600">Error loading albums: {{ albumsStore.error }}</p>
        </div>

        <!-- Albums -->
        <div v-else class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-3xl text-white font-georgia">Museums of the World</h3>
            </div>
            <RouterLink
              to="/albums"
              class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-lg font-roboto"
            >
              View More
              <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5" />
            </RouterLink>
          </div>

          <!-- Albums Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="album in albumsStore.albums"
              :key="album.id"
              class="bg-black shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <RouterLink :to="`/albums/${album.slug}`" class="group flex flex-col h-full">
                <div class="relative flex-shrink-0">
                  <img
                    :src="album.cover_medium"
                    :alt="album.name"
                    class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div class="p-6 bg-black flex-1 flex items-start">
                  <h4
                    class="text-xl font-semibold text-white font-georgia group-hover:text-[#f8e6ad] transition-colors leading-tight"
                  >
                    {{ album.name }}
                  </h4>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-16 pb-32 bg-[#1b1b1b]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h2 class="text-3xl text-white font-georgia">Subscribe to our updates</h2>
          <h3 class="text-gray-400 text-xl mb-4 max-w-xl mx-auto">
            Subscribe to periodic email updates to have the first opportunity to acquire new items
            for your collection.
          </h3>
        </div>

        <div class="flex flex-col sm:flex-row justify-center">
          <input
            type="email"
            placeholder="You@email.com"
            class="bg-transparent border border-gray-400 text-gray-400 px-4 py-3 rounded-sm font-semibold transition-colors outline-none border-r-none"
          />
          <RouterLink
            to="/sell-to-us"
            class="bg-transparent border border-gray-400 text-gray-400 hover:bg-gray-500 hover:text-white hover:border-gray-500 px-8 py-3 rounded-sm font-semibold transition-colors uppercase"
          >
            Subscribe
          </RouterLink>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <p class="text-gray-400">
            <Icon icon="heroicons-outline:check" class="inline w-4 h-4 mr-2 text-[#f8e6ad]" /> We
            use secure transmission
          </p>
          <p class="text-gray-400">
            <Icon icon="heroicons-outline:check" class="inline w-4 h-4 mr-2 text-[#f8e6ad]" /> We
            protect your personal information
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[url('/sell-banner-bg.jpg')] bg-center bg-cover">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
        <h2 class="text-3xl text-gray-900 font-georgia">
          If you are interested in selling items from your personal collection please provide item
          details and pictures by clicking on the button below.
        </h2>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/sell-to-us"
            class="bg-transparent border border-black text-black hover:bg-gray-500 hover:text-white hover:border-gray-500 px-8 py-3 rounded-sm font-semibold transition-colors uppercase"
          >
            Sell to Us
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Slide Transition Animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.95);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.95);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Navigation button hover effects */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s infinite;
}

/* Smooth fade transition for region info */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
