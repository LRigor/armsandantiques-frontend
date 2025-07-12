<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import Dropdown from './Dropdown.vue'
import { useProductStore } from '@/stores/product'

interface Props {
  searchQuery: string
  selectedRegion: string
  selectedProductType: string
  regions: Array<{ slug: string; name: string }>
  productTypes: Array<{ slug: string; name: string }>
  productType: 'all' | 'for-sale' | 'sold'
  hasSearch: boolean
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedRegion', value: string): void
  (e: 'update:selectedProductType', value: string): void
  (e: 'search'): void
  (e: 'clearSearch'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const router = useRouter()
const productStore = useProductStore()

const searchInput = computed({
  get: () => props.searchQuery,
  set: (value: string) => {
    emit('update:searchQuery', value)
  },
})

// Enhanced region selection with router navigation
const selectedRegionComputed = computed({
  get: () => props.selectedRegion,
  set: (value: string) => {
    productStore.setRegion(value || null)
    productStore.setProductType(null)
    productStore.setSearch(null)
    productStore.reset()
    if (value) {
      router.push(`/${productStore.type}/${value}`)
    } else {
      router.push(`/${productStore.type}`)
    }
    emit('update:selectedRegion', value)
  },
})

// Enhanced product type selection with router navigation
const selectedProductTypeComputed = computed({
  get: () => props.selectedProductType,
  set: (value: string) => {
    productStore.setProductType(value || null)
    productStore.setRegion(null)
    productStore.setSearch(null)
    productStore.reset()
    if (value) {
      router.push(`/${productStore.type}/${value}`)
    } else {
      router.push(`/${productStore.type}`)
    }
    emit('update:selectedProductType', value)
  },
})

// Enhanced search function with router navigation
const handleSearch = () => {
  const searchTerm = searchInput.value.trim()
  productStore.setSearch(searchTerm || null)
  productStore.setRegion(null)
  productStore.setProductType(null)
  productStore.reset()
  if (searchTerm) {
    router.push(`/search?type=${productStore.type}&q=${searchTerm}`)
  } else {
    router.push(`/${productStore.type}`)
  }
  emit('search')
}

// Enhanced clear search function with router navigation
const clearSearch = () => {
  searchInput.value = ''
  productStore.setSearch(null)
  productStore.reset()
  if (productStore.type === 'all') {
    router.push(`/for-sale`)
  } else {
    router.push(`/${productStore.type}`)
  }
  emit('clearSearch')
}

// Handle "View all items" click
const viewAllItems = () => {
  productStore.setType('all')
  productStore.setRegion(null)
  productStore.setProductType(null)
  productStore.setSearch(productStore.search)
  router.push(`/search?type=all&q=${productStore.search}`)
}

// Product type options for the dropdown
const productTypeOptions = [
  { id: 0, name: 'All Items', slug: 'all' },
  { id: 1, name: 'Items for Sale', slug: 'for-sale' },
  { id: 2, name: 'Sold Items', slug: 'sold' },
]

const selectedProductTypeDropdown = computed({
  get: () => props.productType,
  set: (value: string) => {
    productStore.setType(value as 'for-sale' | 'sold' | 'all')
  },
})
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 pt-8 justify-between">
    <!-- Search Input Section -->
    <div class="relative w-full sm:max-w-xs flex items-center">
      <div v-if="!hasSearch">
        <div class="absolute inset-y-0 left-0 flex items-center pr-3">
          <button
            class="text-gray-400 hover:text-white transition-colors mr-2"
            title="search"
            @click="handleSearch"
          >
            <Icon icon="heroicons-outline:search" class="w-5 h-5 rotate-90 hover:text-[#f8e6ad]" />
          </button>
        </div>
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search products..."
          class="bg-transparent text-white pl-8 py-2 rounded-lg focus:outline-none focus:border-none focus:ring-0 w-full"
          @keyup.enter="handleSearch"
        />
      </div>
      <div v-if="hasSearch" class="flex items-center gap-2">
        <div>{{ searchQuery }}</div>
        <button
          @click="clearSearch"
          class="text-gray-400 hover:text-white transition-colors mr-2"
          title="Clear search"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="items-center gap-2 flex flex-col sm:flex-row">
      <div v-if="hasSearch">
        <button
          v-if="productStore.type !== 'all'"
          class="text-gray-400 hover:text-amber-100 transition-colors cursor-pointer"
          @click="viewAllItems"
        >
          View all items
        </button>
        <Dropdown
          v-else
          :options="productTypeOptions"
          :model-value="selectedProductTypeDropdown"
          @update:model-value="(value) => (selectedProductTypeDropdown = value)"
        />
      </div>

      <Dropdown
        v-if="!hasSearch && !selectedProductType"
        :model-value="selectedRegionComputed"
        :options="regions"
        placeholder="Regions"
        @update:model-value="(value) => (selectedRegionComputed = value)"
      />

      <Dropdown
        v-if="!hasSearch && !selectedRegionComputed"
        :model-value="selectedProductTypeComputed"
        :options="productTypes"
        placeholder="Types"
        @update:model-value="(value) => (selectedProductTypeComputed = value)"
      />
    </div>
  </div>
</template>
