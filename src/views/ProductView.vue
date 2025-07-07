<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const error = ref(null)

const productSlug = route.params.slug as string

onMounted(() => {
  // TODO: Fetch product data based on slug
  console.log('Product slug:', productSlug)
  // Simulate loading for now
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

// Set page meta
useHead({
  title: `${product.value?.name || 'Product'} - Arms and Antiques`,
  meta: [
    {
      name: 'description',
      content: `View details for ${product.value?.name || 'this product'} at Arms and Antiques.`,
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"
        ></div>
        <p class="mt-4 text-gray-600">Loading product details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">Error loading product: {{ error }}</p>
      </div>

      <!-- Product Details -->
      <div v-else class="text-center py-12">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Product Details</h1>
        <p class="text-gray-600">Product slug: {{ productSlug }}</p>
        <p class="text-sm text-gray-500 mt-4">
          This is a placeholder page. Product data fetching will be implemented here.
        </p>
      </div>
    </div>
  </div>
</template>
