import { defineStore } from 'pinia'

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
  age: number | null
  profession: string | null
  cause_mort: string
  date_mort: string
  region: string
  departement: string
  commune: string
  photo_principale: string
  localisation: Point | null
  presentation?: string
  temoignages?: Temoignage[]
  afficher_accueil: boolean
}

export const useVictimesStore = defineStore('victimes', {
  state: () => ({
    victimes: [] as Victime[],
    loading: false,
    error: null as string | null,
    statistiquesCalculees: false,
    filters: {
      region: '',
      annee: '',
      recherche: '',
      periode: ''
    }
  }),

  getters: {
    victimesFiltrees: (state) => {
      return state.victimes.filter(victime => {
        const matchRegion = !state.filters.region || victime.region === state.filters.region
        const matchAnnee = !state.filters.annee || victime.date_mort.startsWith(state.filters.annee)
        const matchRecherche = !state.filters.recherche || 
          victime.prenom_nom.toLowerCase().includes(state.filters.recherche.toLowerCase())
        
        let matchPeriode = true
        if (state.filters.periode) {
          const date = new Date(victime.date_mort)
          const annee = date.getFullYear()
          const mois = date.getMonth() + 1 // Les mois commencent à 0 en JavaScript
          
          switch (state.filters.periode) {
            case 'mars 2021':
              matchPeriode = annee === 2021 && mois === 3
              break
            case 'juin 2022':
              matchPeriode = annee === 2022 && mois === 6
              break
            case 'mars-mai 2023':
              matchPeriode = annee === 2023 && mois >= 3 && mois <= 5
              break
            case 'juin-août 2023':
              matchPeriode = annee === 2023 && mois >= 6 && mois <= 8
              break
            case 'février 2024':
              matchPeriode = annee === 2024 && mois === 2
              break
            default:
              matchPeriode = true
          }
        }
        
        return matchRegion && matchAnnee && matchRecherche && matchPeriode
      })
    },
    
    totalVictimes: (state) => {
      if (!state.statistiquesCalculees) return null
      return state.victimes.length
    },
    
    victimesParBalle: (state) => {
      if (!state.statistiquesCalculees) return null
      return state.victimes.filter(v => v.cause_mort?.toLowerCase().includes('balle')).length
    },
    
    moyenneAge: (state) => {
      if (!state.statistiquesCalculees) return null
      const agesValides = state.victimes
        .map(v => v.age)
        .filter((age): age is number => age !== null && !isNaN(age))
      
      if (agesValides.length === 0) return null
      
      const sommeAges = agesValides.reduce((sum, age) => sum + age, 0)
      return Math.round(sommeAges / agesValides.length)
    },
    
    regionsUniques: (state) => 
      [...new Set(state.victimes.map(v => v.region).filter(Boolean))].sort(),
    
    anneesUniques: (state) => 
      [...new Set(state.victimes.map(v => v.date_mort?.substring(0, 4)).filter(Boolean))].sort().reverse()
  },

  actions: {
    async fetchVictimes() {
      this.loading = true
      this.statistiquesCalculees = false
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/items/cartografree_victimes?sort=date_mort&filter[status]=published&limit=200&fields=*,temoignages.*`, {
          headers: {
            'Authorization': `Bearer ${config.public.apiToken}`
          }
        })
        
        if (!response.ok) throw new Error('Erreur lors de la récupération des données')
        
        const responseData = await response.json()

        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          this.victimes = responseData.data.map((victime: any) => ({
            ...victime,
            localisation: victime.localisation ? {
              type: 'Point',
              coordinates: Array.isArray(victime.localisation.coordinates) 
                ? victime.localisation.coordinates 
                : null
            } : null
          }))
          
          // Marquer les statistiques comme calculées immédiatement après avoir défini les victimes
          this.statistiquesCalculees = true
        } else {
          throw new Error('Format de données inattendu: la réponse ne contient pas de tableau data')
        }

      } catch (error) {
        console.error('Erreur lors de la récupération des victimes:', error)
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        this.statistiquesCalculees = false
      } finally {
        this.loading = false
      }
    },

    setFilter(type: 'region' | 'annee' | 'recherche' | 'periode', value: string) {
      this.filters[type] = value
    },

    resetFilters() {
      this.filters = {
        region: '',
        annee: '',
        recherche: '',
        periode: ''
      }
    },

    // Méthode pour trouver une victime par son slug
    findVictimeBySlug(slug: string) {
      // Si les victimes ne sont pas encore chargées, retourner undefined
      if (this.victimes.length === 0) return undefined
      
      // Fonction pour créer un slug à partir d'un nom
      const createSlug = (text: string) => {
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
      
      // Chercher la victime dont le slug correspond
      const foundVictime = this.victimes.find(victime => createSlug(victime.prenom_nom) === slug)
      
      // Log pour débogage
      console.log('Slug recherché:', slug)
      console.log('Victimes disponibles:', this.victimes.map(v => ({ nom: v.prenom_nom, slug: createSlug(v.prenom_nom) })))
      console.log('Victime trouvée:', foundVictime?.prenom_nom || 'Aucune')
      
      return foundVictime
    }
  }
}) 