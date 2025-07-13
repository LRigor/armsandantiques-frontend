<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomStore } from '@/stores/custom'
import CustomLayout from '@/components/layout/CustomLayout.vue'
import ProductCard from '@/components/layout/ProductCard.vue'

const route = useRoute()
const customStore = useCustomStore()

// Set the URL and fetch data when component mounts
customStore.url = route.name?.toString() || 'about'

onMounted(() => {
  customStore.fetchCustomPage()
  customStore.fetchSuggestedItems()
})
</script>

<template>
  <CustomLayout :store="customStore" :fetch="customStore.fetchCustomPage">
    <!-- Header -->
    <div class="py-12 md:py-16 lg:py-24 relative">
      <img
        :src="customStore.customData?.bg_image"
        alt="Background Image"
        class="absolute top-0 left-0 w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover z-0"
      />
      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-10 lg:gap-12 z-10"
      >
        <div class="px-4 sm:px-8 md:px-16 lg:px-28 text-left pt-16 2xl:pt-28">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-georgia"
          >
            {{ customStore.customData?.title }}
          </h1>
        </div>
        <!-- Content -->
        <div
          class="flex items-center px-4 sm:px-8 md:px-16 lg:px-28 py-8 sm:py-12 md:py-16 lg:py-20 mx-auto"
        >
          <div
            v-html="customStore.customData?.content"
            class="content-wrapper text-white text-lg leading-relaxed"
          ></div>
        </div>

        <!-- Suggested Items -->
        <div v-if="customStore.suggestedItems.length > 0" class="mt-8 md:mt-12">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 md:mb-8"
          >
            <div>
              <h3 class="text-2xl sm:text-2xl md:text-3xl text-white font-georgia">
                Suggested Items
              </h3>
            </div>
            <RouterLink
              :to="`/for-sale`"
              class="text-[#f8e6ad] hover:text-[#f8e6ad] flex items-center gap-2 text-base md:text-lg font-roboto"
            >
              View More
              <Icon
                icon="heroicons:arrow-right-20-solid"
                class="w-4 h-4 md:w-5 md:h-5 text-white"
              />
            </RouterLink>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <ProductCard
              v-for="item in customStore.suggestedItems"
              :key="item.id"
              :product="item"
            />
          </div>
        </div>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped>
.content-wrapper {
  font-family: 'Roboto', sans-serif;
  color: #ccc !important;
  font-size: 1.125rem !important;
  line-height: 1.75 !important;
}

/* Target all elements inside the content wrapper */
.content-wrapper :deep(*) {
  font-family: 'Roboto', sans-serif;
  color: #ccc !important;
  font-size: 1.125rem !important;
  line-height: 1.75 !important;
}

/* Specific overrides for common HTML elements */
.content-wrapper :deep(p) {
  font-family: 'Roboto', sans-serif;
  color: #ccc !important;
  font-size: 1.125rem !important;
  line-height: 1.75 !important;
  margin-bottom: 1rem !important;
}

.content-wrapper :deep(h1),
.content-wrapper :deep(h2),
.content-wrapper :deep(h3),
.content-wrapper :deep(h4),
.content-wrapper :deep(h5),
.content-wrapper :deep(h6) {
  color: #ccc !important;
  margin-bottom: 1rem !important;
}

.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  color: #ccc !important;
  font-size: 1.125rem !important;
  line-height: 1.75 !important;
}

.content-wrapper :deep(li) {
  color: #ccc !important;
  font-size: 1.125rem !important;
  line-height: 1.75 !important;
}
</style>
