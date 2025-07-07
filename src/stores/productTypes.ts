import { defineStore } from 'pinia'
import { apiService } from '@/services/api'
import type { ProductType } from '@/types'

export const useProductTypesStore = defineStore('productTypes', {
  state: () => ({
    productTypes: [] as ProductType[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProductTypes() {
      this.loading = true
      this.error = null

      try {
        const response = await apiService.getProductTypes()
        this.productTypes = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch product types'
        console.error('Error fetching product types:', err)
        this.productTypes = []
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },
  },

  getters: {
    hasProductTypes: (state) => state.productTypes.length > 0,
    getProductTypeBySlug: (state) => {
      return (slug: string) => state.productTypes.find((pt: ProductType) => pt.slug === slug)
    },
  },
})
