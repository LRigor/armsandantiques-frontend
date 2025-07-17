<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Product {
  id: number
  name: string
  image_large?: string
  image_medium?: string
  image_original?: string
}

interface Region {
  id: number
  name: string
  slug: string
  product?: Product
}

interface Props {
  regions: Region[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const currentSlide = ref(0)
const slideInterval = ref<number | null>(null)

const currentRegion = computed(() => {
  if (!props.regions.length) return null
  return props.regions[currentSlide.value]
})

const totalSlides = computed(() => props.regions.length)

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

const stopAutoPlay = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
    slideInterval.value = null
  }
}

onMounted(() => {
  if (props.regions.length > 0) {
    startAutoPlay()
  }
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section
    class="relative text-white overflow-hidden bg-black h-[40vh] lg:h-[calc(100vh-100px)]"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <div class="relative mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full">
      <div class="text-center h-full">
        <div v-if="!loading && regions.length > 0" class="mb-8 relative h-full">
          <div class="relative w-full h-full overflow-hidden rounded-lg">
            <Transition name="slide" mode="out-in" appear>
              <div
                v-if="currentRegion"
                :key="`slide-${currentSlide}-${currentRegion.id}`"
                class="absolute inset-0 sm:inset-8 lg:inset-0 flex justify-center items-center sm:items-end sm:justify-end lg:items-center lg:justify-center"
              >
                <span
                  class="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 font-serif uppercase text-[200px] font-normal leading-normal tracking-[-1.2px] text-[#1d1d1d] text-center whitespace-nowrap pointer-events-none"
                >
                  {{ currentRegion.name }}
                </span>
                <img
                  v-if="currentRegion.product?.image_original"
                  :src="currentRegion.product.image_original"
                  :alt="`${currentRegion.name} Collection`"
                  class="w-auto sm:w-40 lg:w-auto h-full sm:h-auto lg:h-full object-cover z-20"
                />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Current Region Info -->
    <div
      v-if="currentRegion"
      class="hidden sm:block absolute bottom-20 left-10 lg:left-auto lg:right-1/4 z-30 p-4 w-[350px] text-left"
    >
      <p v-if="currentRegion.product" class="text-gray-300 text-4xl font-georgia">
        {{ currentRegion.product.name }}
      </p>
      <RouterLink
        :to="`/for-sale/${currentRegion.slug}`"
        class="inline-flex text-left items-center mt-2 text-[#f8e6ad] hover:text-[#f8e6ad] text-lg font-semibold group"
      >
        View More
        <Icon
          icon="heroicons:arrow-right-20-solid"
          class="w-4 h-4 ml-1 text-white hover:text-white transition-transform duration-200 group-hover:translate-x-1"
        />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* Slide Transition Animations using Tailwind CSS */
.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-500 ease-out;
}

.slide-enter-from {
  @apply opacity-0 translate-x-24 scale-95;
}

.slide-leave-to {
  @apply opacity-0 -translate-x-24 scale-95;
}

.slide-enter-to,
.slide-leave-from {
  @apply opacity-100 translate-x-0 scale-100;
}

/* Pulse animation using Tailwind CSS */
@keyframes pulse-scale {
  0%,
  100% {
    @apply scale-100;
  }
  50% {
    @apply scale-105;
  }
}

.pulse-scale {
  animation: pulse-scale 2s infinite;
}

/* Fade transitions using Tailwind CSS */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
