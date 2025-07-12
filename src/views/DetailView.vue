<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { onMounted, computed, watch } from 'vue'
import { useProductDetailStore } from '@/stores/productDetail'
import ProductCard from '@/components/ProductCard.vue'
import ProductSlideShow from '@/components/ProductSlideShow.vue'
import IconShareFacebook from '@/components/icons/IconShareFacebook.vue'
import IconPinterestAlt from '@/components/icons/IconPinterestAlt.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconVK from '@/components/icons/IconVK.vue'
import IconSnapchat from '@/components/icons/IconSnapchat.vue'

const route = useRoute()
const productDetailStore = useProductDetailStore()

const productSlug = computed(() => route.params.slug as string)

// Fetch product data when component mounts or slug changes
onMounted(() => {
  if (productSlug.value) {
    productDetailStore.fetchProduct(productSlug.value)
  }
})

// Watch for route changes to fetch new product data
watch(productSlug, (newSlug) => {
  if (newSlug) {
    productDetailStore.fetchProduct(newSlug)
  }
})

// Format price for display
const formattedPrice = computed(() => {
  if (productDetailStore.product?.price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(productDetailStore.product.price)
  }
  return ''
})

// Set dynamic page meta
useHead(
  computed(() => ({
    title: `${productDetailStore.productName || 'Product'} - Arms and Antiques`,
    meta: [
      {
        name: 'description',
        content:
          productDetailStore.product?.seo_description ||
          `View details for ${productDetailStore.productName || 'this product'} at Arms and Antiques.`,
      },
      {
        name: 'keywords',
        content: productDetailStore.product?.seo_keywords || '',
      },
    ],
  })),
)
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="productDetailStore.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      <p class="mt-4 text-gray-600">Loading product details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="productDetailStore.error" class="text-center py-12">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 class="text-lg font-semibold text-red-800 mb-2">Error Loading Product</h3>
        <p class="text-red-600">{{ productDetailStore.error }}</p>
        <button
          @click="productDetailStore.fetchProduct(productSlug)"
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
    <!-- Product Details -->
    <div v-else-if="productDetailStore.hasProduct">
      <div class="text-white bg-black">
        <!-- Product Information -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-row gap-12">
          <div class="space-y-6 w-1/2">
            <div class="flex flex-col space-y-6">
              <p class="text-gray-500 text-xl">Item: {{ productDetailStore.product.uid }}</p>
              <h1 class="text-4xl text-white font-georgia">
                {{ productDetailStore.productName }}
              </h1>

              <div v-if="productDetailStore.product?.status" class="text-sm font-medium">
                <div
                  v-if="productDetailStore.product.status === 'enabled'"
                  class="flex flex-col gap-8 text-base"
                >
                  <div v-if="formattedPrice" class="text-2xl font-georgia text-[#f8e6ad]">
                    {{ formattedPrice }}
                  </div>
                  <div class="flex flex-row gap-6">
                    <RouterLink
                      to="/contact"
                      class="text-[#f8e6ad] w-max border border-[#f8e6ad] px-16 py-4 hover:bg-[#f8e6ad] hover:text-black transition-colors uppercase"
                    >
                      Buy Now
                    </RouterLink>
                    <RouterLink
                      to="/contact"
                      class="text-[#ccc] w-max border border-[#ccc] px-12 py-4 hover:bg-[#ccc] hover:text-black transition-colors uppercase"
                    >
                      Request more info
                    </RouterLink>
                  </div>
                </div>
                <div
                  v-else-if="productDetailStore.product?.status === 'price_on_request'"
                  class="flex flex-col gap-4"
                >
                  <div class="text-[#f8e6ad] text-2xl font-georgia">Price on request</div>
                  <RouterLink
                    to="/contact"
                    class="text-[#ccc] w-max border border-[#ccc] px-12 py-4 hover:bg-[#ccc] hover:text-black transition-colors uppercase"
                  >
                    Request price
                  </RouterLink>
                </div>
                <div
                  v-else-if="productDetailStore.product?.status === 'on_hold'"
                  class="flex flex-col gap-4"
                >
                  <div class="text-[#f8e6ad] text-2xl font-georgia">Item is currently on hold</div>
                  <RouterLink
                    to="/contact"
                    class="text-[#ccc] w-max border border-[#ccc] px-12 py-4 hover:bg-[#ccc] hover:text-black transition-colors uppercase"
                  >
                    See similar items
                  </RouterLink>
                </div>
                <div
                  v-else-if="productDetailStore.product?.status === 'sold'"
                  class="flex flex-col gap-4"
                >
                  <div class="text-[#f8e6ad] text-2xl font-georgia">Sold</div>
                  <RouterLink
                    to="/contact"
                    class="text-[#ccc] w-max border border-[#ccc] px-12 py-4 hover:bg-[#ccc] hover:text-black transition-colors uppercase"
                  >
                    Request more info
                  </RouterLink>
                </div>
              </div>

              <!-- Product Properties -->
              <div v-if="productDetailStore.productProperties.length > 0" class="pt-6">
                <dl class="space-y-2">
                  <div
                    v-for="(property, index) in productDetailStore.productProperties"
                    :key="index"
                    class="flex justify-between py-2 border-b text-xl border-gray-500"
                  >
                    <dt class="text-white">{{ property.name }}:</dt>
                    <dd class="text-gray-400">{{ property.value }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- Product Description -->
            <div
              v-if="productDetailStore.product?.description"
              class="prose prose-gray max-w-none space-y-6"
            >
              <h3 class="text-3xl font-georgia">Description</h3>
              <div
                v-html="productDetailStore.product.description"
                class="text-gray-400 text-lg"
              ></div>
            </div>

            <div class="flex flex-row items-center text-white gap-4">
              <a target="_blank">
                <IconShareFacebook />
              </a>
              <a target="_blank">
                <IconPinterestAlt />
              </a>
              <a target="_blank">
                <IconTwitter />
              </a>
              <a target="_blank">
                <IconVK />
              </a>
              <a target="_blank">
                <IconSnapchat />
              </a>
            </div>
          </div>
          <div class="w-1/2 flex justify-center sticky top-32 self-start">
            <img
              :src="
                productDetailStore.product.image_original ||
                productDetailStore.product.image_medium ||
                productDetailStore.product.image_small
              "
              alt="Product Image"
              class="h-[75vh] object-cover"
            />
          </div>
        </div>
      </div>
      <div class="bg-[#1b1b1b]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
          <!-- Product Images Slideshow -->
          <ProductSlideShow
            :images="productDetailStore.productImages"
            :product-name="productDetailStore.productName"
          />

          <!-- Similar Products Section -->
          <div
            v-if="
              productDetailStore.hasSimilarProducts || productDetailStore.similarProductsLoading
            "
          >
            <div class="flex justify-between items-center mb-8">
              <div>
                <h3 class="text-3xl text-white font-georgia">Similar Items</h3>
              </div>
              <RouterLink
                :to="`/for-sale`"
                class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-lg font-roboto"
              >
                View More
                <Icon icon="heroicons:arrow-right-20-solid" class="w-5 h-5 text-white" />
              </RouterLink>
            </div>

            <!-- Similar Products Loading -->
            <div v-if="productDetailStore.similarProductsLoading" class="flex justify-center">
              <div
                class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"
              ></div>
            </div>

            <!-- Similar Products Grid -->
            <div
              v-else-if="productDetailStore.hasSimilarProducts"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <ProductCard
                v-for="product in productDetailStore.similarProducts"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Similar Products Error -->
            <div v-else-if="productDetailStore.similarProductsError" class="text-center py-8">
              <p class="text-gray-500 mb-4">Unable to load similar items</p>
              <button
                @click="productDetailStore.fetchSimilarProducts(productDetailStore.product?.id)"
                class="text-amber-600 hover:text-amber-700 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- No Product Found -->
    <div v-else class="text-center py-12">
      <div class="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
        <p class="text-gray-600 mb-4">The product you're looking for could not be found.</p>
        <router-link
          to="/"
          class="inline-block bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition-colors"
        >
          Return Home
        </router-link>
      </div>
    </div>
  </div>
</template>
