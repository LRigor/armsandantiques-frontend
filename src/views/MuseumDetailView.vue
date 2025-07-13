<script setup lang="ts">
import { onMounted, computed, ref, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Icon } from '@iconify/vue'
import { useAlbumsStore } from '@/stores/albums'
import CustomLayout from '@/components/layout/CustomLayout.vue'
import AlbumCard from '@/components/layout/AlbumCard.vue'
import IconShareFacebook from '@/components/icons/IconShareFacebook.vue'
import IconPinterestAlt from '@/components/icons/IconPinterestAlt.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconVK from '@/components/icons/IconVK.vue'
import IconSnapchat from '@/components/icons/IconSnapchat.vue'

const route = useRoute()
const albumSlug = computed(() => route.params.slug as string)

// Use the albums store
const albumsStore = useAlbumsStore()

// Intersection Observer for infinite scrolling
const isLoadingMore = ref(false)
const isAutoLoading = ref(false)
const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// Scroll detection as fallback
const scrollTimeout = ref<number | null>(null)

// Create a computed property for the store interface that CustomLayout expects
const storeForLayout = computed(() => ({
  loading: albumsStore.albumDetailLoading && !albumsStore.albumDetail,
  error: albumsStore.albumDetailError,
  hasData:
    !!albumsStore.albumDetail || (!albumsStore.albumDetailLoading && !albumsStore.albumDetailError),
}))

// Function to fetch album data
const fetchAlbumData = () => {
  if (albumSlug.value) {
    // Clear previous data and fetch new album
    albumsStore.clearAlbumDetail()
    albumsStore.clearSimilarAlbums()
    albumsStore.fetchAlbumWithSimilar(albumSlug.value, 3)
  }
}

// Load more photos function
const loadMorePhotos = async () => {
  if (isLoadingMore.value || !albumsStore.hasMorePhotos) {
    return
  }

  isLoadingMore.value = true

  try {
    await albumsStore.loadMorePhotos()
  } catch (error) {
    console.error('Error loading more photos:', error)
  } finally {
    isLoadingMore.value = false
  }
}

// Scroll handler as fallback
const handleScroll = () => {
  if (isAutoLoading.value || albumsStore.photosLoading || !albumsStore.hasMorePhotos) {
    return
  }

  // Clear existing timeout
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }

  // Debounce scroll events
  scrollTimeout.value = window.setTimeout(() => {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    console.log('Scroll position:', {
      scrollTop,
      windowHeight,
      documentHeight,
      threshold: documentHeight - 200,
    })

    // Load more when user is within 200px of the bottom
    if (scrollTop + windowHeight >= documentHeight - 200) {
      console.log('Triggering load more photos from scroll')
      isAutoLoading.value = true
      loadMorePhotos().finally(() => {
        isAutoLoading.value = false
      })
    }
  }, 100) // 100ms debounce
}

// Setup Intersection Observer for infinite scrolling
const setupIntersectionObserver = () => {
  if (observer) observer.disconnect()

  observer = new window.IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        albumsStore.hasMorePhotos &&
        !albumsStore.photosLoading &&
        !isAutoLoading.value
      ) {
        isAutoLoading.value = true
        loadMorePhotos().finally(() => {
          isAutoLoading.value = false
        })
      }
    },
    {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 1.0,
    },
  )

  if (sentinelRef.value) {
    observer.observe(sentinelRef.value)
  } else {
  }
}

// Watch for route changes to refetch data
watch(
  albumSlug,
  (newSlug, oldSlug) => {
    if (newSlug && newSlug !== oldSlug) {
      fetchAlbumData()
    }
  },
  { immediate: true },
)

onMounted(async () => {
  // Initial fetch is handled by the watcher with immediate: true
  await nextTick()
  setupIntersectionObserver()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }
  window.removeEventListener('scroll', handleScroll)
})

// Set dynamic page meta
useHead(
  computed(() => ({
    title: `${albumsStore.albumDetail?.name || 'Museum Album'} - Arms and Antiques`,
    meta: [
      {
        name: 'description',
        content:
          albumsStore.albumDetail?.description ||
          'Explore this museum collection at Arms and Antiques.',
      },
      {
        property: 'og:title',
        content: `${albumsStore.albumDetail?.name || 'Museum Album'} - Arms and Antiques`,
      },
      {
        property: 'og:description',
        content:
          albumsStore.albumDetail?.description ||
          'Explore this museum collection at Arms and Antiques.',
      },
      {
        property: 'og:image',
        content: albumsStore.albumDetail?.cover_medium || '',
      },
    ],
  })),
)
</script>

<template>
  <CustomLayout :store="storeForLayout" :fetch="fetchAlbumData">
    <div class="min-h-screen bg-[#161616]">
      <!-- Album Header -->
      <div v-if="albumsStore.albumDetail" class="text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div class="text-left flex flex-col gap-4">
            <h1 class="text-4xl md:text-5xl font-georgia text-white">
              {{ albumsStore.albumDetail.name }}
            </h1>
            <div class="flex">
              <RouterLink
                to="/contact"
                class="text-[#ccc] w-max border border-[#ccc] px-12 py-2 hover:bg-[#ccc] hover:text-black transition-colors uppercase"
              >
                Contact Us
              </RouterLink>
            </div>
            <h2 class="text-2xl font-georgia text-white">Description</h2>
            <div
              v-if="albumsStore.albumDetail.description"
              v-html="albumsStore.albumDetail.description"
              class="text-xl text-gray-300"
            ></div>
            <div class="flex flex-row gap-1">
              <a target="_blank">
                <IconShareFacebook class="cursor-pointer" />
              </a>
              <a target="_blank">
                <IconPinterestAlt class="cursor-pointer" />
              </a>
              <a target="_blank">
                <IconTwitter class="cursor-pointer" />
              </a>
              <a target="_blank">
                <IconVK class="cursor-pointer" />
              </a>
              <a target="_blank">
                <IconSnapchat class="cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Album Photos -->
      <div v-if="albumsStore.albumDetail" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="flex flex-col gap-8">
          <div
            v-for="photo in albumsStore.albumDetail.photos"
            :key="photo.id"
            class="bg-black shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              :src="photo.image_large"
              :alt="`${albumsStore.albumDetail.name} - Photo ${photo.id}`"
              class="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          <!-- Sentinel element for infinite scrolling -->
          <div ref="sentinelRef" class="h-4"></div>

          <!-- Loading indicator -->
          <div v-if="isAutoLoading || albumsStore.photosLoading" class="text-center py-8">
            <div class="inline-flex items-center gap-2 text-gray-400">
              <Icon icon="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
              <span>Loading more photos...</span>
            </div>
          </div>
        </div>

        <!-- Photo Count -->
        <div class="text-center mt-12">
          <p class="text-gray-400">
            Showing {{ albumsStore.albumDetail.photos.length }} photos from this collection
            <span v-if="albumsStore.hasMorePhotos" class="text-[#f8e6ad]">
              • Scroll to load more
            </span>
          </p>
        </div>
      </div>

      <!-- Similar Albums -->
      <div
        v-if="albumsStore.similarAlbums.length > 0"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div class="flex justify-between items-center mb-8">
          <div>
            <h3 class="text-3xl text-white font-georgia">Similar Items</h3>
          </div>
          <RouterLink
            to="/museum"
            class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-lg font-roboto"
          >
            View More
            <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AlbumCard v-for="album in albumsStore.similarAlbums" :key="album.id" :album="album" />
        </div>
      </div>
    </div>
  </CustomLayout>
</template>
