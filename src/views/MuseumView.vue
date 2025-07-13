<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useAlbumsStore } from '@/stores/albums'
import CustomLayout from '@/components/layout/CustomLayout.vue'
import AlbumCard from '@/components/layout/AlbumCard.vue'

const albumsStore = useAlbumsStore()

// Create a computed property for the store interface that CustomLayout expects
const storeForLayout = computed(() => ({
  loading: albumsStore.loading && albumsStore.albums.length === 0,
  error: albumsStore.error,
  hasData: albumsStore.albums.length > 0 || (!albumsStore.loading && !albumsStore.error),
}))

onMounted(() => {
  // Fetch 15 albums as requested
  albumsStore.fetchAlbums(15, 0)
})

// Set page meta
useHead({
  title: 'Museums of the World - Arms and Antiques',
  meta: [
    {
      name: 'description',
      content:
        'Explore our curated collection of museum albums featuring rare and collectible firearms, antiques, and military items from around the world.',
    },
    { property: 'og:title', content: 'Museums of the World - Arms and Antiques' },
    {
      property: 'og:description',
      content:
        'Explore our curated collection of museum albums featuring rare and collectible firearms, antiques, and military items.',
    },
  ],
})
</script>

<template>
  <CustomLayout :store="storeForLayout" :fetch="() => albumsStore.fetchAlbums(15, 0)">
    <div class="min-h-screen bg-[#161616]">
      <!-- Header Section -->
      <div class="text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div class="text-left">
            <h1 class="text-4xl md:text-5xl font-georgia text-white mb-4">Museums of the World</h1>
          </div>
        </div>
      </div>

      <!-- Albums Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div v-if="albumsStore.albums.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AlbumCard v-for="album in albumsStore.albums" :key="album.id" :album="album" />
          </div>

          <!-- End of Results -->
          <div class="text-center mt-12">
            <p class="text-gray-400">Showing {{ albumsStore.albums.length }} museum albums</p>
          </div>
        </div>
      </div>
    </div>
  </CustomLayout>
</template>
