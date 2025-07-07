# Arms & Antiques - Vue 3 Application

A modern Vue 3 application for the Arms and Antiques e-commerce platform, migrated from Vue 2 to provide enhanced performance, better TypeScript support, and modern development experience.

## 🚀 Features

### Core Functionality

- **Product Catalog**: Browse rare and collectible firearms, antiques, and military items
- **Advanced Search & Filtering**: Find items by category, region, type, and price range
- **Product Detail Pages**: Detailed product information with image galleries
- **Museums Section**: Explore museums of the world with historical collections
- **Contact Forms**: Multiple contact forms for different purposes (contact, sell-to-us, price requests)
- **File Upload**: Support for file attachments in contact forms
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Technical Features

- **Vue 3 Composition API**: Modern reactive programming with improved performance
- **TypeScript**: Full type safety throughout the application
- **Pinia State Management**: Modern alternative to Vuex for state management
- **Vue Router 4**: Latest routing with improved navigation guards
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Vite Build Tool**: Fast development server and optimized builds
- **ESLint & Prettier**: Code quality and consistent formatting
- **Vitest**: Modern testing framework
- **Playwright**: E2E testing setup

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # Reusable components
│   ├── common/          # Common UI components
│   └── layout/          # Layout components (Header, Footer)
├── stores/              # Pinia stores
│   ├── products.ts      # Product state management
│   ├── categories.ts    # Category management
│   ├── museums.ts       # Museum data
│   └── ui.ts           # UI state (modals, loading, etc.)
├── services/            # API and external services
│   └── api.ts          # Axios-based API client
├── types/               # TypeScript type definitions
│   └── index.ts        # All interface definitions
├── views/               # Page components
├── router/              # Vue Router configuration
└── assets/              # Static assets
```

### State Management (Pinia)

- **Products Store**: Manages product data, filtering, pagination
- **Categories Store**: Handles product categories
- **Museums Store**: Museum data and pagination
- **UI Store**: Global UI state (modals, loading, notifications)

### API Integration

- RESTful API client with Axios
- Request/response interceptors for authentication
- Centralized error handling
- Type-safe API responses

## 🎨 Design System

### Color Palette

- **Primary**: Amber (#F59E0B) - For primary actions and branding
- **Secondary**: Gray (#6B7280) - For secondary elements
- **Background**: Gray-50 (#F9FAFB) - Light background
- **Text**: Gray-900 (#111827) - Primary text

### Components

- Responsive navigation with mobile menu
- Product cards with hover effects
- Loading states and skeletons
- Modal overlays for search
- Form components with validation
- Pagination and infinite scroll

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Testing

```bash
npm run test:unit          # Unit tests with Vitest
npm run test:e2e           # E2E tests with Playwright
```

### Code Quality

```bash
npm run lint               # ESLint + Prettier
npm run format             # Format code
```

## 📱 Pages & Routes

### Public Pages

- `/` - Homepage with hero, featured products, categories
- `/catalog` - Product catalog with filtering
- `/catalog/:category` - Category-specific products
- `/product/:slug` - Individual product details
- `/museums` - Museums listing with pagination
- `/museum/:slug` - Individual museum details
- `/search` - Search results page

### Forms & Contact

- `/contact` - General contact form
- `/sell-to-us` - Sell items to the company
- `/request-info/:productId?` - Request more product information
- `/price-request/:productId?` - Request price information
- `/wire-transfer` - Wire transfer instructions

### Utility Pages

- `/about` - About the company
- `/404` - Page not found

## 🌐 API Integration

### Environment Variables

```env
VITE_API_BASE_URL=https://api.armsandantiques.com
VITE_APP_NAME=Arms and Antiques
VITE_APP_ENV=development
```

### API Endpoints

- `GET /products` - Product listings with filtering
- `GET /products/:slug` - Product details
- `GET /categories` - Product categories
- `GET /museums` - Museums listing
- `POST /feedback/*` - Contact form submissions
- `POST /feedback/upload-file` - File uploads

## 🚀 Deployment

### Build Process

1. Run type checking: `npm run type-check`
2. Build production bundle: `npm run build`
3. Preview build: `npm run preview`

### Hosting Requirements

- Static hosting (Netlify, Vercel, S3 + CloudFront)
- Node.js 18+ for SSR (optional)
- Environment variables configuration

## 📈 Performance Optimizations

- **Code Splitting**: Lazy-loaded routes and components
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Analysis**: Optimized vendor chunks
- **Caching**: Service worker for offline support
- **Tree Shaking**: Unused code elimination

## 🔄 Migration from Vue 2

### Key Changes

- **Composition API**: Migrated from Options API
- **Pinia**: Replaced Vuex for state management
- **Vue Router 4**: Updated routing with new features
- **TypeScript**: Added full type safety
- **Vite**: Replaced Webpack for faster development

### Compatibility

- All Vue 2 functionality preserved
- Improved performance and bundle size
- Better TypeScript integration
- Modern development tooling

## 📝 License

This project is proprietary and confidential.

## 🤝 Contributing

Please follow the established coding standards:

- Use TypeScript for all new code
- Follow the Composition API pattern
- Write tests for new features
- Maintain responsive design principles
