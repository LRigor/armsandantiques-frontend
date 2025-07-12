<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

interface Product {
  id: number
  name: string
  slug: string
  price?: number | null
  image_large?: string | null
  image_medium?: string | null
  image_original?: string | null
  image_alt_text?: string | null
  status?: string
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

const statusLabel = computed(() => {
  if (!props.product.status || props.product.status === 'enabled') {
    return null
  }

  switch (props.product.status) {
    case 'sold':
      return 'Sold'
    case 'price_on_request':
      return 'Price on Request'
    case 'on_hold':
      return 'On Hold'
    default:
      return props.product.status
  }
})
</script>

<template>
  <div
    class="bg-black shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 pb-0"
  >
    <!-- Product Image -->
    <RouterLink
      :to="`/product/${product.slug}`"
      class="relative bg-black cursor-pointer w-[360px] h-[537px] pt-[37px] pl-[45px] pr-[55px] box-border group flex flex-col gap-4"
    >
      <!-- Status Banner -->
      <div
        v-if="statusLabel"
        class="absolute w-72 h-12 flex items-center text-center justify-center font-georgia italic bottom-[15px] -left-1/3 bg-[#f1c40f] text-black py-2 px-20 text-xs font-bold uppercase tracking-wide rotate-45 z-20"
      >
        <span v-if="statusLabel === 'Price on Request'">Price on <br />Request</span>
        <span v-else>{{ statusLabel }}</span>
      </div>

      <h4
        class="relative z-10 text-lg leading-[1.72] overflow-hidden font-serif text-white transition-colors duration-300 ease-out line-clamp-2 group-hover:text-[#f8e6ad]"
      >
        {{ product.name }}
      </h4>
      <div class="flex-1">
        <img
          :src="product.image_large || product.image_medium || product.image_original"
          :alt="product.image_alt_text || product.name"
          class="absolute z-0 bottom-0 left-1/2 -translate-x-1/2 h-[76.4%] w-full object-contain"
          loading="lazy"
        />
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
