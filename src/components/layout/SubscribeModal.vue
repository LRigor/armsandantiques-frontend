<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
  >
    <div
      class="bg-[#181818] rounded-lg shadow-lg max-w-3xl w-full px-10 py-24 space-y-8 relative text-white"
    >
      <button
        @click="$emit('close')"
        class="absolute top-6 right-6 text-gray-400 hover:text-white text-4xl"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <h2 class="text-4xl font-serif text-center">Subscribe to our updates</h2>
      <p class="text-center text-gray-300">
        Subscribe to periodic email updates to have the first opportunity<br />
        to acquire new items for your collection.
      </p>
      <form @submit.prevent="onSubscribe" class="flex flex-row w-full items-center justify-center">
        <div class="flex w-3/5">
          <input
            v-model="email"
            type="email"
            required
            placeholder="You@email.com"
            class="flex-1 px-4 py-3 bg-[#222] text-white outline-none placeholder-gray-400 border border-gray-600 border-r-0"
          />
          <button
            type="submit"
            class="px-8 py-3 bg-[#222] text-white tracking-wide border border-gray-600 hover:bg-[#333] transition"
          >
            SUBSCRIBE
          </button>
        </div>
      </form>
      <div class="flex justify-center gap-8 text-sm text-gray-300">
        <div class="flex items-center gap-2">
          <span class="text-[#f8e6ad] text-lg">✔</span>
          <span>We use secure transmission</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[#f8e6ad] text-lg">✔</span>
          <span>We protect your personal information</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])
const email = ref('')

function onSubscribe() {
  emit('close')
}
</script>
