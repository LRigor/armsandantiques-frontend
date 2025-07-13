<template>
  <!-- Header -->
  <div class="pb-12 md:pb-16 lg:pb-24 relative bg-[#161616]">
    <div
      class="relative items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-10 lg:gap-12 z-10 pt-10 lg:pt-20"
    >
      <!-- Product Information Section (if product is provided) -->
      <section
        v-if="productDetailStore.hasProduct"
        class="flex flex-col max-w-4xl bg-black p-4 lg:p-12"
      >
        <div class="w-full p-8 rounded-lg flex flex-col gap-8">
          <h2 class="text-5xl font-georgia text-white border-b border-gray-700 pb-6">
            Request for more information.
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div>
                <p class="text-gray-500 text-sm">Item: {{ productDetailStore.product?.uid }}</p>
                <h3 class="text-xl font-georgia text-white">
                  {{ productDetailStore.productName }}
                </h3>
              </div>
              <div v-if="formattedPrice" class="text-lg text-[#f8e6ad]">
                {{ formattedPrice }}
              </div>
            </div>
            <div class="flex justify-center">
              <img
                :src="
                  productDetailStore.product?.image_original ||
                  productDetailStore.product?.image_medium ||
                  productDetailStore.product?.image_small
                "
                :alt="productDetailStore.productName"
                class="max-h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        <form class="w-full space-y-8 text-gray-200" @submit.prevent="handleSubmit">
          <div class="flex flex-col md:flex-row gap-6">
            <input
              v-model="formData.email"
              type="email"
              required
              placeholder="Your Email*"
              class="flex-1 bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
            />
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Your Name*"
              class="flex-1 bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <textarea
            v-model="formData.comments"
            rows="6"
            placeholder="Comments"
            class="w-full bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
          ></textarea>
          <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Recaptcha
              ref="recaptchaRef"
              @verified="onRecaptchaVerified"
              @error="onRecaptchaError"
            />
            <button
              type="submit"
              :disabled="isSubmitting"
              class="bg-transparent border border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-black px-12 py-3 transition uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'SENDING...' : 'SEND' }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Recaptcha from '@/components/common/Recaptcha.vue'
import { apiService } from '@/services/api'
import { useProductDetailStore } from '@/stores/productDetail'

const route = useRoute()
const productDetailStore = useProductDetailStore()

const error = ref('')
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')
const recaptchaToken = ref('')
const recaptchaRef = ref<InstanceType<typeof Recaptcha>>()

// Get product slug from query parameters
const productSlug = computed(() => route.params.slug as string)

// Form data
const formData = ref({
  email: '',
  name: '',
  comments: '',
  productSlug: '', // Add product slug to form data
})

// Fetch product data if slug is provided
onMounted(async () => {
  if (productSlug.value) {
    formData.value.productSlug = productSlug.value
    try {
      await productDetailStore.fetchProduct(productSlug.value)
    } catch (err) {
      console.error('Error fetching product:', err)
    }
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

// reCAPTCHA handlers
function onRecaptchaVerified(token: string) {
  recaptchaToken.value = token
  submitError.value = ''
}

function onRecaptchaError(error: string) {
  submitError.value = `reCAPTCHA error: ${error}`
}

// Form submission
async function handleSubmit() {
  if (isSubmitting.value) return

  // Reset previous messages
  submitError.value = ''
  submitSuccess.value = ''

  // Validate form
  if (!formData.value.email || !formData.value.name) {
    submitError.value = 'Please fill in all required fields.'
    return
  }

  // Execute reCAPTCHA
  try {
    isSubmitting.value = true

    if (recaptchaRef.value) {
      const token = await recaptchaRef.value.execute()
      recaptchaToken.value = token
    }

    // Prepare form data
    const submitData = {
      ...formData.value,
      recaptchaToken: recaptchaToken.value,
    }

    // Submit to API
    await apiService.submitSellToUsForm(submitData)

    // Success
    submitSuccess.value = 'Thank you! Your message has been sent successfully.'

    // Reset form
    formData.value = { email: '', name: '', comments: '', productSlug: '' }
    if (recaptchaRef.value) {
      recaptchaRef.value.reset()
    }
  } catch (err) {
    submitError.value = 'Failed to submit form. Please try again.'
    console.error('Form submission error:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
