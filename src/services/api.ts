export const apiService = {
  async getVisitorCount() {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + '/visitors-counter/')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return {
        data: {
          total_visitors: data.total_visitors,
        },
      }
    } catch (error) {
      console.error('Failed to fetch visitor count:', error)
      return {
        data: {
          total_visitors: 0,
        },
      }
    }
  },

  async getProducts(options: {
    type: 'all' | 'for_sale' | 'sold'
    slug?: string
    limit?: number
    offset?: number
    region?: string
    productType?: string
    search?: string
    excludeId?: number
    sortBy?: 'rand' | 'default'
  }) {
    try {
      const {
        type,
        slug,
        limit = 15,
        offset = 0,
        region,
        productType,
        search,
        excludeId,
        sortBy = 'default',
      } = options

      console.log(type)
      // If slug is provided, fetch single product
      if (slug) {
        const response = await fetch(import.meta.env.VITE_BASE_URL + `/products/${slug}/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return {
          data: data,
        }
      }

      // Build URL for multiple products
      let url =
        import.meta.env.VITE_BASE_URL +
        `/products/${type == 'all' ? '' : type + '/'}?limit=${limit}&offset=${offset}`

      // Add sort parameter
      if (sortBy === 'rand') {
        url += '&sort_by=rand'
      }

      // Add exclude parameter
      if (excludeId) {
        url += `&exclude=${excludeId}`
      }

      // Add search parameter (takes precedence over region and productType)
      if (search) {
        url += `&search=${encodeURIComponent(search)}`
      } else {
        // Add region parameter
        if (region) {
          url += `&region=${region}`
        }

        // Add product type parameter
        if (productType) {
          url += `&type=${productType}`
        }
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return {
        data: data,
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
      // Return empty array for multiple products, throw error for single product
      if (options.slug) {
        throw error
      }
      return {
        data: [],
      }
    }
  },

  async getRegions(withProduct: boolean, type: string) {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL +
          `/regions/${withProduct ? 'with-products/' : ''}?catalog_type=${type}`,
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return {
        data: data,
      }
    } catch (error) {
      console.error('Failed to fetch regions:', error)
      return {
        data: [],
      }
    }
  },

  async getProductTypes(withProduct: boolean, type: string) {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL +
          `/product-types/${withProduct ? 'with-products/' : ''}?catalog_type=${type}`,
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return {
        data: data,
      }
    } catch (error) {
      console.error('Failed to fetch product types:', error)
      return {
        data: [],
      }
    }
  },

  async getAlbums(limit: number = 3, offset: number = 0) {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + `/albums/?limit=${limit}&offset=${offset}`,
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return {
        data: data,
      }
    } catch (error) {
      console.error('Failed to fetch albums:', error)
      return {
        data: [],
      }
    }
  },
}
