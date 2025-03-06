<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-neutral-950 to-black border-b border-white/[0.05]">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-xl font-light tracking-wide">
            <img src="/logo.png" alt="Cartografree Sénégal" class="h-12 md:h-12 w-auto">
          </NuxtLink>
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-sm text-neutral-400 hover:text-white transition-colors tracking-wide capitalize relative py-1" :class="{ 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white': $route.path === '/' }">accueil</NuxtLink>
            <NuxtLink to="/victimes" class="text-sm text-neutral-400 hover:text-white transition-colors tracking-wide capitalize relative py-1" :class="{ 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white': $route.path.startsWith('/victimes') }">victimes</NuxtLink>
            <NuxtLink to="/statistiques" class="text-sm text-neutral-400 hover:text-white transition-colors tracking-wide capitalize relative py-1" :class="{ 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white': $route.path.startsWith('/statistiques') }">statistiques</NuxtLink>
            <!-- <NuxtLink to="/carte" class="text-sm text-neutral-400 hover:text-white transition-colors tracking-wide capitalize relative py-1" :class="{ 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white': $route.path.startsWith('/carte') }">carte</NuxtLink> -->
            <!-- <NuxtLink to="/actualites" class="text-sm text-neutral-400 hover:text-white transition-colors tracking-wide capitalize relative py-1" :class="{ 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white': $route.path.startsWith('/actualites') }">actualités</NuxtLink> -->
            <!-- <NuxtLink to="/manifestations" class="text-sm text-neutral-400 hover:text-white transition-colors tracking-wide capitalize relative py-1" :class="{ 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white': $route.path.startsWith('/manifestations') }">manifestations</NuxtLink> -->
            <NuxtLink to="/a-propos" class="text-sm text-neutral-400 hover:text-white transition-colors tracking-wide relative py-1" :class="{ 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white': $route.path === '/a-propos' }">À propos</NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Contenu principal -->
    <main class="container mx-auto max-w-5xl px-4 pt-20 pb-2 md:pb-0">
      <slot />
    </main>

    <!-- Navigation mobile -->
    <nav class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950 to-black border-t border-white/[0.05] md:hidden z-50">
      <div class="grid grid-cols-4 gap-1 px-2 py-2">
        <NuxtLink to="/" class="flex flex-col items-center justify-center p-2 text-neutral-400 hover:text-white transition-colors" :class="{ 'text-white': $route.path === '/' }">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs">Accueil</span>
        </NuxtLink>
        
        <NuxtLink to="/victimes" class="flex flex-col items-center justify-center p-2 text-neutral-400 hover:text-white transition-colors" :class="{ 'text-white': $route.path.startsWith('/victimes') }">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="text-xs">Victimes</span>
        </NuxtLink>

        <NuxtLink to="/statistiques" class="flex flex-col items-center justify-center p-2 text-neutral-400 hover:text-white transition-colors" :class="{ 'text-white': $route.path.startsWith('/statistiques') }">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="text-xs">Statistiques</span>
        </NuxtLink>
        
        <NuxtLink to="/a-propos" class="flex flex-col items-center justify-center p-2 text-neutral-400 hover:text-white transition-colors" :class="{ 'text-white': $route.path === '/a-propos' }">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs">À propos</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Footer -->
    <footer class="max-w-5xl mx-auto p-4 bg-gradient-to-b from-black to-neutral-950 border-t border-white/[0.05] mt-6">
      <div class="container mx-auto px-4 py-6">
        <div class="text-center">
          <h3 class="text-sm font-medium text-white uppercase tracking-wider mb-6">Suivez-nous</h3>
          <div class="flex justify-center space-x-8 pb-4">
            <a href="https://www.facebook.com/CartoFreeSn" target="_blank" class="text-neutral-400 hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://x.com/CartoFreeSn" target="_blank" class="text-neutral-400 hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://www.instagram.com/cartofreesn/" target="_blank" class="text-neutral-400 hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@cartofreesn" target="_blank" class="text-neutral-400 hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
          </div>
        </div>
        <div class="mt-2 pt-2 border-t border-white/[0.05] text-center credit">
          <p class="text-sm text-neutral-500">&copy; {{ new Date().getFullYear() }} CartograFreeSenegal. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead'

// Ajouter un schéma JSON-LD pour améliorer le référencement
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CartograFreeSenegal',
        url: 'https://cartografree.sn',
        logo: 'https://cartografree.sn/logo.png',
        description: 'Mémorial digital des victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024.',
        sameAs: [
          'https://twitter.com/cartografreesn'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'freesenegalcarto@gmail.com',
          contactType: 'customer service'
        }
      })
    }
  ]
})
</script>

<style>
.leaflet-container {
  height: 100%;
  width: 100%;
  z-index: 0;
}

.custom-popup .leaflet-popup-content-wrapper {
  background: rgb(23 23 23);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
}

.custom-popup .leaflet-popup-content {
  margin: 0.5rem;
}

.custom-popup .leaflet-popup-tip {
  background: rgb(23 23 23);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.credit {
  border-top: 2px solid #fff;
  border-image: linear-gradient(45deg, green 33%, #ff0 67%, red) 5;
  padding-top: 1rem;
}
</style> 