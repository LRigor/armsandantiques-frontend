import { defineStore } from 'pinia'
import { apiService } from '@/services/api'
import type { Region } from '@/types'

export const useRegionsStore = defineStore('regions', {
  state: () => ({
    regions: [] as Region[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchRegions() {
      this.loading = true
      this.error = null

      try {
        const response = await apiService.getRegions()
        this.regions = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch regions'
        console.error('Error fetching regions:', err)
        this.regions = []
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },
  },

  getters: {
    hasRegions: (state) => state.regions.length > 0,
    regionsWithImages: (state) =>
      state.regions.filter((region: Region) => region.product?.image_original),
    getRegionBySlug: (state) => {
      return (slug: string) => state.regions.find((region: Region) => region.slug === slug)
    },
  },
})
