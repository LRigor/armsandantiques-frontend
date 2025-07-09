<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface ProductImage {
  image_large?: string
  image_original: string
  alt_text?: string
}

interface Props {
  images: ProductImage[]
  productName?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  productName: 'Product',
  images: () => [],
  autoPlay: true,
  autoPlayInterval: 5000, // 3 seconds
})

// Slideshow state
const currentSlideIndex = ref(0)
const isPlaying = ref(props.autoPlay)
const autoPlayTimer = ref<NodeJS.Timeout | null>(null)

// Watch for images changes to reset slideshow
watch(
  () => props.images,
  () => {
    currentSlideIndex.value = 0
    if (props.autoPlay && hasMultipleImages.value) {
      startAutoPlay()
    }
  },
  { deep: true },
)

// Slideshow navigation functions
const nextSlide = () => {
  if (props.images.length > 0) {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % props.images.length
  }
}

const prevSlide = () => {
  if (props.images.length > 0) {
    currentSlideIndex.value =
      currentSlideIndex.value === 0 ? props.images.length - 1 : currentSlideIndex.value - 1
  }
}

const goToSlide = (index: number) => {
  currentSlideIndex.value = index
}

// Auto-play functions
const startAutoPlay = () => {
  if (!hasMultipleImages.value) return

  stopAutoPlay()
  isPlaying.value = true
  autoPlayTimer.value = setInterval(() => {
    nextSlide()
  }, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value)
    autoPlayTimer.value = null
  }
  isPlaying.value = false
}

const toggleAutoPlay = () => {
  if (isPlaying.value) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
}

// Manual navigation should pause auto-play temporarily
const handleManualNavigation = (direction: 'next' | 'prev') => {
  const wasPlaying = isPlaying.value
  stopAutoPlay()

  if (direction === 'next') {
    nextSlide()
  } else {
    prevSlide()
  }

  // Resume auto-play after a delay if it was playing
  if (wasPlaying) {
    setTimeout(() => {
      startAutoPlay()
    }, props.autoPlayInterval)
  }
}

// Current slide image
const currentSlideImage = computed(() => {
  return props.images[currentSlideIndex.value]
})

// Check if we have multiple images
const hasMultipleImages = computed(() => props.images.length > 1)

// Lifecycle hooks
onMounted(() => {
  if (props.autoPlay && hasMultipleImages.value) {
    startAutoPlay()
  }
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <div class="space-y-4 w-full flex items-center justify-center h-[500px]">
    <!-- Main Slideshow Container -->
    <div class="relative aspect-square rounded-lg overflow-hidden w-full h-full">
      <!-- Main Image -->
      <div class="relative w-full h-full">
        <Transition name="slide-fade" mode="out-in" appear>
          <img
            v-if="currentSlideImage"
            :key="currentSlideIndex"
            :src="currentSlideImage.image_large || currentSlideImage.image_original"
            :alt="currentSlideImage.alt_text || productName"
            class="w-full h-full object-contain"
          />
          <!-- Fallback for no images -->
          <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
            <div class="text-gray-400 text-center">
              <svg class="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                />
              </svg>
              <p class="text-sm">No image available</p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Navigation Arrows (only show if more than 1 image) -->
      <div
        v-if="hasMultipleImages"
        class="absolute inset-0 flex items-center justify-between p-4 pointer-events-none"
      >
        <!-- Previous Button -->
        <button
          @click="handleManualNavigation('prev')"
          class="pointer-events-auto bg-transparent text-gray-600 px-3 py-6 transition-all duration-200 backdrop-blur-sm border border-gray-600 shadow-lg hover:text-[#f8e6ad] hover:border-[#f8e6ad]"
          aria-label="Previous image"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Next Button -->
        <button
          @click="handleManualNavigation('next')"
          class="pointer-events-auto bg-transparent text-gray-600 px-3 py-6 transition-all duration-200 backdrop-blur-sm border border-gray-600 shadow-lg hover:text-[#f8e6ad] hover:border-[#f8e6ad]"
          aria-label="Next image"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Slide fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
