<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-black to-neutral-950 space-y-4 py-2 md:p-4 md:mx-auto">
    <p class="text-normal text-neutral-500 max-w-2xl">
      Décès issus de la répression des manifestations politiques au Sénégal (mars 2021-février 2024)
      </p>
    <!-- En-tête avec statistiques -->
    <div class="bg-gradient-to-br from-gray-900 to-neutral-950 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
      
      <div class="grid grid-cols-3 gap-6 md:gap-6">
        <div class="text-center">
          <h3 class="text-sm font-medium text-neutral-500 mb-1">Nombre de victimes</h3>
          <div v-if="store.loading" class="animate-pulse">
            <div class="h-12 bg-white/5 rounded-lg w-20"></div>
          </div>
          <p v-else class="text-4xl font-bold text-white">{{ store.totalVictimes }}</p>
        </div>
        
        <div class="text-center">
          <h3 class="text-sm font-medium text-neutral-500 mb-1">Morts par balle</h3>
          <div v-if="store.loading" class="animate-pulse">
            <div class="h-12 bg-white/5 rounded-lg w-16"></div>
          </div>
          <p v-else class="text-4xl font-bold text-white">{{ store.victimesParBalle }}</p>
        </div>
        
        <div class="text-center">
          <h3 class="text-sm font-medium text-neutral-500 mb-1">Moyenne d'âge</h3>
          <div v-if="store.loading" class="animate-pulse flex items-baseline gap-2">
            <div class="h-12 bg-white/5 rounded-lg w-12"></div>
            <div class="h-6 bg-white/5 rounded-lg w-8 mt-1"></div>
          </div>
          <p v-else class="text-4xl font-bold text-white">{{ store.moyenneAge }}</p>
        </div>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-gradient-to-br from-gray-900 to-neutral-950 p-2 md:p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <select v-model="store.filters.region" 
                :disabled="store.loading"
                class="w-full bg-black/50 text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-white/10 border border-white/[0.05] text-sm disabled:opacity-50">
          <option value="">toutes les régions</option>
          <option v-for="region in store.regionsUniques" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
        <select v-model="store.filters.annee" 
                :disabled="store.loading"
                class="w-full bg-black/50 text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-white/10 border border-white/[0.05] text-sm disabled:opacity-50">
          <option value="">toutes les années</option>
          <option v-for="annee in store.anneesUniques" :key="annee" :value="annee">
            {{ annee }}
          </option>
        </select>
        <input type="text" 
               v-model="store.filters.recherche" 
               :disabled="store.loading"
               placeholder="rechercher par nom..."
               class="w-full bg-black/50 text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-white/10 border border-white/[0.05] text-sm placeholder:text-neutral-600 disabled:opacity-50">
      </div>
      
      <!-- Filtre par période de manifestation -->
      <div class="mt-3">
        <div class="flex flex-wrap gap-2">
          <button 
            @click="store.setFilter('periode', '')"
            :class="[
              'px-3 py-2 text-xs rounded-lg transition-all duration-200 border',
              !store.filters.periode 
                ? 'bg-white/10 text-white border-blue-500' 
                : 'bg-black/50 text-neutral-400 border-white/[0.05] hover:text-white hover:bg-white/5'
            ]"
          >
            Toutes
          </button>
          <button 
            @click="store.setFilter('periode', 'mars 2021')"
            :class="[
              'px-3 py-2 text-xs rounded-lg transition-all duration-200 border',
              store.filters.periode === 'mars 2021' 
                ? 'bg-white/10 text-white border-red-500' 
                : 'bg-black/50 text-neutral-400 border-white/[0.05] hover:text-white hover:bg-white/5'
            ]"
          >
            mars 2021
          </button>
          <button 
            @click="store.setFilter('periode', 'juin 2022')"
            :class="[
              'px-3 py-2 text-xs rounded-lg transition-all duration-200 border',
              store.filters.periode === 'juin 2022' 
                ? 'bg-white/10 text-white border-blue-500' 
                : 'bg-black/50 text-neutral-400 border-white/[0.05] hover:text-white hover:bg-white/5'
            ]"
          >
            juin 2022
          </button>
          <button 
            @click="store.setFilter('periode', 'mars-mai 2023')"
            :class="[
              'px-3 py-2 text-xs rounded-lg transition-all duration-200 border',
              store.filters.periode === 'mars-mai 2023' 
                ? 'bg-white/10 text-white border-green-500' 
                : 'bg-black/50 text-neutral-400 border-white/[0.05] hover:text-white hover:bg-white/5'
            ]"
          >
            mars-mai 2023
          </button>
          <button 
            @click="store.setFilter('periode', 'juin-août 2023')"
            :class="[
              'px-3 py-2 text-xs rounded-lg transition-all duration-200 border',
              store.filters.periode === 'juin-août 2023' 
                ? 'bg-white/10 text-white border-yellow-500' 
                : 'bg-black/50 text-neutral-400 border-white/[0.05] hover:text-white hover:bg-white/5'
            ]"
          >
            juin-août 2023
          </button>
          <button 
            @click="store.setFilter('periode', 'février 2024')"
            :class="[
              'px-3 py-2 text-xs rounded-lg transition-all duration-200 border',
              store.filters.periode === 'février 2024' 
                ? 'bg-white/10 text-white border-purple-500' 
                : 'bg-black/50 text-neutral-400 border-white/[0.05] hover:text-white hover:bg-white/5'
            ]"
          >
            février 2024
          </button>
        </div>
      </div>
    </div>

    <!-- Options de vue -->
    <div class="flex justify-between items-center">
      <h2 class="mb:text-3xl font-bold text-white tracking-wide">Liste des victimes</h2>
      <div class="flex space-x-1 bg-black/30 backdrop-blur-xl rounded-xl p-1 border border-white/[0.05]">
        <button @click="vueMode = 'grid'" 
                :disabled="store.loading"
                :class="['p-2 rounded-lg transition-all duration-200', vueMode === 'grid' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white']">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button @click="vueMode = 'list'" 
                :disabled="store.loading"
                :class="['p-2 rounded-lg transition-all duration-200', vueMode === 'list' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white']">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Liste des victimes -->
    <div v-if="store.loading">
      <!-- Skeleton pour la vue grille -->
      <div v-if="vueMode === 'grid'" 
           class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        <div v-for="i in 8" :key="i"
             class="relative aspect-[3/4] bg-gradient-to-br from-neutral-950 to-black rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
          <div class="absolute inset-0 bg-white/5 animate-pulse"></div>
          <div class="absolute inset-x-0 bottom-0 z-20 p-4 md:p-6 space-y-2">
            <div class="h-6 bg-white/5 animate-pulse rounded-lg w-3/4"></div>
            <div class="h-4 bg-white/5 animate-pulse rounded-lg w-1/2"></div>
            <div class="h-4 bg-white/5 animate-pulse rounded-lg w-1/3"></div>
          </div>
        </div>
      </div>

      <!-- Skeleton pour la vue liste -->
      <div v-else class="space-y-3">
        <div v-for="i in 5" :key="i"
             class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-white/5 animate-pulse rounded-xl"></div>
            <div class="flex-grow space-y-2">
              <div class="h-5 bg-white/5 animate-pulse rounded-lg w-1/3"></div>
              <div class="h-4 bg-white/5 animate-pulse rounded-lg w-1/4"></div>
              <div class="h-4 bg-white/5 animate-pulse rounded-lg w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="store.error" class="text-center py-12 text-red-400">
      {{ store.error }}
    </div>
    <div v-else>
      <!-- Vue grille -->
      <div v-if="vueMode === 'grid'" 
           class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <div v-for="victime in store.victimesFiltrees" :key="victime.id"
             :class="`group relative aspect-[3/4] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl`">
          <!-- Bordure colorée stylisée -->
          <div :class="`absolute inset-0 rounded-2xl ${getCardColorClass(victime.date_mort)}`"></div>
          
          <!-- Contenu de la carte avec un padding pour laisser voir la bordure -->
          <div class="absolute inset-[3px] bg-gradient-to-br from-neutral-950 to-black rounded-xl overflow-hidden">
            <!-- Image de fond -->
            <NuxtLink 
              :to="`/victimes/${slugify(victime.prenom_nom)}`"
              class="absolute inset-0">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
              <div class="absolute inset-0">
                <div class="w-full h-full">
                  <img :src="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/anonyme.png'" 
                       :alt="victime.prenom_nom"
                       class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                </div>
              </div>
              <!-- Contenu superposé -->
              <div class="absolute inset-x-0 bottom-0 z-20 p-3 md:p-4">
                <h3 class="text-normal md:text-xl font-bold text-white tracking-tight mb-1">{{ victime.prenom_nom }}</h3>
                <p class="text-neutral-400 text-xs font-normal mb-1">{{ capitalizeFirstLetter(victime.region.toLowerCase()) }}{{ victime.age ? ` • ${victime.age} ans` : '' }}</p>
                <p class="text-neutral-400 text-xs font-normal">{{ formatDate(victime.date_mort) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Vue liste -->
      <div v-else class="space-y-4">
        <div v-for="victime in store.victimesFiltrees" :key="victime.id"
             class="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
          <!-- Bordure colorée stylisée -->
          <div :class="`absolute inset-0 rounded-2xl ${getCardColorClass(victime.date_mort)}`"></div>
          
          <!-- Contenu avec padding pour laisser voir la bordure -->
          <div class="absolute inset-[3px] bg-gradient-to-br from-neutral-950 to-black rounded-xl p-4">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-black rounded-xl overflow-hidden flex-shrink-0">
                <img :src="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/unknown_member.webp'" 
                     :alt="victime.prenom_nom"
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
              </div>
              <div class="flex-grow">
                <h3 class="text-lg font-light text-white tracking-tight mb-1">{{ victime.prenom_nom }}</h3>
                <p class="text-neutral-400 text-xs font-normal mb-1">{{ capitalizeFirstLetter(victime.region.toLowerCase()) }}{{ victime.age ? ` • ${victime.age} ans` : '' }}{{ victime.commune ? ` • ${victime.commune}` : '' }}</p>
                <p class="text-neutral-400 text-xs font-normal">{{ formatDate(victime.date_mort) }}</p>
              </div>
              <NuxtLink 
                :to="`/victimes/${slugify(victime.prenom_nom)}`"
                class="flex items-center text-neutral-500 hover:text-white transition-colors">
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVictimesStore } from '~/stores/victimes'
import { computed, ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { useHead } from 'unhead'

const config = useRuntimeConfig()
const store = useVictimesStore()
const vueMode = ref('grid')

// Méta-tags SEO spécifiques à la page de liste des victimes
useHead({
  title: 'Liste des victimes - CartograFreeSenegal',
  meta: [
    { name: 'description', content: 'Liste complète des victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024. Découvrez leurs profils et leurs histoires.' },
    { name: 'keywords', content: 'victimes, Sénégal, manifestations, répression, liste, profils, mémorial' },
    
    // Open Graph / Facebook
    { property: 'og:title', content: 'Liste des victimes - CartograFreeSenegal' },
    { property: 'og:description', content: 'Liste complète des victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024.' },
    { property: 'og:url', content: 'https://cartografree.sn/victimes' },
    { property: 'og:type', content: 'website' },
    
    // Twitter
    { name: 'twitter:title', content: 'Liste des victimes - CartograFreeSenegal' },
    { name: 'twitter:description', content: 'Liste complète des victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://cartografree.sn/victimes' }
  ]
})

// Fonction pour formater la date en français
const formatDate = (date: string) => {
  return dayjs(date).locale('fr').format('D MMMM YYYY')
}

// Fonction pour créer un slug à partir d'un nom
const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

// Fonction pour mettre en majuscule la première lettre
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Fonction pour déterminer la couleur de la bordure selon l'année
const getBorderColorClass = (date: string) => {
  const year = new Date(date).getFullYear()
  switch (year) {
    case 2021:
      return 'border-amber-500 border-opacity-90'
    case 2022:
      return 'border-emerald-500 border-opacity-90'
    case 2023:
      return 'border-sky-500 border-opacity-90'
    case 2024:
      return 'border-purple-500 border-opacity-90'
    default:
      return 'border-white/5'
  }
}

// Fonction pour déterminer la couleur de fond de la carte selon la période
const getCardColorClass = (date: string) => {
  if (!date) return 'bg-gradient-to-br from-gray-600 to-gray-800';
  
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  
  // Couleurs harmonisées avec les filtres de période
  if (year === 2021 && month === 2) { // Mars 2021
    return 'bg-gradient-to-br from-red-700 to-red-900';
  } else if (year === 2022 && month === 5) { // Juin 2022
    return 'bg-gradient-to-br from-blue-600 to-blue-800';
  } else if (year === 2023 && month >= 2 && month <= 4) { // Mars-Mai 2023
    return 'bg-gradient-to-br from-green-600 to-green-800';
  } else if (year === 2023 && month >= 5 && month <= 7) { // Juin-Août 2023
    return 'bg-gradient-to-br from-yellow-500 to-yellow-700';
  } else if (year === 2024 && month === 1) { // Février 2024
    return 'bg-gradient-to-br from-purple-600 to-purple-800';
  } else {
    return 'bg-gradient-to-br from-gray-600 to-gray-800';
  }
}

// Récupérer les victimes au chargement de la page
onMounted(async () => {
  await store.fetchVictimes()
  
  // Générer un sitemap dynamique pour les pages de victimes
  if (process.client && store.victimes.length > 0) {
    const baseUrl = window.location.origin
    const today = new Date().toISOString().split('T')[0]
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    // Ajouter les URLs des pages principales
    sitemap += `  <url>\n    <loc>${baseUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>\n`
    sitemap += `  <url>\n    <loc>${baseUrl}/victimes</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`
    sitemap += `  <url>\n    <loc>${baseUrl}/statistiques</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`
    sitemap += `  <url>\n    <loc>${baseUrl}/carte</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`
    sitemap += `  <url>\n    <loc>${baseUrl}/a-propos</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`
    
    // Ajouter les URLs des pages de victimes
    store.victimes.forEach(victime => {
      const slug = slugify(victime.prenom_nom)
      sitemap += `  <url>\n    <loc>${baseUrl}/victimes/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`
    })
    
    sitemap += '</urlset>'
    
    // Créer un blob et un lien de téléchargement
    const blob = new Blob([sitemap], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    
    // Enregistrer le sitemap dans le localStorage pour référence
    localStorage.setItem('cartografreesn_sitemap', sitemap)
    console.log('Sitemap généré et disponible dans localStorage.cartografreesn_sitemap')
  }
})
</script> 