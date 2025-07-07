// This is an example of the complete window.__INITIAL_STATE__ object
// Copy this content and paste it into the <script> tag in index.html

window.__INITIAL_STATE__ = {
  userAgent: 'desktop',
  contentFix: false,
  appConfig: {
    gallery_enabled: true,
    gallery_section_name: 'Museum of the World',
    paypal_api_mode: 'live',
  },
  catalog: {
    sellType: false,
    catalogPreviews: [],
    catalogPreviewsReady: false,
    limit: 15,
    totalLength: false,
    activePagination: false,
    notFoundStatus: 'wait',
    filter: {
      region: false,
      type: false,
    },
  },
  productTypes: {
    types: {
      all: [],
      for_sale: [
        {
          id: 8,
          slug: 'swords',
          name: 'Swords',
          display_on_main_page: 'with_products',
          main_page_image:
            'https://api.armsandantiques.com/media/product-types/dtya3r2iEe-ZQ_I8kY_GHg.png',
          seo_title: 'Antique Indian, Persian, and Islamic swords for sale.',
          seo_keywords: 'Sword Shamshir Tulwar Saber',
          seo_description: 'European sword designs evolved over centuries...',
          h1_for_sale: 'We sell antique swords, sabers, shamshirs, and tulwars.',
          h1_sold: 'Antique swords and sabers from around the world.',
        },
        {
          id: 3,
          slug: 'daggers',
          name: 'Daggers',
          display_on_main_page: 'with_products',
          main_page_image:
            'https://api.armsandantiques.com/media/product-types/JYh5Yr8bEe-ZQ_I8kY_GHg.png',
          seo_title: 'Antique Indian, Persian, and Islamic daggers for sale.',
          seo_keywords: 'Jambiya Kris Dirk Poniard Rondel dagger',
          seo_description: 'The Importance of Daggers in Antique Arms and Armor...',
          h1_for_sale: 'For sale antique daggers from China, Middle East, Europe, Japan',
          h1_sold: 'Sold antique daggers from China, Middle East, Europe, Japan',
        },
        // ... add more product types here
      ],
      sold: [],
    },
    status: {
      all: false,
      for_sale: true,
      sold: false,
    },
    withProducts: {
      for_sale: [
        // ... product types with products
      ],
    },
    withProductsStatus: {
      for_sale: true,
    },
  },
  regions: {
    regions: {
      all: [],
      for_sale: [
        {
          id: 4,
          slug: 'india',
          name: 'India',
          main_page_image:
            'https://api.armsandantiques.com/media/regions/eR7IdL8bEe-ZQ_I8kY_GHg.png',
          seo_title: 'Antique swords, daggers and armor from India',
          seo_keywords: 'Antique swords, daggers and armor from India',
          seo_description: 'Swords Tulwar...',
          h1_for_sale:
            'Antique tulwars, khanjars, katars, shamshirs, and sabers from the Mughal Empire and India',
          h1_sold: 'Sold antique swords, daggers and armor from India',
        },
        {
          id: 2,
          slug: 'china-east-asia-tibet',
          name: 'China, East Asia, Tibet',
          main_page_image:
            'https://api.armsandantiques.com/media/regions/YabBtiV9EeqPXfI8kY_GHg.png',
          seo_title: 'For sale antique swords, daggers and armor from China, East Asia',
          seo_keywords: 'For sale antique swords, daggers and armor from China, East Asia',
          seo_description: 'List of Chinese Sword Types...',
          h1_for_sale:
            'For sale antique Chinese and East Asian swords, incuding jian, dao, dhas, and other sabers, daggers, and armor.',
          h1_sold: 'Sold antique swords, daggers and armor from China, East Asia',
        },
        // ... add more regions here
      ],
      sold: [],
    },
    status: {
      all: false,
      for_sale: true,
      sold: false,
    },
    withProducts: {
      for_sale: [
        // ... regions with products
      ],
    },
    withProductsStatus: {
      for_sale: true,
    },
    activeHeaderSlug: false,
  },
  product: {
    product: false,
    productStatus: false,
  },
  subscribe: {
    statusSubscribe: '',
  },
  museum: {
    museumLoadingStatus: 'COMPLETE',
    totalMuseumItems: 5,
    museumItems: [
      // ... museum items
    ],
    limitItems: 15,
  },
  album: {
    albumLoadingStatus: 'COMPLETE',
    totalPhotosInAlbums: 56,
    album: {
      // ... album data
    },
    simulateAlbum: [],
    limitPhotos: 10,
  },
  search: {
    cards: [],
    cardsLoaded: false,
    searchQuery: false,
    sellType: false,
    offset: 0,
    limit: 15,
    totalLength: false,
    from: 'header',
    activePagination: 0,
  },
  staticPage: {
    slug: 'guarantee',
    info: {
      title: '100% Guarantee',
      slug: 'guarantee',
      bg_image: 'https://api.armsandantiques.com/media/pages/6ZJBiN_GEemPXfI8kY_GHg.png',
      content: 'We provide a 100% guarantee...',
    },
  },
  instagram: {
    media: [],
  },
  route: {
    name: 'home',
    path: '/',
    hash: '',
    query: {},
    params: {},
    fullPath: '/',
    meta: {},
    from: {
      name: null,
      path: '/',
      hash: '',
      query: {},
      params: {},
      fullPath: '/',
      meta: {},
    },
  },
}
