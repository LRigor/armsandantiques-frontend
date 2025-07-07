import { defineStore } from 'pinia'
import { apiService } from '@/services/api'
import type { Album } from '@/types'

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [] as Album[],
    loading: false,
    error: null as string | null,
    limit: 3,
    offset: 0,
  }),

  actions: {
    async fetchAlbums(limit: number = 3, offset: number = 0) {
      this.loading = true
      this.error = null

      try {
        const response = await apiService.getAlbums(limit, offset)
        this.albums = response.data
        this.limit = limit
        this.offset = offset
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch albums'
        console.error('Error fetching albums:', err)
        this.albums = []
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },
  },

  getters: {
    hasAlbums: (state) => state.albums.length > 0,
    getAlbumBySlug: (state) => {
      return (slug: string) => state.albums.find((album: Album) => album.slug === slug)
    },
  },
})
