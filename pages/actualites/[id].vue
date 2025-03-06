<template>
  <div v-if="actualite" class="space-y-8">
    <!-- En-tête -->
    <div class="relative h-96">
      <img :src="actualite.image" 
           :alt="actualite.titre"
           class="w-full h-full object-cover rounded-lg">
      <div class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white text-center px-4">{{ actualite.titre }}</h1>
      </div>
    </div>

    <!-- Contenu -->
    <div class="bg-gray-800 rounded-lg p-8 shadow-lg">
      <div class="text-gray-400 mb-6">{{ formatDate(actualite.date) }}</div>
      
      <div class="prose prose-invert max-w-none">
        <p class="text-xl mb-8">{{ actualite.resume }}</p>
        
        <div class="space-y-6">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        </div>
      </div>

      <!-- Boutons de partage -->
      <div class="mt-8 pt-8 border-t border-gray-700 flex justify-center space-x-4">
        <button @click="partager('facebook')" 
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Partager sur Facebook</span>
        </button>
        <button @click="partager('twitter')" 
                class="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <span>Partager sur Twitter</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const route = useRoute()

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
  }
])

// Récupérer l'actualité
const actualite = computed(() => {
  return actualites.value.find(a => a.id === parseInt(route.params.id as string))
})

// Fonction pour formater la date en français
const formatDate = (date: string) => {
  return dayjs(date).locale('fr').format('D MMMM YYYY')
}

// Fonction pour partager sur les réseaux sociaux
const partager = (reseau: 'facebook' | 'twitter') => {
  const url = encodeURIComponent(window.location.href)
  const titre = encodeURIComponent(actualite.value?.titre || '')
  
  if (reseau === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  } else {
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${titre}`, '_blank')
  }
}
</script> 