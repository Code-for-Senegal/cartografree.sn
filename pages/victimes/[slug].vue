<template>
    <div class="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-2 md:p-4">
      <div class="max-w-5xl mx-auto space-y-4">
        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="w-16 h-16 border-4 border-neutral-600 border-t-white rounded-full animate-spin mb-4"></div>
          <p class="text-neutral-400">Chargement des informations...</p>
        </div>

        <!-- Message d'erreur -->
        <div v-else-if="error" class="bg-red-900/20 border border-red-900 rounded-xl p-6 text-center">
          <p class="text-red-400">{{ error }}</p>
          <NuxtLink to="/victimes" class="text-white underline mt-4 inline-block">Retour à la liste des victimes</NuxtLink>
        </div>

        <!-- Contenu principal -->
        <template v-else-if="victime">
          <!-- Données structurées pour WhatsApp -->
          <span v-if="victime.photo_principale" itemscope itemtype="http://schema.org/ImageObject" class="hidden">
            <link itemprop="url" :href="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/anonyme.png'" />
          </span>
          
          <!-- En-tête avec photo et informations principales -->
          <div class="bg-gradient-to-br from-neutral-900 to-black/80 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl border border-white/[0.07]">
            <div class="grid md:grid-cols-2 gap-0">
              <!-- Photo -->
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                
                <div :class="`overflow-hidden rounded-tl-2xl rounded-bl-2xl md:rounded-bl-none md:rounded-tr-none border-2 ${getBorderColorClass}`">
                  <!-- Version mobile: hauteur limitée -->
                  <div class="block md:hidden">
                    <img :src="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/anonyme.png'" 
                        :alt="victime.prenom_nom"
                        class="w-full max-h-80 object-contain">
                  </div>
                  
                  <!-- Version desktop: hauteur complète avec proportions préservées -->
                  <div class="hidden md:block h-full">
                    <img :src="victime.photo_principale ? `${config.public.apiBase}/assets/${victime.photo_principale}` : '/anonyme.png'" 
                        :alt="victime.prenom_nom"
                        class="w-full max-h-80 object-contain bg-neutral-900">
                  </div>
                </div>
              </div>
              
              <!-- Informations -->
              <div class="p-4 md:p-8 flex flex-col justify-between bg-gradient-to-b from-neutral-900 via-neutral-950 to-black ">
                <div class="space-y-2">
                  <h1 class="text-2xl md:text-4xl font-bold text-white tracking-wide">
                    {{ victime.prenom_nom }}
                  </h1>
                  
                  <div class="space-y-4">
                    <div v-if="victime.age" class="flex items-center text-neutral-200">
                      <span class="text-xs uppercase tracking-widest w-28 md:w-32 font-medium text-neutral-400">Âge</span>
                      <span class="text-sm">{{ victime.age }} ans</span>
                    </div>
                    
                    <div v-if="victime.profession" class="flex items-center text-neutral-200">
                      <span class="text-xs uppercase tracking-widest w-28 md:w-32 font-medium text-neutral-400">Profession</span>
                      <span class="text-sm">{{ victime.profession }}</span>
                    </div>
                    
                    <div class="flex items-center text-neutral-200">
                      <span class="text-xs uppercase tracking-widest w-28 md:w-32 font-medium text-neutral-400">Date</span>
                      <span class="text-sm">{{ formatDate(victime.date_mort) }}</span>
                    </div>
                    
                    <div class="flex items-center text-neutral-200">
                      <span class="text-xs uppercase tracking-widest w-28 md:w-32 font-medium text-neutral-400">Lieu</span>
                      <span class="text-sm">{{ victime.region }}{{ victime.commune ? `, ${victime.commune}` : '' }}</span>
                    </div>
                    
                    <div v-if="victime.cause_mort" class="flex items-center text-neutral-200">
                      <span class="text-xs uppercase tracking-widest w-28 md:w-32 font-medium text-neutral-400">Cause</span>
                      <span class="text-sm">{{ victime.cause_mort }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <!-- Présentation -->
          <div v-if="victime.presentation" class="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black/90 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl border border-white/[0.07]">
            <h2 class="text-lg font-medium text-white tracking-wide mb-6 flex items-center">
              <span class="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              Présentation
            </h2>
            <div class="prose prose-invert max-w-none">
              <div v-html="victime.presentation" class="text-sm md:text-base leading-relaxed text-neutral-200 font-light"></div>
            </div>
          </div>
    
          <!-- Section témoignages vidéo -->
          <section v-if="victime.id && temoignagesStore.temoignagesParVictime(victime.id).length > 0" class="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black/90 p-4 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] mt-6">
            <h2 class="text-xl font-medium text-white mb-4">Témoignages vidéo</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="temoignage in victime.id ? temoignagesStore.temoignagesParVictime(victime.id) : []" :key="temoignage.id" class="space-y-3">
                <div class="aspect-video rounded-xl overflow-hidden border border-white/[0.05] shadow-lg">
                  <iframe 
                    :src="temoignagesStore.getYoutubeEmbedUrl(temoignage.url_youtube)"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                  </iframe>
                </div>
                <h3 class="text-sm md:text-base font-medium text-white">{{ temoignage.titre }}</h3>
                <p v-if="temoignage.date_publication" class="text-xs text-neutral-400">
                  Publié le {{ formatDate(temoignage.date_publication) }}
                </p>
              </div>
            </div>
          </section>
    
          <!-- Carte -->
          <div v-if="victime.localisation" class="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black/90 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl border border-white/[0.07]">
            <div class="relative h-64 rounded-xl overflow-hidden">
              <client-only>
                <l-map ref="map" 
                      v-if="coordinates" 
                      :zoom="13" 
                      :center="[coordinates[0], coordinates[1]]"
                      :use-global-leaflet="false"
                      class="h-full w-full z-0">
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <l-marker :lat-lng="[coordinates[0], coordinates[1]]" />
                </l-map>
              </client-only>
            </div>
          </div>
    
          <!-- Boutons de navigation précédent/suivant -->
          <div class="pt-4 flex flex-col space-y-4">
            <div class="flex justify-between">
              <NuxtLink 
                v-if="previousVictime" 
                :to="`/victimes/${slugifyVictime(previousVictime.prenom_nom)}`" 
                class="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-300 group bg-black/30 backdrop-blur-xl rounded-xl border border-white/[0.05]"
              >
                <svg class="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Victime précédente</span>
              </NuxtLink>
              
              <NuxtLink 
                v-if="nextVictime" 
                :to="`/victimes/${slugifyVictime(nextVictime.prenom_nom)}`" 
                class="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-300 group bg-black/30 backdrop-blur-xl rounded-xl border border-white/[0.05]"
              >
                <span>Victime suivante</span>
                <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
            
            <!-- Séparateur -->
          <div class="border-t border-neutral-800 my-6"></div>
            <div class="flex justify-start">
              <NuxtLink to="/victimes" 
                        class="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-300 group">
                <svg class="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Retour à la liste</span>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Séparateur -->
          <div class="border-t border-neutral-800 my-6"></div>
    
          <!-- Boutons de partage -->
          <div class="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <button @click="partager('facebook')" 
                    class="text-neutral-400 hover:text-blue-500 transition-colors flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="text-sm font-medium">Partager sur Facebook</span>
            </button>
            <button @click="partager('twitter')" 
                    class="text-neutral-400 hover:text-blue-400 transition-colors flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span class="text-sm font-medium">Partager sur Twitter</span>
            </button>
            <button @click="partager('whatsapp')" 
                    class="text-neutral-400 hover:text-green-500 transition-colors flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span class="text-sm font-medium">Partager sur WhatsApp</span>
            </button>
          </div>
        </template>

        <!-- Message si aucune victime trouvée -->
        <div v-else class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center">
          <p class="text-neutral-400">Aucune information trouvée pour cette victime.</p>
          <NuxtLink to="/victimes" class="text-white underline mt-4 inline-block">Retour à la liste des victimes</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useVictimesStore } from '~/stores/victimes'
  import { useTemoignagesStore } from '~/stores/temoignages'
  import dayjs from 'dayjs'
  import 'dayjs/locale/fr'
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
  import 'leaflet/dist/leaflet.css'
  import type { LatLngTuple } from 'leaflet'
  
  interface Point {
    type: 'Point'
    coordinates: [number, number]
  }
  
  interface Temoignage {
    id: number
    titre: string
    type: string
    url_youtube: string
    date_publication: string | null
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
    temoignages?: Temoignage[]
  }
  
  const config = useRuntimeConfig()
  const store = useVictimesStore()
  const temoignagesStore = useTemoignagesStore()
  const route = useRoute()
  const router = useRouter()
  
  // États réactifs
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  // Récupérer le slug depuis l'URL
  const slug = route.params.slug as string
  
  // Charger les données si nécessaire
  onMounted(async () => {
    try {
      // Charger les victimes si ce n'est pas déjà fait
      if (store.victimes.length === 0) {
        await store.fetchVictimes()
      }
      
      // Charger les témoignages
      await temoignagesStore.fetchTemoignages()
      
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des données'
    }
  })
  
  // Trouver la victime correspondante par son slug
  const victime = computed(() => {
    return store.findVictimeBySlug(slug)
  })
  
  // Récupérer la victime précédente
  const previousVictime = computed(() => {
    if (!victime.value) return null
    return store.findPreviousVictime(victime.value)
  })
  
  // Récupérer la victime suivante
  const nextVictime = computed(() => {
    if (!victime.value) return null
    return store.findNextVictime(victime.value)
  })
  
  // Fonction pour créer un slug à partir d'un nom (pour les liens)
  const slugifyVictime = (text: string) => {
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
  
  // Calculer les coordonnées pour la carte
  const coordinates = computed<LatLngTuple>(() => {
    if (!victime.value?.localisation?.coordinates) {
      return [14.7167, -17.4677] // Coordonnées par défaut (Dakar)
    }
    return [
      victime.value.localisation.coordinates[1],
      victime.value.localisation.coordinates[0]
    ]
  })
  
  // Fonction pour formater la date en français
  const formatDate = (date: string) => {
    return dayjs(date).locale('fr').format('D MMMM YYYY')
  }
  
  // Fonction pour partager sur les réseaux sociaux
  const partager = (reseau: 'facebook' | 'twitter' | 'whatsapp') => {
    if (!process.client) return
    
    const baseUrl = window.location.origin
    const pageUrl = `${baseUrl}/victimes/${slug}`
    const url = encodeURIComponent(pageUrl)
    const titre = encodeURIComponent(`${victime.value?.prenom_nom} - CartograFreeSenegal`)
    
    if (reseau === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    } else if (reseau === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${titre}`, '_blank')
    } else if (reseau === 'whatsapp') {
      window.open(`https://wa.me/?text=${titre}%20${url}`, '_blank')
    }
  }
  
  // Fonction pour déterminer la couleur de la bordure selon l'année
  const getBorderColorClass = computed(() => {
    if (!victime.value?.date_mort) return 'border-white/5'
    
    const year = new Date(victime.value.date_mort).getFullYear()
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
  })
  
  // Méta-tags pour le SEO et le partage sur les réseaux sociaux
  useHead(() => {
    if (!victime.value) {
      return {
        title: 'Victime non trouvée - CartograFreeSenegal',
        meta: [
          { name: 'description', content: 'Information sur la victime non trouvée - CartograFreeSenegal' }
        ]
      }
    }

    // URL de base pour les images
    const baseUrl = process.client ? window.location.origin : 'https://cartografree.sn'
    
    const photoUrl = victime.value?.photo_principale 
      ? `${config.public.apiBase}/assets/${victime.value.photo_principale}` 
      : `${baseUrl}/anonyme.png`
    
    const description = victime.value.presentation 
      ? victime.value.presentation.replace(/<[^>]*>/g, '').substring(0, 160) + '...'
      : `${victime.value.prenom_nom}, ${victime.value.age ? victime.value.age + ' ans, ' : ''}${victime.value.profession ? victime.value.profession + ', ' : ''}décédé le ${formatDate(victime.value.date_mort)} à ${victime.value.region}${victime.value.commune ? ', ' + victime.value.commune : ''}.`

    // URL canonique
    const canonicalUrl = process.client ? window.location.href : `${baseUrl}/victimes/${slug}`

    return {
      title: `${victime.value.prenom_nom} - Victime - CartograFreeSenegal`,
      meta: [
        // Méta-tags standards pour le SEO
        { name: 'description', content: description },
        { name: 'keywords', content: `${victime.value.prenom_nom}, victime, Sénégal, manifestation, ${victime.value.region}, ${formatDate(victime.value.date_mort)}` },
        
        // Open Graph pour Facebook, LinkedIn, etc.
        { property: 'og:title', content: `${victime.value.prenom_nom} - CartograFreeSenegal` },
        { property: 'og:description', content: description },
        { property: 'og:image', content: photoUrl },
        { property: 'og:image:secure_url', content: photoUrl },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '300' },
        { property: 'og:image:height', content: '300' },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:type', content: 'profile' },
        { property: 'og:site_name', content: 'CartograFreeSenegal' },
        { property: 'og:locale', content: 'fr_FR' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${victime.value.prenom_nom} - CartograFreeSenegal` },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: photoUrl },
        
        // Méta-tags supplémentaires pour le référencement
        { name: 'author', content: 'CartograFreeSenegal' },
        { name: 'robots', content: 'index, follow' },
        
        // Méta-tags spécifiques pour WhatsApp
        { itemprop: 'image', content: photoUrl }
      ],
      link: [
        { rel: 'canonical', href: canonicalUrl },
        { rel: 'image_src', href: photoUrl },
        { itemprop: 'thumbnailUrl', href: photoUrl }
      ],
      htmlAttrs: {
        itemscope: true,
        itemtype: 'http://schema.org/Article'
      },
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: victime.value.prenom_nom,
            description: description,
            image: photoUrl,
            birthDate: victime.value.age ? new Date(new Date(victime.value.date_mort).getFullYear() - victime.value.age, 0, 1).toISOString().split('T')[0] : undefined,
            deathDate: victime.value.date_mort,
            jobTitle: victime.value.profession || undefined,
            address: {
              '@type': 'PostalAddress',
              addressLocality: victime.value.commune || undefined,
              addressRegion: victime.value.region
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl
            },
            publisher: {
              '@type': 'Organization',
              name: 'CartograFreeSenegal',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
              }
            }
          })
        }
      ]
    }
  })
  </script>
  
  <style>
  .leaflet-container {
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  
  /* Style pour le contenu riche (prose) */
  .prose-invert {
    --tw-prose-invert-headings: theme('colors.white');
    --tw-prose-invert-body: theme('colors.neutral.200');
    --tw-prose-invert-bold: theme('colors.white');
    --tw-prose-invert-links: theme('colors.gray.300');
    --tw-prose-invert-code: theme('colors.white');
    --tw-prose-invert-pre-code: theme('colors.neutral.300');
    --tw-prose-invert-pre-bg: theme('colors.neutral.900');
    --tw-prose-invert-quotes: theme('colors.neutral.100');
  }
  
  /* Animation subtile pour les cartes au survol */
  .bg-gradient-to-br {
    transition: all 0.5s ease;
  }
  
  .bg-gradient-to-br:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
  </style> 