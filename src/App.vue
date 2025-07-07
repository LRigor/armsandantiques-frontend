<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppContactUs from '@/components/layout/AppContactUs.vue'
import { useHead } from '@vueuse/head'

useHead({
  titleTemplate: '%s | Arms and Antiques',
  meta: [
    {
      name: 'description',
      content: 'Rare & Collectible Firearms, Antiques & Military Items - Arms and Antiques',
    },
    {
      name: 'keywords',
      content: 'firearms, antiques, military, collectibles, arms, auction, rare',
    },
    { property: 'og:site_name', content: 'Arms and Antiques' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <AppContactUs />

    <main class="flex-1">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style>
.font-georgia {
  font-family: 'Georgia', 'Times New Roman', serif;
}

.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>
