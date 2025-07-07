import { defineStore } from 'pinia'
import { apiService } from '@/services/api'

export const useVisitorStore = defineStore('visitors', {
  state: () => ({
    visitorCount: 0,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchVisitorCount() {
      this.loading = true
      this.error = null

      try {
        const response = await apiService.getVisitorCount()
        this.visitorCount = response.data.total_visitors
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch visitor count'
        console.error('Error fetching visitor count:', err)
        this.visitorCount = 0
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },
  },
})
