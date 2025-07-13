<template>
  <!-- Header -->
  <div class="pb-12 md:pb-16 lg:pb-24 relative bg-[#161616]">
    <img
      src="/contact-us.jpg"
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
          Contact Us
        </h1>
      </div>
      <section class="flex justify-center px-4 sm:px-8 md:px-16 lg:px-28 pt-10 lg:pt-20">
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
          <div
            class="border border-dashed border-gray-600 rounded p-6 flex flex-col items-center text-center gap-2 w-full cursor-pointer"
            @click="triggerFileInput"
            @drop="onDrop"
            @dragover="onDragOver"
          >
            <input
              id="fileInput"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              class="hidden"
              multiple
              @change="onFileChange"
            />
            <span v-if="files.length === 0" class="text-lg">Press or Drag-and-drop photos</span>
            <span v-if="files.length === 0" class="text-sm text-gray-400"
              >Available formats: JPG and PNG<br />Maximum file size: 5Mb</span
            >
            <button
              v-if="files.length === 0"
              type="button"
              class="mt-4 px-8 py-2 border border-gray-600 text-gray-200 hover:bg-gray-700 transition"
            >
              BROWSE
            </button>
            <div v-if="files.length" class="mt-2 w-full text-left">
              <div class="flex flex-wrap gap-4 mb-2">
                <div
                  v-for="img in imagePreviews"
                  :key="img.name + img.size"
                  class="relative group w-56 h-56"
                >
                  <img
                    :src="img.url"
                    :alt="img.name"
                    class="w-56 h-56 object-cover rounded border border-gray-700"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center rounded transition-opacity duration-200"
                  >
                    <span
                      class="text-white text-xs px-2 text-center break-all absolute bottom-2 left-2"
                      >{{ img.name }}</span
                    >
                    <button
                      type="button"
                      class="absolute top-4 right-4 text-white rounded-full text-5xl"
                      @click.stop="removeFile(img.name, img.size)"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="error" class="text-red-400 text-xs mt-2">{{ error }}</div>
          </div>
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
import { ref, computed, onUnmounted } from 'vue'
import Recaptcha from '@/components/common/Recaptcha.vue'
import { apiService } from '@/services/api'

const files = ref<File[]>([])
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

// Generate preview URLs for images
const imagePreviews = computed(() =>
  files.value.map((file) => ({
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
  })),
)

// Clean up object URLs when files change or component unmounts
onUnmounted(() => {
  imagePreviews.value.forEach((img) => URL.revokeObjectURL(img.url))
})

function onFileChange(event: Event) {
  error.value = ''
  const input = event.target as HTMLInputElement
  if (!input.files) return
  handleFiles(input.files)
}

function handleFiles(fileList: FileList) {
  const newFiles: File[] = []
  for (const file of Array.from(fileList)) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      error.value = 'Only JPG and PNG files are allowed.'
      continue
    }
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'Each file must be less than 5MB.'
      continue
    }
    // Avoid duplicates by name and size
    if (!files.value.some((f) => f.name === file.name && f.size === file.size)) {
      newFiles.push(file)
    }
  }
  if (newFiles.length) files.value = [...files.value, ...newFiles]
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  error.value = ''
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files)
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function triggerFileInput() {
  document.getElementById('fileInput')?.click()
}

function removeFile(name: string, size: number) {
  const idx = files.value.findIndex((f) => f.name === name && f.size === size)
  if (idx !== -1) {
    // Revoke the object URL
    const img = imagePreviews.value.find((img) => img.name === name && img.size === size)
    if (img) URL.revokeObjectURL(img.url)
    files.value.splice(idx, 1)
  }
}

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
      files: files.value,
      recaptchaToken: recaptchaToken.value,
    }

    // Submit to API
    await apiService.submitSellToUsForm(submitData)

    // Success
    submitSuccess.value = 'Thank you! Your message has been sent successfully.'

    // Reset form
    formData.value = { email: '', name: '', comments: '' }
    files.value = []
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
