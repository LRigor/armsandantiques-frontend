<template>
  <div class="recaptcha-container">
    <div ref="recaptchaEl"></div>
    <div v-if="error" class="text-red-400 text-xs mt-2">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['verified', 'error'])
const recaptchaEl = ref<HTMLElement | null>(null)
const isVerified = ref(false)
const error = ref('')
let widgetId: number | null = null
let resolvePromise: ((token: string) => void) | null = null
let rejectPromise: ((err: Error) => void) | null = null

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

function loadScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) return resolve()
    if (document.getElementById('recaptcha-script')) return resolve()
    const script = document.createElement('script')
    script.id = 'recaptcha-script'
    script.src =
      'https://www.google.com/recaptcha/api.js?onload=onRecaptchaApiLoaded&render=explicit'
    script.async = true
    script.defer = true
    window.onRecaptchaApiLoaded = () => resolve()
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'))
    document.head.appendChild(script)
  })
}

function renderRecaptcha() {
  if (!window.grecaptcha || !recaptchaEl.value) return
  widgetId = window.grecaptcha.render(recaptchaEl.value, {
    sitekey: SITE_KEY,
    size: 'normal',
    theme: 'dark', // Use dark theme for reCAPTCHA
    callback: (token: string) => {
      isVerified.value = true
      error.value = ''
      emit('verified', token)
      if (resolvePromise) resolvePromise(token)
      resolvePromise = null
      rejectPromise = null
    },
  })
}

const execute = () => {
  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha || widgetId === null) {
      reject(new Error('reCAPTCHA not loaded'))
      return
    }
    resolvePromise = resolve
    rejectPromise = reject
    window.grecaptcha.execute(widgetId)
  })
}

const reset = () => {
  if (window.grecaptcha && widgetId !== null) {
    window.grecaptcha.reset(widgetId)
  }
  isVerified.value = false
  error.value = ''
  resolvePromise = null
  rejectPromise = null
}

defineExpose({ execute, reset, isVerified: () => isVerified.value })

onMounted(async () => {
  try {
    await loadScript()
    renderRecaptcha()
  } catch (err) {
    error.value = 'Failed to load reCAPTCHA'
    emit('error', 'Failed to load reCAPTCHA')
  }
})

onUnmounted(() => {
  resolvePromise = null
  rejectPromise = null
})
</script>

<style scoped>
.recaptcha-container {
  /* Add any additional styling if needed */
}
</style>
