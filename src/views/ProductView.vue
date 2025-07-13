<script setup lang="ts">
import { onMounted, computed, ref, watch, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/layout/ProductCard.vue'
import SearchRow from '@/components/layout/SearchRow.vue'
import CustomLayout from '@/components/layout/CustomLayout.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// Create a computed property for the store interface that CustomLayout expects
const storeForLayout = computed(() => ({
  loading: productStore.loading && productStore.products.length === 0,
  error: productStore.error,
  hasData: productStore.products.length > 0 || (!productStore.loading && !productStore.error),
}))

const productTypeFromRoute = computed(() => {
  return route.name === 'search'
    ? productStore.type
    : route.name.match(/sold/g)
      ? 'sold'
      : 'for-sale'
})

watch(
  productTypeFromRoute,
  (newType) => {
    productStore.type = newType
  },
  { immediate: true },
)

const isLoadingMore = ref(false)
const searchQuery = ref('')
const isAutoLoading = ref(false)
const scrollTimeout = ref<number | null>(null)
const productsGridRef = ref<HTMLElement | null>(null)
const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// Get region and productType from route params
const param = computed(
  () =>
    (route.params.region as string | undefined) || (route.params.productType as string | undefined),
)

// Get search query from route query parameters
const searchQueryParam = computed(() => route.query.q as string | undefined)

// Check if we're on the search route
const isSearchRoute = computed(() => route.name === 'search')

// Helper to determine if param is a region or productType
const isRegion = computed(() => {
  if (!param.value) return false
  return productStore.regions.some((r) => r.slug === param.value)
})
const isProductType = computed(() => {
  if (!param.value) return false
  return productStore.productTypes.some((pt) => pt.slug === param.value)
})

const region = computed(() => (isRegion.value ? param.value : undefined))
const productType = computed(() => (isProductType.value ? param.value : undefined))

const selectedRegionObj = computed(() =>
  isRegion.value ? productStore.regions.find((r) => r.slug === param.value) : null,
)
const selectedProductTypeObj = computed(() =>
  isProductType.value ? productStore.productTypes.find((pt) => pt.slug === param.value) : null,
)

// Page title and description based on filters
const pageTitle = computed(() => {
  if (productStore.search) {
    return `Search Results for "${productStore.search}"`
  } else if (selectedRegionObj.value) {
    return `${selectedRegionObj.value.name}`
  } else if (selectedProductTypeObj.value) {
    return `${selectedProductTypeObj.value.name}`
  }
  return `Products For Sale`
})

const pageDescription = computed(() => {
  let description =
    'Browse our collection of rare and collectible firearms, antiques, and military items'

  if (productStore.search) {
    description = `Search results for "${productStore.search}" - ${description}`
  }

  if (productStore.regionName) {
    description += ` from ${productStore.regionName}`
  }

  if (productStore.productTypeName) {
    description += ` in ${productStore.productTypeName}`
  }

  return `${description} available for sale.`
})

const headerTitle = computed(() => {
  if (productStore.search) {
    return `Search Results`
  } else if (selectedRegionObj.value) {
    return selectedRegionObj.value.h1_for_sale
  } else if (selectedProductTypeObj.value) {
    return selectedProductTypeObj.value.h1_for_sale
  }
  return 'Products For Sale'
})

const selectedRegion = computed(() => region.value || '')

const selectedProductType = computed(() => productType.value || '')

const loadProducts = () => {
  productStore.fetchProducts(0, true)
}

const loadMoreProducts = async () => {
  if (!productStore.loading && productStore.hasMore) {
    isLoadingMore.value = true
    await productStore.loadMore()
    isLoadingMore.value = false
  }
}

const handleScroll = () => {
  if (isAutoLoading.value || productStore.loading || !productStore.hasMore) return

  // Clear existing timeout
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }

  // Debounce scroll events
  scrollTimeout.value = window.setTimeout(() => {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Load more when user is within 200px of the bottom
    if (scrollTop + windowHeight >= documentHeight - 200) {
      isAutoLoading.value = true
      loadMoreProducts().finally(() => {
        isAutoLoading.value = false
      })
    }
  }, 100) // 100ms debounce
}

const setupIntersectionObserver = () => {
  if (observer) observer.disconnect()
  observer = new window.IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        productStore.hasMore &&
        !productStore.loading &&
        !isAutoLoading.value
      ) {
        isAutoLoading.value = true
        loadMoreProducts().finally(() => {
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
  }
}

onMounted(async () => {
  productStore.fetchRegions()
  productStore.fetchProductTypes()

  // Check if we have search query parameters and we're on the search route
  if (isSearchRoute.value && searchQueryParam.value) {
    searchQuery.value = searchQueryParam.value
    productStore.setSearch(searchQueryParam.value)
  }

  loadProducts()

  await nextTick()
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

watch(
  [region, productType, searchQueryParam, productTypeFromRoute],
  async ([newRegion, newProductType, newSearchQuery, newProductTypeFromRoute]) => {
    productStore.setRegion(newRegion || null)
    productStore.setProductType(newProductType || null)

    // Only set search if we're on the search route and have a search query
    if (isSearchRoute.value && newSearchQuery) {
      productStore.setSearch(newSearchQuery)
      searchQuery.value = newSearchQuery
    } else if (!isSearchRoute.value) {
      productStore.setSearch(null)
    }

    loadProducts()
    await nextTick()
    setupIntersectionObserver()
  },
)

// Set page meta (only once, with computed)
useHead(
  computed(() => ({
    title: pageTitle.value,
    meta: [
      {
        name: 'description',
        content: pageDescription.value,
      },
      { property: 'og:title', content: pageTitle.value },
      {
        property: 'og:description',
        content: pageDescription.value,
      },
    ],
  })),
)
</script>

<template>
  <CustomLayout :store="storeForLayout" :fetch="loadProducts">
    <div class="min-h-screen bg-[#161616]">
      <!-- Header Section -->
      <div class="text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div class="text-left">
            <h1 class="text-4xl md:text-5xl font-georgia text-white mb-4">
              {{ headerTitle }}
            </h1>
            <SearchRow
              :search-query="searchQuery"
              :selected-region="selectedRegion"
              :selected-product-type="selectedProductType"
              :regions="productStore.regions"
              :product-types="productStore.productTypes"
              :product-type="productStore.type"
              :has-search="!!productStore.search"
              @update:search-query="(value) => (searchQuery = value)"
            />
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Products Grid -->
        <div v-if="productStore.products.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref="productsGridRef">
            <ProductCard
              v-for="product in productStore.products"
              :key="product.id"
              :product="product"
            />
            <div ref="sentinelRef"></div>
          </div>

          <!-- Auto-loading indicator -->
          <div v-if="isAutoLoading" class="text-center mt-8">
            <div
              class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"
            ></div>
            <p class="mt-2 text-gray-400 text-sm">Loading more products...</p>
          </div>

          <!-- End of Results -->
          <div v-else-if="productStore.products.length > 0" class="text-center mt-12">
            <p class="text-gray-400">
              You've viewed all {{ productStore.products.length }} products
            </p>
          </div>
        </div>
      </div>
    </div>
  </CustomLayout>
</template>
