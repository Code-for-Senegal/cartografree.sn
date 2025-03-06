<template>
  <div class="space-y-4 px-2 md:px-6 mx-auto">
    <!-- Hero Section -->
    <section class="text-center py-2 md:py-4">
      <img src="/logo.png" alt="CartograFreeSenegal" class="h-16 md:h-24 mx-auto mb-6">
      <h1 class="sr-only">CartografreeSénégal</h1>
      <div class="space-y-2">
        <p class="text-lg md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">
          Mémorial digital des victimes de la répression des manifestations politiques au Sénégal <br>
          Mars 2021 - Février 2024
        </p>
      </div>
    </section>

    <!-- Statistiques -->
    <section class="bg-gradient-to-br from-gray-900 to-neutral-950 p-2 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
      <div class="grid grid-cols-3 gap-6">
        <!-- Skeleton loader pendant le chargement -->
        <template v-if="store.loading">
          <div v-for="i in 3" :key="i" class="text-center animate-pulse">
            <div class="h-4 md:h-5 bg-neutral-800 rounded-full w-3/4 mx-auto mb-3"></div>
            <div class="h-12 md:h-16 bg-neutral-800 rounded-full w-1/2 mx-auto"></div>
          </div>
        </template>

        <!-- Contenu réel une fois chargé -->
        <template v-else>
          <div class="text-center">
            <h3 class="text-sm md:text-base font-medium text-neutral-500 mb-1">Nombre de victimes</h3>
            <p class="text-4xl md:text-6xl font-bold text-white">{{ store.totalVictimes ?? '-' }}</p>
          </div>
          <div class="text-center">
            <h3 class="text-sm md:text-base font-medium text-neutral-500 mb-1">Morts par balle</h3>
            <p class="text-4xl md:text-6xl font-bold text-white">{{ store.victimesParBalle ?? '-' }}</p>
          </div>
          <div class="text-center">
            <h3 class="text-sm md:text-base font-medium text-neutral-500 mb-1">Moyenne d'âge</h3>
            <p class="text-4xl md:text-6xl font-bold text-white">{{ store.moyenneAge ?? '-' }}</p>
          </div>
        </template>
      </div>
    </section>

    <!-- Victimes mises en avant -->
    <section>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2">
        <!-- Skeleton loader pendant le chargement -->
        <template v-if="store.loading">
          <div v-for="i in 4" :key="i" 
               class="group relative aspect-[3/4] bg-gradient-to-br from-neutral-950 to-black rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border-2 border-white/5 animate-pulse">
            <div class="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950"></div>
            <div class="absolute inset-x-0 bottom-0 p-2 md:p-4 space-y-2">
              <div class="h-4 bg-neutral-800 rounded-full w-3/4"></div>
              <div class="h-3 bg-neutral-800/50 rounded-full w-1/2"></div>
              <div class="h-3 bg-neutral-800/50 rounded-full w-1/3"></div>
            </div>
          </div>
        </template>
        
        <!-- Contenu réel une fois chargé -->
        <template v-else>
          <div v-for="victime in victimesMisesEnAvant" :key="victime.id" 
               :class="`group relative aspect-[3/4] bg-gradient-to-br from-neutral-950 to-black rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border-4 ${getBorderColorClass(victime.date_mort)} cursor-pointer hover:border-opacity-100 transition-all duration-300`">
            <NuxtLink :to="`/victimes/${slugify(victime.prenom_nom)}`" class="absolute inset-0">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
              <div class="absolute inset-0">
                <div class="w-full h-full">
                  <img :src="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/unknown_member.webp'" 
                       :alt="victime.prenom_nom"
                       class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 z-20 p-2 md:p-4">
                <h3 class="text-normal text-sm md:text-xl font-bold text-white tracking-tight mb-1">{{ victime.prenom_nom }}</h3>
                <p class="text-neutral-400 text-xs font-normal mb-1">{{ capitalizeFirstLetter(victime.region.toLowerCase()) }}{{ victime.age ? ` • ${victime.age} ans` : '' }}</p>
                <p class="text-neutral-400 text-xs font-normal">{{ formatDate(victime.date_mort) }}</p>
              </div>
            </NuxtLink>
          </div>
        </template>
      </div>
      <div class="text-center mt-8">
        <NuxtLink to="/victimes" 
                 class="inline-block bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/[0.05]">
          Voir toutes les victimes
        </NuxtLink>
      </div>
    </section>

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
              :lat-lng="[victime.localisation!.coordinates[1], victime.localisation!.coordinates[0]]">
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

    <!-- Témoignages vidéo  -->
    <section class="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-2 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
      <h2 class="text-xl font-medium text-white mb-4">Témoignages vidéo</h2>
      
      <!-- Skeleton loader pendant le chargement -->
      <div v-if="temoignagesStore.loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="i in 3" :key="i" class="animate-pulse space-y-3">
          <div class="aspect-video bg-neutral-800 rounded-xl"></div>
          <div class="h-4 bg-neutral-800 rounded-full w-3/4"></div>
          <div class="h-3 bg-neutral-800/50 rounded-full w-1/2"></div>
        </div>
      </div>
      
      <!-- Contenu réel une fois chargé -->
      <div v-else-if="temoignagesStore.temoignagesAccueil.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="temoignage in temoignagesStore.temoignagesAccueil" :key="temoignage.id" class="space-y-3 group">
          <div class="aspect-video rounded-xl overflow-hidden border border-white/[0.05] shadow-lg">
            <iframe 
              :src="temoignagesStore.getYoutubeEmbedUrl(temoignage.url_youtube)"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <h3 class="text-sm md:text-base font-medium text-white group-hover:text-gray-300 transition-colors duration-300">
            {{ temoignage.titre }}
          </h3>
          <p v-if="temoignage.date_publication" class="text-xs text-neutral-400">
            Publié le {{ formatDate(temoignage.date_publication) }}
          </p>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <NuxtLink to="/temoignages" 
                 class="inline-block bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/[0.05]">
          Voir tous les témoignages
        </NuxtLink>
      </div>
    </section>

    <!-- Statistiques principales -->
    <section class="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-2 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
      <h2 class="text-xl font-medium text-white mb-4">Statistiques des victimes</h2>
      
      <!-- Skeleton loader pendant le chargement -->
      <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="i in 2" :key="i" class="animate-pulse space-y-3">
          <div class="h-6 bg-neutral-800 rounded-full w-1/3 mb-6"></div>
          <div class="aspect-[4/3] bg-neutral-800/50 rounded-xl"></div>
        </div>
      </div>
      
      <!-- Contenu réel une fois chargé -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Répartition par région -->
        <div>
          <h3 class="text-base font-medium text-white mb-3">Répartition par région</h3>
          <div class="aspect-[4/3]">
            <DoughnutChart 
              v-if="chartData.regions.labels.length > 0"
              :chartData="chartData.regions"
              :options="chartOptions.regions"
            />
            <div v-else class="flex items-center justify-center h-full text-neutral-400">
              Aucune donnée disponible
            </div>
          </div>
        </div>

        <!-- Répartition par année -->
        <div>
          <h3 class="text-base font-medium text-white mb-3">Répartition par année</h3>
          <div class="aspect-[4/3]">
            <BarChart 
              v-if="chartData.annees.labels.length > 0"
              :chartData="chartData.annees"
              :options="chartOptions.annees"
            />
            <div v-else class="flex items-center justify-center h-full text-neutral-400">
              Aucune donnée disponible
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <NuxtLink to="/statistiques" 
                 class="inline-block bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/[0.05]">
          Voir toutes les statistiques
        </NuxtLink>
      </div>
    </section>

    <!-- Dernières actualités -->
    <section class="hidden">
      <h2 class="text-2xl font-light text-white tracking-tight mb-6">Dernières actualités</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="actualite in actualites" :key="actualite.id" 
             class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">{{ actualite.titre }}</h3>
            <p class="text-neutral-400 mb-4 text-sm">{{ actualite.resume }}</p>
            <NuxtLink :to="`/actualites/${actualite.id}`" 
                     class="text-neutral-400 hover:text-white transition-colors text-sm">
              Lire la suite →
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <NuxtLink to="/actualites" 
                 class="inline-block bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/[0.05]">
          Voir toutes les actualités
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useVictimesStore } from '~/stores/victimes'
import { useTemoignagesStore } from '~/stores/temoignages'
import { DoughnutChart, BarChart } from 'vue-chart-3'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { computed } from 'vue'
import { useHead } from 'unhead'

interface Temoignage {
  id: number
  titre: string
  type: string
  url_youtube: string
  victime: number
  afficher_accueil: boolean
  date_publication: string
}

interface Victime {
  id: number
  prenom_nom: string
  age?: number
  region: string
  date_mort: string
  afficher_accueil?: boolean
  photo_principale?: string
  localisation?: {
    coordinates: [number, number]
  } | null
}

const config = useRuntimeConfig()
const store = useVictimesStore()
const temoignagesStore = useTemoignagesStore()

// Méta-tags SEO spécifiques à la page d'accueil
useHead({
  title: 'CartograFreeSenegal - Mémorial des victimes des manifestations au Sénégal',
  meta: [
    { name: 'description', content: 'Mémorial digital des victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024. Découvrez les profils, statistiques et témoignages.' },
    { name: 'keywords', content: 'Sénégal, victimes, manifestations, répression, mémorial, cartographie, témoignages, statistiques' },
    
    // Open Graph / Facebook
    { property: 'og:title', content: 'CartograFreeSenegal - Mémorial des victimes des manifestations au Sénégal' },
    { property: 'og:description', content: 'Mémorial digital des victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024.' },
    { property: 'og:url', content: 'https://cartografree.sn' },
    { property: 'og:type', content: 'website' },
    
    // Twitter
    { name: 'twitter:title', content: 'CartograFreeSenegal - Mémorial des victimes des manifestations au Sénégal' },
    { name: 'twitter:description', content: 'Mémorial digital des victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://cartografree.sn' }
  ]
})

// Couleurs pour les graphiques
const colors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
]

// Données pour les graphiques
const chartData = computed(() => {
  // Répartition par région
  const regionsMap = new Map()
  store.victimes.forEach(victime => {
    if (victime.region) {
      regionsMap.set(victime.region, (regionsMap.get(victime.region) || 0) + 1)
    }
  })
  
  const regionsLabels = [...regionsMap.keys()]
  const regionsData = [...regionsMap.values()]
  
  // Répartition par année
  const anneesMap = new Map()
  store.victimes.forEach(victime => {
    if (victime.date_mort) {
      const annee = victime.date_mort.substring(0, 4)
      anneesMap.set(annee, (anneesMap.get(annee) || 0) + 1)
    }
  })
  
  const anneesLabels = [...anneesMap.keys()].sort()
  const anneesData = anneesLabels.map(annee => anneesMap.get(annee))
  
  return {
    regions: {
      labels: regionsLabels,
      datasets: [{
        data: regionsData,
        backgroundColor: colors.slice(0, regionsLabels.length),
        borderWidth: 1
      }]
    },
    annees: {
      labels: anneesLabels,
      datasets: [{
        label: 'Nombre de victimes',
        data: anneesData,
        backgroundColor: colors[0],
        borderWidth: 1
      }]
    }
  }
})

// Options pour les graphiques
const chartOptions = {
  regions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    }
  },
  annees: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          precision: 0
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
}

// Données fictives pour les actualités
const actualites = ref([
  {
    id: 1,
    titre: 'Nouvelle manifestation à Dakar',
    resume: 'Une nouvelle manifestation a eu lieu dans la capitale sénégalaise...'
  },
  {
    id: 2,
    titre: 'Témoignage d\'un manifestant',
    resume: 'Un manifestant raconte son expérience lors des récentes manifestations...'
  },
  {
    id: 3,
    titre: 'Impact des manifestations',
    resume: 'Analyse de l\'impact des manifestations sur la société sénégalaise...'
  }
])

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
      return 'border-amber-500/50'
    case 2022:
      return 'border-emerald-500/50'
    case 2023:
      return 'border-sky-500/50'
    case 2024:
      return 'border-purple-500/50'
    default:
      return 'border-white/5'
  }
}

// Récupérer les victimes et les témoignages au chargement de la page
onMounted(async () => {
  await store.fetchVictimes()
  await temoignagesStore.fetchTemoignages()
})

// Sélectionner les victimes à afficher sur la page d'accueil
const victimesMisesEnAvant = computed(() => {
  return store.victimes.filter(victime => victime.afficher_accueil)
})

// Filtrer les victimes qui ont des coordonnées
const victimesGeoreferencees = computed(() => {
  return store.victimes.filter(victime => 
    victime.localisation && 
    victime.localisation.coordinates && 
    Array.isArray(victime.localisation.coordinates) && 
    victime.localisation.coordinates.length === 2
  )
})

// Fonction pour naviguer vers la page de détail d'une victime
const navigateToVictime = (victime: any) => {
  navigateTo(`/victimes/${slugify(victime.prenom_nom)}`)
}
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