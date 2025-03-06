<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-bold">Actualités</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="actualite in actualites" :key="actualite.id" 
           class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div class="aspect-w-16 aspect-h-9 bg-gray-700">
          <img :src="actualite.image" 
               :alt="actualite.titre"
               class="object-cover w-full h-full">
        </div>
        <div class="p-6">
          <div class="text-sm text-gray-400 mb-2">{{ formatDate(actualite.date) }}</div>
          <h2 class="text-xl font-bold mb-3">{{ actualite.titre }}</h2>
          <p class="text-gray-400 mb-4">{{ actualite.resume }}</p>
          <NuxtLink :to="`/actualites/${actualite.id}`" 
                   class="text-blue-400 hover:text-blue-300">
            Lire la suite →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

// Données fictives pour les actualités
const actualites = ref([
  {
    id: 1,
    titre: 'Nouvelle manifestation à Dakar',
    resume: 'Une nouvelle manifestation a eu lieu dans la capitale sénégalaise, rassemblant des milliers de personnes...',
    date: '2024-03-15',
    image: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: 2,
    titre: 'Témoignage d\'un manifestant',
    resume: 'Un manifestant raconte son expérience lors des récentes manifestations et les raisons de son engagement...',
    date: '2024-03-10',
    image: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: 3,
    titre: 'Impact des manifestations',
    resume: 'Analyse de l\'impact des manifestations sur la société sénégalaise et les changements qu\'elles ont apportés...',
    date: '2024-03-05',
    image: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: 4,
    titre: 'Réactions internationales',
    resume: 'Les réactions de la communauté internationale face aux récents événements au Sénégal...',
    date: '2024-02-28',
    image: 'https://picsum.photos/800/600?random=4'
  },
  {
    id: 5,
    titre: 'Perspectives d\'avenir',
    resume: 'Quelles sont les perspectives d\'avenir pour le mouvement de protestation au Sénégal ?',
    date: '2024-02-20',
    image: 'https://picsum.photos/800/600?random=5'
  },
  {
    id: 6,
    titre: 'Histoire des manifestations',
    resume: 'Retour sur l\'historique des manifestations au Sénégal et leur évolution dans le temps...',
    date: '2024-02-15',
    image: 'https://picsum.photos/800/600?random=6'
  }
])

// Fonction pour formater la date en français
const formatDate = (date: string) => {
  return dayjs(date).locale('fr').format('D MMMM YYYY')
}
</script> 