# Initial State Setup Guide

This document explains how to set up and use the `window.__INITIAL_STATE__` system in your Vue 3 + Pinia application.

## Overview

The `window.__INITIAL_STATE__` object allows you to preload data into your application before the Vue.js app initializes. This is particularly useful for:

- Server-side rendering (SSR) hydration
- Initial data loading without API calls
- SEO optimization
- Faster initial page loads

## Setup Steps

### 1. Add Initial State to HTML

Replace the placeholder content in `index.html` with your complete initial state:

```html
<script>
  window.__INITIAL_STATE__ = {
    // Your complete initial state object here
    // See public/initial-state-example.js for the full structure
  }
</script>
```

### 2. Available Stores

The following Pinia stores are configured to automatically initialize from `window.__INITIAL_STATE__`:

#### App Configuration Store (`useAppConfigStore`)

```typescript
import { useAppConfigStore } from '@/stores/appConfig'

const appConfigStore = useAppConfigStore()
// Access data:
appConfigStore.userAgent // "desktop"
appConfigStore.config.gallery_enabled // true
appConfigStore.galleryName // "Museum of the World"
```

#### Catalog Store (`useCatalogStore`)

```typescript
import { useCatalogStore } from '@/stores/catalog'

const catalogStore = useCatalogStore()
// Access data:
catalogStore.catalogPreviews // []
catalogStore.limit // 15
catalogStore.filteredProducts // computed property
```

#### Product Types Store (`useProductTypesStore`)

```typescript
import { useProductTypesStore } from '@/stores/productTypes'

const productTypesStore = useProductTypesStore()
// Access data:
productTypesStore.availableTypes // based on current status
productTypesStore.typesWithProducts // product types with products
```

#### Regions Store (`useRegionsStore`)

```typescript
import { useRegionsStore } from '@/stores/regions'

const regionsStore = useRegionsStore()
// Access data:
regionsStore.availableRegions // based on current status
regionsStore.getRegionBySlug('india') // find region by slug
```

### 3. Using in Components

Here's how to use the stores in your Vue components:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRegionsStore } from '@/stores/regions'
import { useProductTypesStore } from '@/stores/productTypes'

const regionsStore = useRegionsStore()
const productTypesStore = useProductTypesStore()

// Reactive computed properties
const regions = computed(() => regionsStore.availableRegions)
const productTypes = computed(() => productTypesStore.availableTypes)
</script>

<template>
  <div>
    <!-- Dynamic navigation from regions -->
    <nav>
      <RouterLink v-for="region in regions" :key="region.id" :to="`/catalog/${region.slug}`">
        {{ region.name }}
      </RouterLink>
    </nav>

    <!-- Product types grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="type in productTypes" :key="type.id">
        <h3>{{ type.name }}</h3>
        <img :src="type.main_page_image" :alt="type.name" />
      </div>
    </div>
  </div>
</template>
```

### 4. Automatic Initialization

The stores are automatically initialized when the app starts. This happens in `src/main.ts`:

```typescript
// Initialize stores from window.__INITIAL_STATE__ after Pinia is set up
if (StoreInitializer.hasInitialState()) {
  StoreInitializer.initializeAllStores()
}
```

### 5. Complete Data Structure

The `window.__INITIAL_STATE__` object should contain these main sections:

```javascript
window.__INITIAL_STATE__ = {
  userAgent: 'desktop',
  contentFix: false,
  appConfig: {
    /* app configuration */
  },
  catalog: {
    /* catalog state */
  },
  productTypes: {
    /* product types and products */
  },
  regions: {
    /* regions and their data */
  },
  product: {
    /* individual product state */
  },
  subscribe: {
    /* subscription state */
  },
  museum: {
    /* museum gallery data */
  },
  album: {
    /* photo album data */
  },
  search: {
    /* search state */
  },
  staticPage: {
    /* static page content */
  },
  instagram: {
    /* instagram integration */
  },
  route: {
    /* router state */
  },
}
```

## Example Implementation

See the `AppHeader.vue` component for a real example of how the regions store is used to dynamically generate navigation links:

- Static hardcoded links were replaced with dynamic `v-for` loops
- The regions come from the `useRegionsStore()`
- Navigation is automatically updated when store data changes

## Benefits

1. **Performance**: No initial API calls needed for basic data
2. **SEO**: Data is available immediately for search engines
3. **User Experience**: Instant content display
4. **Flexibility**: Easy to switch between SSR and client-side data loading

## Troubleshooting

- Ensure `window.__INITIAL_STATE__` is defined before the Vue app initializes
- Check browser console for initialization messages
- Verify store data using Vue DevTools
- Use TypeScript interfaces to catch data structure issues early
