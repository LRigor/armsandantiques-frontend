<template>
  <!-- Header -->
  <div class="pb-12 md:pb-16 lg:pb-24 relative bg-[#161616]">
    <img
      src="/sell-to-us.jpg"
      alt="Background Image"
      class="absolute top-0 left-0 w-full h-48 sm:h-56 md:h-64 2xl:h-96 object-cover z-0"
    />
    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-10 lg:gap-12 z-10"
    >
      <div class="px-4 sm:px-8 md:px-16 lg:px-28 text-left py-20 md:py-24 lg:py-24 2xl:py-36">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-georgia"
        >
          Wire transfer and other payment methods
        </h1>
      </div>
      <div
        class="px-4 sm:px-8 md:px-16 lg:px-28 text-left font-georgia text-white text-xl md:text-3xl py-4 lg:py-12 flex flex-col gap-4"
      >
        Thank you your interest in purchasing South Indian Travancore Parashu axe. Please let us
        know what payment method you prefer or if you have questions regarding payment.
      </div>
      <section class="flex justify-center px-4 sm:px-8 md:px-16 lg:px-28">
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
import { ref } from 'vue'
import Recaptcha from '@/components/common/Recaptcha.vue'
import { apiService } from '@/services/api'

const error = ref('')
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')
const recaptchaToken = ref('')
const recaptchaRef = ref<InstanceType<typeof Recaptcha>>()

// Form data
const formData = ref({
  email: '',
  name: '',
  comments: '',
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
    formData.value = { email: '', name: '', comments: '' }
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
