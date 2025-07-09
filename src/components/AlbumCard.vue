<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Album {
  id: number
  name: string
  slug: string
  cover_medium: string
}

interface Props {
  album: Album
}

defineProps<Props>()
</script>

<template>
  <div
    class="bg-black shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
  >
    <RouterLink :to="`/museum/${album.slug}`" class="group flex flex-col h-full">
      <div class="relative flex-shrink-0">
        <img
          :src="album.cover_medium"
          :alt="album.name"
          class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div class="p-6 bg-black flex-1 flex items-start">
        <h4
          class="text-xl font-semibold text-white font-georgia group-hover:text-[#f8e6ad] transition-colors leading-tight"
        >
          {{ album.name }}
        </h4>
      </div>
    </RouterLink>
  </div>
</template>
