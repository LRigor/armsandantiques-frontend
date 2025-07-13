import { defineStore } from 'pinia'
import { apiService } from '@/services/api'
import type { Album } from '@/types'

interface AlbumPhoto {
  id: number
  image_large: string
}

interface AlbumDetail {
  id: number
  name: string
  slug: string
  description: string
  photos: AlbumPhoto[]
  cover_medium: string
  fb_image: string
  tw_image: string
  vk_image: string
}

interface SimilarAlbum {
  id: number
  name: string
  slug: string
  cover_medium: string
  number_of_photos: number
}

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    // Regular albums list
    albums: [] as Album[],
    loading: false,
    error: null as string | null,
    limit: 3,
    offset: 0,

    // Album detail
    albumDetail: null as AlbumDetail | null,
    albumDetailLoading: false,
    albumDetailError: null as string | null,

    // Album photos pagination
    photosLimit: 10,
    photosOffset: 0,
    hasMorePhotos: true,
    photosLoading: false,

    // Similar albums
    similarAlbums: [] as SimilarAlbum[],
    similarAlbumsLoading: false,
    similarAlbumsError: null as string | null,
  }),

  actions: {
    // Fetch regular albums list
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

    // Fetch album detail by slug
    async fetchAlbumDetail(
      slug: string,
      limit: number = 10,
      offset: number = 0,
      append: boolean = false,
    ) {
      this.albumDetailLoading = true
      this.albumDetailError = null

      if (!append) {
        this.albumDetail = null
        this.photosOffset = 0
        this.hasMorePhotos = true
      }

      try {
        const response = await apiService.getAlbumDetail(slug, limit, offset)
        const albumData = response.data

        if (append && this.albumDetail) {
          // Append new photos to existing album
          this.albumDetail.photos = [...this.albumDetail.photos, ...albumData.photos]
        } else {
          // Set new album data
          this.albumDetail = albumData
        }

        // Update pagination state
        this.photosLimit = limit
        this.photosOffset = offset + limit
        this.hasMorePhotos = albumData.photos.length === limit
      } catch (err) {
        this.albumDetailError = err instanceof Error ? err.message : 'Failed to fetch album details'
        console.error('Error fetching album details:', err)
        if (!append) {
          this.albumDetail = null
        }
      } finally {
        this.albumDetailLoading = false
      }
    },

    // Load more photos for current album
    async loadMorePhotos() {
      if (!this.albumDetail?.slug || this.photosLoading || !this.hasMorePhotos) {
        return
      }

      this.photosLoading = true

      try {
        await this.fetchAlbumDetail(
          this.albumDetail.slug,
          this.photosLimit,
          this.photosOffset,
          true,
        )
      } catch (err) {
        console.error('Error loading more photos:', err)
      } finally {
        this.photosLoading = false
      }
    },

    // Fetch similar albums
    async fetchSimilarAlbums(albumId: number, limit: number = 3) {
      this.similarAlbumsLoading = true
      this.similarAlbumsError = null

      try {
        const response = await apiService.getSimilarAlbums(albumId, limit)
        this.similarAlbums = response.data
      } catch (err) {
        this.similarAlbumsError =
          err instanceof Error ? err.message : 'Failed to fetch similar albums'
        console.error('Error fetching similar albums:', err)
        this.similarAlbums = []
      } finally {
        this.similarAlbumsLoading = false
      }
    },

    // Fetch album detail and similar albums together
    async fetchAlbumWithSimilar(slug: string, similarLimit: number = 3) {
      await this.fetchAlbumDetail(slug)

      // If album detail was fetched successfully, fetch similar albums
      if (this.albumDetail?.id) {
        await this.fetchSimilarAlbums(this.albumDetail.id, similarLimit)
      }
    },

    clearError() {
      this.error = null
      this.albumDetailError = null
      this.similarAlbumsError = null
    },

    clearAlbumDetail() {
      this.albumDetail = null
      this.albumDetailError = null
      this.photosOffset = 0
      this.hasMorePhotos = true
    },

    clearSimilarAlbums() {
      this.similarAlbums = []
      this.similarAlbumsError = null
    },
  },

  getters: {
    hasAlbums: (state) => state.albums.length > 0,
    hasAlbumDetail: (state) => state.albumDetail !== null,
    hasSimilarAlbums: (state) => state.similarAlbums.length > 0,

    getAlbumBySlug: (state) => {
      return (slug: string) => state.albums.find((album: Album) => album.slug === slug)
    },

    getAlbumDetailBySlug: (state) => {
      return (slug: string) => (state.albumDetail?.slug === slug ? state.albumDetail : null)
    },

    // Computed properties for loading states
    isLoading: (state) => state.loading || state.albumDetailLoading || state.similarAlbumsLoading,
    hasError: (state) => state.error || state.albumDetailError || state.similarAlbumsError,
  },
})
