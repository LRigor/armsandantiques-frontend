<template>
  <!-- Header -->
  <div class="pb-12 md:pb-16 lg:pb-24 relative bg-[#161616]">
    <div
      class="relative items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-10 lg:gap-12 z-10 pt-10 lg:pt-20"
    >
      <!-- Product Information Section (if product is provided) -->
      <section v-if="productDetailStore.hasProduct" class="flex flex-col bg-black p-4 lg:p-12">
        <h2 class="text-5xl font-georgia text-white border-b border-gray-700 pb-6">Checkout</h2>
        <div class="flex flex-col-reverse md:flex-row gap-12 py-6">
          <!-- Left: Form -->
          <form class="flex-1 w-full space-y-8 text-gray-200" @submit.prevent="handleSubmit">
            <p>Shipping Address</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                v-model="formData.firstName"
                type="text"
                required
                placeholder="First Name"
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <input
                v-model="formData.lastName"
                type="text"
                required
                placeholder="Last Name"
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <input
                v-model="formData.phone"
                type="text"
                required
                placeholder="Phone"
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <input
                v-model="formData.email"
                type="email"
                required
                placeholder="E-mail"
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <select
                v-model="formData.country"
                required
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              >
                <option value="" disabled>Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
                <!-- Add more countries as needed -->
              </select>
              <select
                v-model="formData.region"
                required
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              >
                <option value="" disabled>Region / State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="MH">Maharashtra</option>
                <!-- Add more regions/states as needed -->
              </select>
              <input
                v-model="formData.city"
                type="text"
                required
                placeholder="City"
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <input
                v-model="formData.postalCode"
                type="text"
                required
                placeholder="Postal Code"
                class="bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <input
              v-model="formData.address"
              type="text"
              required
              placeholder="Address"
              class="w-full bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
            />
            <textarea
              v-model="formData.shippingInstructions"
              rows="3"
              placeholder="Shipping instructions"
              class="w-full bg-transparent border border-gray-600 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
            ></textarea>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <button
                type="button"
                class="bg-transparent border w-full border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-black py-3 transition uppercase"
              >
                PAY VIA PAYPAL
              </button>
              <button
                type="button"
                class="bg-transparent border w-full border-gray-700 text-gray-700 py-3 uppercase cursor-not-allowed"
                disabled
              >
                PAY VIA CREDIT CARD
              </button>
              <RouterLink
                :to="`/wire-transfer`"
                class="md:col-span-2 bg-transparent border border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-black px-4 py-3 transition uppercase"
              >
                WIRE TRANSFER AND OTHER PAYMENT METHODS
              </RouterLink>
            </div>
          </form>
          <!-- Right: Product summary -->
          <div class="flex-1 flex flex-col items-center justify-center text-left mt-12 md:mt-0">
            <img
              :src="
                productDetailStore.product?.image_original ||
                productDetailStore.product?.image_medium ||
                productDetailStore.product?.image_small
              "
              :alt="productDetailStore.productName"
              class="max-h-64 object-cover rounded-lg"
            />
            <div class="mt-8 text-gray-400">Item: {{ productDetailStore.product?.uid }}</div>
            <div class="text-2xl font-georgia text-white mt-2">
              {{ productDetailStore.productName }}
            </div>
            <div class="text-2xl text-[#f8e6ad] mt-2">{{ formattedPrice }}</div>
          </div>
        </div>
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
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  country: '',
  region: '',
  city: '',
  postalCode: '',
  address: '',
  shippingInstructions: '',
  productSlug: '',
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

// Form submission
async function handleSubmit() {
  if (isSubmitting.value) return

  // Reset previous messages
  submitError.value = ''
  submitSuccess.value = ''

  // Validate form
  if (
    !formData.value.email ||
    !formData.value.firstName ||
    !formData.value.lastName ||
    !formData.value.phone ||
    !formData.value.country ||
    !formData.value.region ||
    !formData.value.city ||
    !formData.value.postalCode ||
    !formData.value.address
  ) {
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
    formData.value = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      country: '',
      region: '',
      city: '',
      postalCode: '',
      address: '',
      shippingInstructions: '',
      productSlug: '',
    }
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
