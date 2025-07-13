import { defineStore } from 'pinia'
import { apiService } from '@/services/api'

interface CustomPageData {
  title: string
  content: string
  meta_description?: string
  bg_image?: string
  created_at?: string
  updated_at?: string
}

interface Product {
  id: number
  title: string
  description: string
  price: number
  image_url?: string
  slug: string
  created_at: string
  updated_at: string
}

export const useCustomStore = defineStore('custom', {
  state: () => ({
    url: null as string | null,
    customData: null as CustomPageData | null,
    suggestedItems: [] as Product[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    hasData: (state) => state.customData !== null,
    hasSuggestedItems: (state) => state.suggestedItems.length > 0,
    formattedUpdatedDate: (state) => {
      if (!state.customData?.updated_at) return null
      return new Date(state.customData.updated_at).toLocaleDateString()
    },
  },

  actions: {
    async fetchCustomPage() {
      this.loading = true
      this.error = null

      try {
        const response = await apiService.getCustomPage(this.url)
        this.customData = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch page content'
        this.customData = null
      } finally {
        this.loading = false
      }
    },

    async fetchSuggestedItems() {
      try {
        const response = await apiService.getProducts({
          type: 'for-sale',
          limit: 3,
        })
        this.suggestedItems = response.data
      } catch (err) {
        console.error('Failed to fetch suggested items:', err)
        this.suggestedItems = []
      }
    },

    clearError() {
      this.error = null
    },

    clearData() {
      this.customData = null
      this.error = null
    },

    clearSuggestedItems() {
      this.suggestedItems = []
    },
  },
})
