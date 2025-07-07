export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: Category
  images: string[]
  region?: string
  type?: string
  inStock: boolean
  featured: boolean
  slug: string
  createdAt: string
  updatedAt: string
  image_large?: string
  image_medium?: string
  image_original?: string
  image_alt_text?: string
  status: string
  date_added: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
}

export interface Museum {
  id: number
  name: string
  description: string
  location: string
  website?: string
  image: string
  slug: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
  attachments?: File[]
  productId?: number
  captchaToken?: string
}

export interface FilterOptions {
  category?: string
  region?: string
  type?: string
  priceMin?: number
  priceMax?: number
  search?: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface ApiResponse<T> {
  data: T
  meta?: PaginationMeta
  message?: string
  success: boolean
}

export interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
  media_type: string
  timestamp: string
}

export interface SEOData {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
}

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
}

export interface ProductType {
  id: number
  name: string
  slug: string
  seo_description?: string
  products: Product[]
}

export interface Region {
  id: number
  name: string
  slug: string
  main_page_image?: string
  product?: Product
}

export interface Album {
  id: number
  name: string
  slug: string
  cover_medium: string
  number_of_photos: number
}
