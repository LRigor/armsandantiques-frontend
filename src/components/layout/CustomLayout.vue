<script setup lang="ts">
interface Props {
  store: {
    loading: boolean
    error: string | null
    hasData: boolean
  }
  background?: string
  fetch: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="min-h-screen" :class="background || 'bg-[#161616]'">
    <!-- Loading State -->
    <div v-if="props.store.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      <p class="mt-4 text-gray-600">Loading ...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="props.store.error" class="text-center py-12">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h2>
        <p class="text-red-600 mb-4">{{ props.store.error }}</p>
        <button
          @click="props.fetch"
          class="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="props.store.hasData">
      <slot />
    </div>

    <!-- No Data State -->
    <div v-else class="flex justify-center items-center min-h-screen">
      <div class="text-center flex flex-col space-y-6 items-center">
        <h2 class="text-2xl font-bold text-gray-900">Content Loading Failed</h2>
        <router-link
          to="/"
          class="inline-block bg-amber-600 w-max text-white px-6 py-2 rounded hover:bg-amber-700 transition-colors"
        >
          Return Home
        </router-link>
      </div>
    </div>
  </div>
</template>
