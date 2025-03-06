<template>
  <div v-if="store.loading" class="text-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
  </div>
  <div v-else-if="store.error" class="text-center py-12 text-red-500">
    {{ store.error }}
  </div>
  <div v-else-if="victime" class="min-h-screen bg-gradient-to-b from-black via-black to-neutral-950 p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Bouton retour -->
      <div>
        <NuxtLink to="/victimes" 
                  class="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour</span>
        </NuxtLink>
      </div>

      <!-- Photo et informations principales -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Photo avec nom superposé -->
        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden group">
          <img :src="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/unknown_member.webp'" 
               :alt="victime.prenom_nom"
               class="w-full h-full object-contain bg-neutral-900">
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h1 class="text-3xl font-semibold text-white tracking-wide font-sans text-center">{{ victime.prenom_nom }}</h1>
          </div>
        </div>

        <!-- Informations -->
        <div class="space-y-8">
          <!-- Informations principales -->
          <div class="space-y-6">
            <div v-if="victime.age" class="flex items-center text-neutral-300">
              <span class="text-xs text-neutral-500 uppercase tracking-wider w-32 font-medium">Âge</span>
              <span class="text-sm font-light">{{ victime.age }} ans</span>
            </div>
            
            <div v-if="victime.profession" class="flex items-center text-neutral-300">
              <span class="text-xs text-neutral-500 uppercase tracking-wider w-32 font-medium">Profession</span>
              <span class="text-sm font-light">{{ victime.profession }}</span>
            </div>
            
            <div class="flex items-center text-neutral-300">
              <span class="text-xs text-neutral-500 uppercase tracking-wider w-32 font-medium">Date</span>
              <span class="text-sm font-light">{{ formatDate(victime.date_mort) }}</span>
            </div>
            
            <div class="flex items-center text-neutral-300">
              <span class="text-xs text-neutral-500 uppercase tracking-wider w-32 font-medium">Lieu</span>
              <span class="text-sm font-light">{{ victime.region }}{{ victime.commune ? `, ${victime.commune}` : '' }}</span>
            </div>
            
            <div v-if="victime.cause_mort" class="flex items-center text-neutral-300">
              <span class="text-xs text-neutral-500 uppercase tracking-wider w-32 font-medium">Cause</span>
              <span class="text-sm font-light">{{ victime.cause_mort }}</span>
            </div>
          </div>

          <!-- Présentation -->
          <div v-if="victime.presentation" class="prose prose-invert max-w-none prose-sm font-light">
            <div v-html="victime.presentation"></div>
          </div>

          <!-- Carte -->
          <div v-if="victime.localisation" class="relative h-64 rounded-xl overflow-hidden">
            <client-only>
              <l-map ref="map" 
                     v-if="coordinates" 
                     :zoom="13" 
                     :center="[coordinates.lat, coordinates.lng]"
                     :use-global-leaflet="false"
                     class="h-full w-full z-0">
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <l-marker :lat-lng="[coordinates.lat, coordinates.lng]" />
              </l-map>
            </client-only>
          </div>

          <!-- Séparateur -->
          <div class="border-t border-neutral-800 my-6"></div>

          <!-- Boutons de partage -->
          <div class="flex space-x-6">
            <button @click="partager('facebook')" 
                    class="text-neutral-400 hover:text-blue-500 transition-colors flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="text-sm font-medium">Facebook</span>
            </button>
            <button @click="partager('twitter')" 
                    class="text-neutral-400 hover:text-blue-400 transition-colors flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span class="text-sm font-medium">Twitter</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bouton retour -->
      <div>
        <NuxtLink to="/victimes" 
                  class="inline-flex items-center text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider group">
          <svg class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour à la liste</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVictimesStore } from '~/stores/victimes'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

const config = useRuntimeConfig()
const store = useVictimesStore()
const route = useRoute()

// Récupérer la victime
const victime = computed(() => {
  return store.victimes.find(v => v.id === parseInt(route.params.id as string))
})

// Calculer les coordonnées de manière réactive
const coordinates = computed(() => {
  if (!victime.value?.localisation?.coordinates) {
    return {
      lat: 14.7167,
      lng: -17.4677
    }
  }
  return {
    lat: victime.value.localisation.coordinates[1],
    lng: victime.value.localisation.coordinates[0]
  }
})

// Fonction pour formater la date en français
const formatDate = (date: string) => {
  return dayjs(date).locale('fr').format('D MMMM YYYY')
}

// Fonction pour partager sur les réseaux sociaux
const partager = (reseau: 'facebook' | 'twitter') => {
  const url = encodeURIComponent(window.location.href)
  const titre = encodeURIComponent(`${victime.value?.prenom_nom} - CartograFreeSenegal`)
  
  if (reseau === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  } else {
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${titre}`, '_blank')
  }
}

// Récupérer les victimes au chargement de la page
onMounted(async () => {
  await store.fetchVictimes()
})
</script>

<style>
.leaflet-container {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style> 