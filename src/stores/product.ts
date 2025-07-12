import { defineStore } from 'pinia'
import { apiService } from '@/services/api'
import type { Product } from '@/types'

interface Region {
  id: number
  name: string
  slug: string
}

interface ProductType {
  id: number
  name: string
  slug: string
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
    totalProducts: 0,
    currentPage: 0,
    limit: 15,
    hasMore: true,
    type: 'for-sale' as 'all' | 'for-sale' | 'sold',
    region: null as string | null,
    productType: null as string | null,
    search: null as string | null,
    regions: [] as Region[],
    productTypes: [] as ProductType[],
    regionsLoading: false,
    productTypesLoading: false,
  }),

  actions: {
    async fetchProducts(page: number = 0, reset: boolean = false) {
      this.loading = true
      this.error = null

      const offset = page * this.limit

      try {
        const response = await apiService.getProducts({
          type: this.type,
          limit: this.limit,
          offset,
          region: this.region || undefined,
          productType: this.productType || undefined,
          search: this.search || undefined,
        })
        const newProducts = response.data.results || response.data

        if (reset) {
          this.products = newProducts
        } else {
          this.products = [...this.products, ...newProducts]
        }

        this.currentPage = page
        this.hasMore = newProducts.length === this.limit

        if (response.data.count !== undefined) {
          this.totalProducts = response.data.count
        }
      } catch (error) {
        this.error = 'Failed to load products'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchRegions() {
      this.regionsLoading = true
      try {
        const response = await apiService.getRegions(false, this.type.replace('-', '_'))
        this.regions = response.data
      } catch (error) {
        console.error('Error fetching regions:', error)
      } finally {
        this.regionsLoading = false
      }
    },

    async fetchProductTypes() {
      this.productTypesLoading = true
      try {
        const response = await apiService.getProductTypes(false, this.type.replace('-', '_'))
        this.productTypes = response.data
      } catch (error) {
        console.error('Error fetching product types:', error)
      } finally {
        this.productTypesLoading = false
      }
    },

    async loadMore() {
      if (!this.loading && this.hasMore) {
        await this.fetchProducts(this.currentPage + 1, false)
      }
    },

    setRegion(region: string | null) {
      this.region = region
    },

    setProductType(productType: string | null) {
      this.productType = productType
    },

    setType(type: 'all' | 'for-sale' | 'sold') {
      this.type = type
    },

    setSearch(search: string | null) {
      this.search = search
    },

    reset() {
      this.products = []
      this.currentPage = 0
      this.hasMore = true
      this.error = null
      this.region = null
      this.productType = null
      this.search = null
    },
  },

  getters: {
    regionName: (state) => {
      if (!state.region) return null
      const regionData = state.regions.find((r: Region) => r.slug === state.region)
      return regionData
        ? regionData.name
        : state.region
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    },
    productTypeName: (state) => {
      if (!state.productType) return null
      const productTypeData = state.productTypes.find(
        (pt: ProductType) => pt.slug === state.productType,
      )
      return productTypeData
        ? productTypeData.name
        : state.productType
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    },
  },
})
