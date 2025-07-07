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

  async getRegions() {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + '/regions/with-products/?catalog_type=for_sale',
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

  async getProductTypes() {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + '/product-types/with-products/?catalog_type=for_sale',
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
        `https://api.armsandantiques.com/albums/?limit=${limit}&offset=${offset}`,
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
