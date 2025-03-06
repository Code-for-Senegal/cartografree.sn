<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-bold">Manifestations</h1>

    <!-- Filtres -->
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Région</label>
          <select v-model="filters.region" 
                  class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
            <option value="">Toutes les régions</option>
            <option v-for="region in regionsUniques" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Année</label>
          <select v-model="filters.annee" 
                  class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
            <option value="">Toutes les années</option>
            <option v-for="annee in anneesUniques" :key="annee" :value="annee">
              {{ annee }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Recherche</label>
          <input type="text" 
                 v-model="filters.recherche" 
                 placeholder="Rechercher..."
                 class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
        </div>
      </div>
    </div>

    <!-- Liste des manifestations -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="manifestation in manifestationsFiltrees" :key="manifestation.id" 
           class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div class="aspect-w-16 aspect-h-9 bg-gray-700">
          <img :src="manifestation.image" 
               :alt="manifestation.titre"
               class="object-cover w-full h-full">
        </div>
        <div class="p-6">
          <div class="text-sm text-gray-400 mb-2">{{ formatDate(manifestation.date) }}</div>
          <h2 class="text-xl font-bold mb-3">{{ manifestation.titre }}</h2>
          <p class="text-gray-400 mb-4">{{ manifestation.description }}</p>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-400">
              {{ manifestation.region }}, {{ manifestation.ville }}
            </div>
            <div class="text-sm text-red-400">
              {{ manifestation.nombreVictimes }} victime(s)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

// Données fictives pour les manifestations
const manifestations = ref([
  {
    id: 1,
    titre: 'Manifestation pour la démocratie',
    description: 'Une grande manifestation a rassemblé des milliers de personnes dans les rues de Dakar...',
    date: '2024-03-15',
    region: 'Dakar',
    ville: 'Dakar',
    nombreVictimes: 2,
    image: 'https://picsum.photos/800/600?random=10'
  },
  {
    id: 2,
    titre: 'Protestation contre la hausse des prix',
    description: 'Les manifestants ont défilé pour protester contre la hausse des prix des denrées de première nécessité...',
    date: '2024-02-28',
    region: 'Thiès',
    ville: 'Thiès',
    nombreVictimes: 1,
    image: 'https://picsum.photos/800/600?random=11'
  },
  {
    id: 3,
    titre: 'Rassemblement pour la justice',
    description: 'Un rassemblement pacifique a été organisé pour demander plus de justice sociale...',
    date: '2024-02-15',
    region: 'Saint-Louis',
    ville: 'Saint-Louis',
    nombreVictimes: 0,
    image: 'https://picsum.photos/800/600?random=12'
  },
  {
    id: 4,
    titre: 'Manifestation des étudiants',
    description: 'Les étudiants ont manifesté pour réclamer de meilleures conditions d\'études...',
    date: '2024-01-30',
    region: 'Dakar',
    ville: 'Pikine',
    nombreVictimes: 1,
    image: 'https://picsum.photos/800/600?random=13'
  },
  {
    id: 5,
    titre: 'Protestation des transporteurs',
    description: 'Les transporteurs ont bloqué les routes principales pour protester contre les nouvelles réglementations...',
    date: '2024-01-15',
    region: 'Kaolack',
    ville: 'Kaolack',
    nombreVictimes: 0,
    image: 'https://picsum.photos/800/600?random=14'
  },
  {
    id: 6,
    titre: 'Marche pour la paix',
    description: 'Une marche pacifique a été organisée pour appeler à la paix et à la réconciliation...',
    date: '2024-01-01',
    region: 'Ziguinchor',
    ville: 'Ziguinchor',
    nombreVictimes: 0,
    image: 'https://picsum.photos/800/600?random=15'
  }
])

// Filtres
const filters = ref({
  region: '',
  annee: '',
  recherche: ''
})

// Calculer les régions uniques
const regionsUniques = computed(() => {
  return [...new Set(manifestations.value.map(m => m.region))].sort()
})

// Calculer les années uniques
const anneesUniques = computed(() => {
  return [...new Set(manifestations.value.map(m => m.date.substring(0, 4)))].sort().reverse()
})

// Filtrer les manifestations
const manifestationsFiltrees = computed(() => {
  return manifestations.value.filter(manifestation => {
    const matchRegion = !filters.value.region || manifestation.region === filters.value.region
    const matchAnnee = !filters.value.annee || manifestation.date.startsWith(filters.value.annee)
    const matchRecherche = !filters.value.recherche || 
      manifestation.titre.toLowerCase().includes(filters.value.recherche.toLowerCase()) ||
      manifestation.description.toLowerCase().includes(filters.value.recherche.toLowerCase())
    return matchRegion && matchAnnee && matchRecherche
  })
})

// Fonction pour formater la date en français
const formatDate = (date: string) => {
  return dayjs(date).locale('fr').format('D MMMM YYYY')
}
</script> 