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
                :to="`/for-sale/${productType.slug}`"
                class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-lg font-roboto"
              >
                View More
                <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5" />
              </RouterLink>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductCard
                v-for="product in productType.products"
                :key="product.id"
                :product="product"
              />
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
            <AlbumCard v-for="album in albumsStore.albums" :key="album.id" :album="album" />
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
            to="/subscribe"
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
