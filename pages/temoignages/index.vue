<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-black to-neutral-950 space-y-4 p-2 md:p-4 md:mx-auto">

    <!-- En-tête -->
      <h1 class="text-2xl font-bold text-white mb-2">Témoignages vidéo</h1>
      <p class="text-neutral-400 text-sm">
        Retrouvez l'ensemble des témoignages vidéo des proches des victimes et des témoins des événements.
      </p>

    <!-- Liste des témoignages -->
    <div v-if="temoignagesStore.loading">
      <!-- Skeleton pour la vue grille -->
      <div v-if="vueMode === 'grid'" 
           class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div v-for="i in 6" :key="i"
             class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
          <div class="aspect-video bg-white/5 animate-pulse"></div>
          <div class="p-4 space-y-2">
            <div class="h-5 bg-white/5 animate-pulse rounded-lg w-3/4"></div>
            <div class="h-4 bg-white/5 animate-pulse rounded-lg w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Skeleton pour la vue liste -->
      <div v-else class="space-y-3">
        <div v-for="i in 5" :key="i"
             class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
          <div class="flex items-center space-x-4">
            <div class="w-32 h-20 bg-white/5 animate-pulse rounded-xl"></div>
            <div class="flex-grow space-y-2">
              <div class="h-5 bg-white/5 animate-pulse rounded-lg w-1/3"></div>
              <div class="h-4 bg-white/5 animate-pulse rounded-lg w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="temoignagesStore.error" class="text-center py-12 text-red-400">
      {{ temoignagesStore.error }}
    </div>
    <div v-else>
      <!-- Vue grille -->
      <div v-if="vueMode === 'grid'" 
           class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div v-for="temoignage in temoignagesStore.temoignagesYoutube" :key="temoignage.id"
             class="group bg-gradient-to-br from-neutral-950 to-black rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] hover:border-white/20 transition-all duration-300">
          <div class="aspect-video">
            <iframe 
              :src="temoignagesStore.getYoutubeEmbedUrl(temoignage.url_youtube)"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div class="p-4">
            <h3 class="text-base md:text-lg font-medium text-white group-hover:text-gray-300 transition-colors duration-300 mb-2">
              {{ temoignage.titre }}
            </h3>
            <p v-if="temoignage.date_publication" class="text-xs text-neutral-400">
              Publié le {{ formatDate(temoignage.date_publication) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemoignagesStore } from '~/stores/temoignages'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const temoignagesStore = useTemoignagesStore()
const vueMode = ref('grid')

// Fonction pour formater la date en français
const formatDate = (date: string) => {
  return dayjs(date).locale('fr').format('D MMMM YYYY')
}

// Récupérer les témoignages au chargement de la page
onMounted(async () => {
  await temoignagesStore.fetchTemoignages()
})
</script> 