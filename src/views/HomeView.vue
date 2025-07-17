<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { useProductTypesStore } from '@/stores/productTypes'
import { useRegionsStore } from '@/stores/regions'
import { useAlbumsStore } from '@/stores/albums'
import HeroSlideshow from '@/components/layout/HeroSlideshow.vue'
import ProductCard from '@/components/layout/ProductCard.vue'
import AlbumCard from '@/components/layout/AlbumCard.vue'

const productTypesStore = useProductTypesStore()
productTypesStore.withProduct = true
productTypesStore.type = 'for_sale'
const regionsStore = useRegionsStore()
regionsStore.withProduct = true
regionsStore.type = 'for_sale'
const albumsStore = useAlbumsStore()

onMounted(() => {
  productTypesStore.fetchProductTypes()
  albumsStore.fetchAlbums(3, 0)
  regionsStore.fetchRegions()
})

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
    <HeroSlideshow :regions="regionsStore.regionsWithImages" :loading="regionsStore.loading" />

    <section class="grid grid-cols-3 lg:hidden bg-[#1b1b1b]">
      <RouterLink
        to="/for-sale"
        class="p-4 text-[#ccc] hover:text-[#f8e6ad] transition-colors duration-200 flex justify-center text-center items-center border-b border-gray-600"
      >
        View All
      </RouterLink>
      <RouterLink
        v-for="(region, index) in regionsStore.regions"
        :key="region.id"
        :to="`/for-sale/${region.slug}`"
        :class="[
          'p-4 text-[#ccc] hover:text-[#f8e6ad] transition-colors duration-200 flex justify-center text-center items-center',
          index % 3 === 2 ? '' : 'border-b border-l border-gray-600',
        ]"
      >
        {{ region.name }}
      </RouterLink>
    </section>
    <section class="py-24 bg-amber-50 bg-[url('/gravure-bg.jpg')] bg-cover font-georgia">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-8">
        <h2 class="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4">
          We collect, research, and sell antique arms and armor, curiosities, and rare objects from
          around the world
        </h2>

        <div class="flex flex-row gap-8 sm:gap-12 lg:gap-20 justify-center">
          <RouterLink to="/guarantee" class="flex flex-col items-center justify-center">
            <span class="text-4xl sm:text-5xl lg:text-[85px] text-[#baa680]">100%</span>
            <span class="text-lg sm:text-xl lg:text-3xl">Guarantee</span>
          </RouterLink>
          <RouterLink to="/sold" class="flex flex-col items-center justify-center">
            <span class="text-4xl sm:text-5xl lg:text-[85px] text-[#baa680]">1200</span>
            <span class="text-lg sm:text-xl lg:text-3xl">Items sold worldwide</span>
          </RouterLink>
          <RouterLink to="/about" class="flex flex-col items-center justify-center">
            <span class="text-4xl sm:text-5xl lg:text-[85px] text-[#baa680]">20</span>
            <span class="text-lg sm:text-xl lg:text-3xl">Years in business</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#1b1b1b] font-georgia flex flex-col gap-16 w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
        <div v-else class="space-y-4 md:space-y-16 w-full">
          <div
            v-for="productType in productTypesStore.productTypes"
            :key="productType.id"
            class="space-y-8 w-full"
          >
            <!-- Category Header -->
            <div class="justify-between items-center hidden md:flex">
              <div>
                <h3 class="text-xl sm:text-2xl lg:text-3xl text-white">{{ productType.name }}</h3>
              </div>
              <RouterLink
                :to="`/for-sale/${productType.slug}`"
                class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-base sm:text-lg font-roboto"
              >
                View More
                <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5" />
              </RouterLink>
            </div>

            <div
              class="bg-black shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 pb-0 block md:hidden w-full"
            >
              <!-- Product Image -->
              <div class="relative bg-black cursor-pointer w-full h-[400px] flex flex-col">
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-10"
                >
                  <h4
                    class="relative z-10 text-lg leading-[1.72] overflow-hidden font-serif text-white transition-colors duration-300 ease-out line-clamp-2"
                  >
                    {{ productType.name }}
                  </h4>
                  <RouterLink
                    :to="`/product/${productType.slug}`"
                    class="relative text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-base sm:text-lg font-roboto"
                  >
                    View more
                    <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5" />
                  </RouterLink>
                </div>
                <div class="flex-1">
                  <img
                    :src="
                      productType.products[0].image_large ||
                      productType.products[0].image_medium ||
                      productType.products[0].image_original
                    "
                    :alt="productType.products[0].image_alt_text || productType.products[0].name"
                    class="absolute z-0 bottom-0 left-1/2 -translate-x-1/2 h-[76.4%] w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <!-- Products Grid -->
            <div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hidden md:grid">
              <ProductCard
                v-if="productType.products.length > 0"
                :key="productType.products[0].id"
                :product="productType.products[0]"
              />
              <ProductCard
                v-if="productType.products.length > 1"
                :key="productType.products[1].id"
                :product="productType.products[1]"
              />
              <ProductCard
                v-if="productType.products.length > 2"
                :key="productType.products[2].id"
                :product="productType.products[2]"
                class="hidden lg:block"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
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
              <h3 class="text-xl sm:text-2xl lg:text-3xl text-white font-georgia">
                Museums of the World
              </h3>
            </div>
            <RouterLink
              :to="`/museum`"
              class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-base sm:text-lg font-roboto"
            >
              View More
              <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5" />
            </RouterLink>
          </div>

          <!-- Albums Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AlbumCard
              v-if="albumsStore.albums.length > 0"
              :key="albumsStore.albums[0].id"
              :album="albumsStore.albums[0]"
            />
            <AlbumCard
              v-if="albumsStore.albums.length > 1"
              :key="albumsStore.albums[1].id"
              :album="albumsStore.albums[1]"
            />
            <AlbumCard
              v-if="albumsStore.albums.length > 2"
              :key="albumsStore.albums[2].id"
              :album="albumsStore.albums[2]"
              class="hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="pt-16 pb-32 bg-[#1b1b1b]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h2 class="text-xl sm:text-2xl lg:text-3xl text-white font-georgia">
            Subscribe to our updates
          </h2>
          <h3 class="text-gray-400 text-base sm:text-lg lg:text-xl mb-4 max-w-xl mx-auto">
            Subscribe to periodic email updates to have the first opportunity to acquire new items
            for your collection.
          </h3>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-0">
          <input
            type="email"
            placeholder="You@email.com"
            class="text-center sm:text-left px-4 py-3 bg-[#222] text-white outline-none placeholder-gray-400 border border-gray-600 sm:border-r-0"
          />
          <RouterLink
            to="/subscribe"
            class="px-8 py-3 bg-[#222] text-white tracking-wide border border-gray-600 hover:bg-[#333] transition uppercase"
          >
            Subscribe
          </RouterLink>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <p class="text-gray-400 text-sm sm:text-base">
            <Icon icon="heroicons-outline:check" class="inline w-4 h-4 mr-2 text-[#f8e6ad]" /> We
            use secure transmission
          </p>
          <p class="text-gray-400 text-sm sm:text-base">
            <Icon icon="heroicons-outline:check" class="inline w-4 h-4 mr-2 text-[#f8e6ad]" /> We
            protect your personal information
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[url('/sell-banner-bg.jpg')] bg-center bg-cover">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
        <h2 class="text-xl sm:text-2xl lg:text-3xl text-gray-900 font-georgia">
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
