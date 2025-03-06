<template>
  <div class="space-y-6 px-4 md:px-8 mx-auto">
    <div class="max-w-6xl mx-auto">
          <!-- Carte des victimes -->
    <section class="bg-gradient-to-br from-neutral-950 to-black/80 p-2 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
      <h2 class="text-xl font-medium text-white mb-4">Carte des victimes</h2>
      <div class="relative h-[500px] rounded-xl overflow-hidden">
        <client-only>
          <l-map
            v-if="victimesGeoreferencees.length > 0"
            :zoom="6.5"
            :center="[14.7167, -17.3677]"
            :use-global-leaflet="false"
            class="h-full w-full z-0">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <l-marker
              v-for="victime in victimesGeoreferencees"
              :key="victime.id"
              :lat-lng="[victime.localisation.coordinates[1], victime.localisation.coordinates[0]]">
              <l-popup :options="{ maxWidth: 300, className: 'custom-popup' }">
                <div class="w-full cursor-pointer" @click="navigateToVictime(victime)">
                  <div class="relative aspect-[3/2]">
                    <img 
                      :src="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/unknown_member.webp'" 
                      :alt="victime.prenom_nom"
                      class="w-full h-full object-cover rounded-lg">
                  </div>
                  <div class="mt-3 space-y-1">
                    <h3 class="text-white font-bold text-base">{{ victime.prenom_nom }}</h3>
                    <p class="text-neutral-300 text-sm">{{ capitalizeFirstLetter(victime.region.toLowerCase()) }}{{ victime.age ? ` • ${victime.age} ans` : '' }}</p>
                    <p class="text-neutral-400 text-sm">{{ formatDate(victime.date_mort) }}</p>
                  </div>
                </div>
              </l-popup>
            </l-marker>
          </l-map>
        </client-only>
      </div>
    </section>
  
        <!-- Bouton retour -->
        <div class="mt-6">
          <NuxtLink to="/" 
                    class="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors group">
            <svg class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Retour à l'accueil</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useVictimesStore } from '~/stores/victimes'
  import dayjs from 'dayjs'
  import 'dayjs/locale/fr'
  import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
  import 'leaflet/dist/leaflet.css'
  import { computed, onMounted } from 'vue'
  import { useHead } from 'unhead'
  
  interface Point {
    type: 'Point'
    coordinates: [number, number]
  }
  
  interface Victime {
    id: number
    prenom_nom: string
    age?: number
    profession?: string
    date_mort: string
    region: string
    commune?: string
    cause_mort?: string
    presentation?: string
    photo_principale?: string
    localisation?: Point
  }
  
  const config = useRuntimeConfig()
  const store = useVictimesStore()
  
  // Méta-tags SEO spécifiques à la page de carte
  useHead({
    title: 'Carte des victimes - CartograFreeSenegal',
    meta: [
      { name: 'description', content: 'Carte interactive des victimes de la répression des manifestations politiques au Sénégal. Visualisez la répartition géographique des victimes à travers le pays.' },
      { name: 'keywords', content: 'carte, victimes, Sénégal, manifestations, répression, géolocalisation, répartition géographique' },
      
      // Open Graph / Facebook
      { property: 'og:title', content: 'Carte des victimes - CartograFreeSenegal' },
      { property: 'og:description', content: 'Carte interactive des victimes de la répression des manifestations politiques au Sénégal.' },
      { property: 'og:url', content: 'https://cartografree.sn/carte' },
      { property: 'og:type', content: 'website' },
      
      // Twitter
      { name: 'twitter:title', content: 'Carte des victimes - CartograFreeSenegal' },
      { name: 'twitter:description', content: 'Carte interactive des victimes de la répression des manifestations politiques au Sénégal.' }
    ],
    link: [
      { rel: 'canonical', href: 'https://cartografree.sn/carte' }
    ]
  })
  
  // Fonction pour formater la date en français
  const formatDate = (date: string) => {
    return dayjs(date).locale('fr').format('D MMMM YYYY')
  }
  
  // Fonction pour mettre en majuscule la première lettre
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  // Filtrer les victimes qui ont des coordonnées
  const victimesGeoreferencees = computed<Victime[]>(() => {
    return store.victimes.filter(victime => 
      victime.localisation && 
      victime.localisation.coordinates && 
      Array.isArray(victime.localisation.coordinates) && 
      victime.localisation.coordinates.length === 2
    )
  })
  
  // Fonction pour naviguer vers la page de détail d'une victime
  const navigateToVictime = (victime: Victime) => {
    navigateTo(`/victimes/${slugify(victime.prenom_nom)}`)
  }
  
  // Fonction pour créer un slug à partir d'un nom
  function slugify(text: string): string {
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
  
  // Charger les données au montage du composant
  onMounted(async () => {
    if (store.victimes.length === 0) {
      await store.fetchVictimes()
    }
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
  </style>