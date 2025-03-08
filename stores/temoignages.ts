import { defineStore } from 'pinia'
// Importer les données locales
import temoignagesData from '~/assets/data/cartografree_temoignages.json'

export interface Temoignage {
  id: number
  titre: string
  type: string
  url_youtube: string
  victime: number
  afficher_accueil: boolean
  date_publication: string
  status?: string
}

export const useTemoignagesStore = defineStore('temoignages', {
  state: () => ({
    temoignages: [] as Temoignage[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    temoignagesAccueil: (state) => {
      return state.temoignages
        .filter(temoignage => temoignage.afficher_accueil)
        .sort((a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime())
        .slice(0, 3)
    },
    
    temoignagesParVictime: (state) => (victimeId: number) => {
      return state.temoignages
        .filter(temoignage => temoignage.victime === victimeId)
        .sort((a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime())
    },
    
    temoignagesYoutube: (state) => {
      return state.temoignages
        .filter(temoignage => temoignage.type === 'youtube' && temoignage.url_youtube)
        .sort((a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime())
    }
  },

  actions: {
    async fetchTemoignages() {
      const config = useRuntimeConfig()
      
      // Éviter de recharger si les données sont déjà présentes
      if (this.temoignages.length > 0) return
      
      this.loading = true
      this.error = null
      
      try {
        // Utiliser les données locales si l'option est activée
        if (config.public.useLocalData) {
          console.log('Utilisation des données locales pour les témoignages')
          
          // Simuler un délai pour imiter un appel réseau (optionnel)
          await new Promise(resolve => setTimeout(resolve, 300))
          
          if (temoignagesData && temoignagesData.data && Array.isArray(temoignagesData.data)) {
            this.temoignages = temoignagesData.data
          } else {
            throw new Error('Format de données locales inattendu: le fichier ne contient pas de tableau data')
          }
          
          return
        }
        
        // Sinon, faire l'appel API normal
        const response = await fetch(`${config.public.apiBase}/items/cartografree_temoignages?sort=-date_publication`, {
          headers: {
            'Authorization': `Bearer ${config.public.apiToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des témoignages: ${response.status}`)
        }
        
        const data = await response.json()
        this.temoignages = data.data
      } catch (error: any) {
        console.error('Erreur lors de la récupération des témoignages:', error)
        this.error = error.message || 'Une erreur est survenue'
        // En cas d'erreur, initialiser avec un tableau vide pour éviter les erreurs
        this.temoignages = []
      } finally {
        this.loading = false
      }
    },
    
    // Fonction utilitaire pour convertir une URL YouTube en URL d'intégration
    getYoutubeEmbedUrl(url: string) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`
      }
      
      return url
    }
  }
}) 