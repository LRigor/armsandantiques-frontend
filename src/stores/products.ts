import { defineStore } from 'pinia'
import { apiService } from '@/services/api'
import type { ProductDetail, SimilarProduct } from '@/types'

export const useProductsStore = defineStore('products', {
  state: () => ({
    product: null as ProductDetail | null,
    loading: false,
    error: null as string | null,
    similarProducts: [] as SimilarProduct[],
    similarProductsLoading: false,
    similarProductsError: null as string | null,
  }),

  actions: {
    async fetchProduct(slug: string) {
      this.loading = true
      this.error = null
      this.product = null

      try {
        const response = await apiService.getProduct(slug)
        this.product = response.data

        // Fetch similar products after getting the main product
        if (this.product?.id) {
          this.fetchSimilarProducts(this.product.id)
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch product'
        console.error('Error fetching product:', err)
        this.product = null
      } finally {
        this.loading = false
      }
    },

    async fetchSimilarProducts(excludeId?: number, limit: number = 3) {
      this.similarProductsLoading = true
      this.similarProductsError = null

      try {
        const response = await apiService.getSimilarProducts(excludeId, limit)
        this.similarProducts = response.data
      } catch (err) {
        this.similarProductsError =
          err instanceof Error ? err.message : 'Failed to fetch similar products'
        console.error('Error fetching similar products:', err)
        this.similarProducts = []
      } finally {
        this.similarProductsLoading = false
      }
    },

    clearError() {
      this.error = null
      this.similarProductsError = null
    },

    clearProduct() {
      this.product = null
      this.error = null
      this.similarProducts = []
      this.similarProductsError = null
    },
  },

  getters: {
    hasProduct: (state) => state.product !== null,
    productName: (state) => state.product?.name || '',
    productPrice: (state) => state.product?.price || 0,
    productImages: (state) => state.product?.images || [],
    primaryImage: (state) => {
      if (state.product?.images && state.product.images.length > 0) {
        return state.product.images[0]
      }
      // Fallback to hero/main images if images array is empty
      if (state.product?.hero_image_large || state.product?.image_large) {
        return {
          image_large: state.product.hero_image_large || state.product.image_large,
          image_original: state.product.hero_image_original || state.product.image_original,
          alt_text: state.product.image_alt_text || state.product.name || '',
        }
      }
      return null
    },
    productProperties: (state) => state.product?.properties || [],
    hasSimilarProducts: (state) => state.similarProducts.length > 0,
  },
})
