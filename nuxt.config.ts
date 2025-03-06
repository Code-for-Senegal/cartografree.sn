// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    'nuxt-gtag'
  ],

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    config: {
      page_title: 'CartograFreeSenegal',
      anonymize_ip: true,
      cookie_domain: 'cartografree.sn',
      cookie_expires: 28 * 24 * 60 * 60, // 28 jours en secondes
      send_page_view: true
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },

  seo: {
    // Module options
    sitemap: true,
    robots: true,
    ogImage: true
  },

  site: {
    url: 'https://cartografree.sn',
    name: 'CartograFreeSenegal',
    description: 'Mémorial des victimes des manifestations au Sénégal',
    defaultLocale: 'fr',
    identity: {
      type: 'Organization'
    },
    twitter: '@cartografreesn'
  },

  app: {
    head: {
      title: 'CartograFreeSenegal',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Mémorial des victimes des manifestations au Sénégal' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://cartografree.sn' },
        { property: 'og:title', content: 'CartograFreeSenegal' },
        { property: 'og:description', content: 'Mémorial des victimes des manifestations au Sénégal' },
        { property: 'og:image', content: 'https://cartografree.sn/images/partage.jpeg' },
        { property: 'og:image:alt', content: 'Logo CartograFreeSenegal' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@cartografreesn' },
        { name: 'twitter:title', content: 'CartograFreeSenegal' },
        { name: 'twitter:description', content: 'Mémorial des victimes des manifestations au Sénégal' },
        { name: 'twitter:image', content: 'https://cartografree.sn/images/partage.jpeg' },
        { name: 'twitter:image:alt', content: 'Logo CartograFreeSenegal' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.DIRECTUS_URL,
      apiToken: process.env.DIRECTUS_TOKEN,
      siteUrl: 'https://cartografree.sn',
      siteName: 'CartograFreeSenegal',
      siteDescription: 'Mémorial des victimes des manifestations au Sénégal',
      language: 'fr',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  compatibilityDate: '2025-03-03'
})