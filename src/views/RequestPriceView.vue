<template>
  <div class="min-h-screen flex items-center justify-center bg-[#161616] py-24">
    <div class="max-w-7xl mx-auto px-8 md:p-16 bg-black">
      <h2 class="text-5xl font-georgia text-white border-b border-gray-700 pb-6">
        Request for more information.
      </h2>
      <div class="flex flex-col-reverse md:flex-row w-full max-w-4xl mx-auto bg-transparent">
        <!-- Left: Info & Form -->
        <div class="flex-1 flex flex-col justify-center p-8 gap-6">
          <p class="text-gray-400 text-sm mb-2">Item: {{ productDetailStore.product?.uid }}</p>
          <h2 class="text-2xl font-georgia text-amber-100 mb-2 underline cursor-pointer">
            {{ productDetailStore.productName }}
          </h2>
          <p class="text-gray-300 mb-6">
            An automatic confidential message with the updated Price information will be sent to
            your email box from Arms And Antiques.
          </p>
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <input
              v-model="formData.email"
              type="email"
              required
              placeholder="Your Email*"
              class="form-input"
            />
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Your Name*"
              class="form-input"
            />
            <div class="flex items-center mt-2 mb-2">
              <Recaptcha
                ref="recaptchaRef"
                @verified="onRecaptchaVerified"
                @error="onRecaptchaError"
              />
            </div>
            <button type="submit" :disabled="isSubmitting" class="send-btn">
              {{ isSubmitting ? 'SENDING...' : 'SEND' }}
            </button>
          </form>
        </div>
        <!-- Right: Product Image -->
        <div class="flex-1 flex items-center justify-center p-8">
          <img
            :src="
              productDetailStore.product?.image_original ||
              productDetailStore.product?.image_medium ||
              productDetailStore.product?.image_small
            "
            :alt="productDetailStore.productName"
            class="max-h-80 object-contain rounded-lg"
          />
        </div>
      </div>
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
.request-price-bg {
  background: #000;
  min-height: 100vh;
}
.font-georgia {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.form-input {
  width: 100%;
  background: transparent;
  border: 1px solid #444;
  color: #fff;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0;
  font-size: 1rem;
}
.form-input::placeholder {
  color: #888;
}
.send-btn {
  width: 100%;
  background: transparent;
  border: 1px solid #ffd700;
  color: #ffd700;
  padding: 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s;
  cursor: pointer;
}
.send-btn:hover {
  background: #ffd700;
  color: #000;
}
</style>
