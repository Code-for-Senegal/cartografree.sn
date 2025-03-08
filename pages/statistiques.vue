<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-black to-neutral-950 space-y-4 p-2 md:p-6 md:mx-auto">
    <!-- En-tête -->
    <div>
      <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">Statistiques des victimes</h1>
      <p class="text-neutral-400 text-sm md:text-base">
        Statistique sur les victimes de la répression des manifestations politiques au Sénégal.
    <br>
    Mars 2021 - Février 2024  
    </p>
    </div>

    <!-- Loader -->
    <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] animate-pulse">
        <div class="h-6 bg-neutral-800 rounded-full w-1/3 mb-6"></div>
        <div class="aspect-[4/3] bg-neutral-800/50 rounded-xl"></div>
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="store.error" class="text-center py-12 text-red-400">
      {{ store.error }}
    </div>

    <!-- Contenu des statistiques -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Statistiques clés -->
      <div class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-2 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] md:col-span-2">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div class="bg-white/5 p-2 sm:p-4 rounded-xl">
            <h3 class="text-sm text-neutral-400 mb-1">Total victimes</h3>
            <p class="text-2xl md:text-3xl font-bold text-white">{{ store.totalVictimes }}</p>
          </div>
          <div class="bg-white/5 p-2 sm:p-4 rounded-xl">
            <h3 class="text-sm text-neutral-400 mb-1">Moyenne d'âge</h3>
            <p class="text-2xl md:text-3xl font-bold text-white">{{ store.moyenneAge }} ans</p>
          </div>
          <div class="bg-white/5 p-2 sm:p-4 rounded-xl">
            <h3 class="text-sm text-neutral-400 mb-1">Plus jeune</h3>
            <p class="text-2xl md:text-3xl font-bold text-white">{{ plusJeuneVictime.age }} ans</p>
            <p class="text-xs  mt-1 text-neutral-500">{{ plusJeuneVictime.nom }}</p>
          </div>
          <div class="bg-white/5 p-2 sm:p-4 rounded-xl">
            <h3 class="text-sm text-neutral-400 mb-1">Plus âgée</h3>
            <p class="text-2xl md:text-3xl font-bold text-white">{{ plusAgeVictime.age }} ans</p>
            <p class="text-xs mt-1 text-neutral-500">{{ plusAgeVictime.nom }}</p>
          </div>
        </div>
      </div>

      <!-- Répartition par région -->
      <div class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
        <h2 class="text-xl font-medium text-white mb-4">Répartition par région</h2>
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
      <div class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
        <h2 class="text-xl font-medium text-white mb-4">Répartition par année</h2>
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

      <!-- Évolution temporelle des victimes -->
      <div class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
        <h2 class="text-xl font-medium text-white mb-4">Évolution temporelle</h2>
        <div class="aspect-[4/3]">
          <LineChart 
            v-if="chartData.evolution.labels.length > 0"
            :chartData="chartData.evolution"
            :options="chartOptions.evolution"
          />
          <div v-else class="flex items-center justify-center h-full text-neutral-400">
            Aucune donnée disponible
          </div>
        </div>
      </div>

      <!-- Répartition par âge -->
      <div class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
        <h2 class="text-xl font-medium text-white mb-4">Répartition par âge</h2>
        <div class="aspect-[4/3]">
          <BarChart 
            v-if="chartData.ages.labels.length > 0"
            :chartData="chartData.ages"
            :options="chartOptions.ages"
          />
          <div v-else class="flex items-center justify-center h-full text-neutral-400">
            Aucune donnée disponible
          </div>
        </div>
      </div>

      <!-- Répartition par cause de décès -->
      <div class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
        <h2 class="text-xl font-medium text-white mb-4">Causes de décès</h2>
        <div class="aspect-[4/3]">
          <PieChart 
            v-if="chartData.causes.labels.length > 0"
            :chartData="chartData.causes"
            :options="chartOptions.causes"
          />
          <div v-else class="flex items-center justify-center h-full text-neutral-400">
            Aucune donnée disponible
          </div>
        </div>
      </div>

      <!-- Répartition par période de manifestation -->
      <div class="bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
        <h2 class="text-xl font-medium text-white mb-4">Répartition par période de manifestation</h2>
        <div class="aspect-[4/3]">
          <BarChart 
            v-if="chartData.periodes.labels.length > 0"
            :chartData="chartData.periodes"
            :options="chartOptions.periodes"
          />
          <div v-else class="flex items-center justify-center h-full text-neutral-400">
            Aucune donnée disponible
          </div>
        </div>
      </div>

      <!-- Répartition par profession -->
      <div class="hidden bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05]">
        <h2 class="text-xl font-medium text-white mb-4">Répartition par profession</h2>
        <div class="aspect-[4/3]">
          <BarChart 
            v-if="chartData.professions.labels.length > 0"
            :chartData="chartData.professions"
            :options="chartOptions.professions"
          />
          <div v-else class="flex items-center justify-center h-full text-neutral-400">
            Aucune donnée disponible
          </div>
        </div>
      </div>

      <!-- Graphique des professions les plus représentatives (style maquette) -->
      <div class="hidden bg-gradient-to-br from-neutral-950 to-black rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] md:col-span-2 mt-4">
        <h2 class="text-xl font-medium text-white mb-6">Professions les plus représentatives</h2>
        
        <div v-if="professionsLabels.length > 0" class="space-y-6">
          <div v-for="(profession, index) in professionsLabels" :key="profession" class="relative">
            <div class="flex items-center mb-2">
              <div class="text-4xl md:text-6xl font-bold" :style="`color: ${professionColors[index]}`">
                {{ professionsPourcentages[index] }}%
              </div>
              <div class="ml-4 text-xl md:text-2xl text-white">{{ profession }}</div>
            </div>
            <div class="h-8 bg-neutral-800 rounded-lg overflow-hidden w-full">
              <div class="h-full rounded-lg" 
                   :style="`width: ${professionsPourcentages[index]}%; background-color: ${professionColors[index]}`">
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-32 text-neutral-400">
          Aucune donnée disponible
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVictimesStore } from '~/stores/victimes'
import { DoughnutChart, BarChart, PieChart, LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { useHead } from 'unhead'

Chart.register(...registerables)

const store = useVictimesStore()

// Variables pour les pourcentages de professions (accessibles dans le template)
const professionsLabels = ref<string[]>([])
const professionsData = ref<number[]>([])
const professionsPourcentages = ref<number[]>([])

// Méta-tags SEO spécifiques à la page de statistiques
useHead({
  title: 'Statistiques des victimes - CartograFreeSenegal',
  meta: [
    { name: 'description', content: 'Statistiques détaillées sur les victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024. Analyses par région, âge, cause de décès et période.' },
    { name: 'keywords', content: 'statistiques, victimes, Sénégal, manifestations, répression, données, analyse, régions, âge, causes' },
    
    // Open Graph / Facebook
    { property: 'og:title', content: 'Statistiques des victimes - CartograFreeSenegal' },
    { property: 'og:description', content: 'Statistiques détaillées sur les victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024.' },
    { property: 'og:url', content: 'https://cartografree.sn/statistiques' },
    { property: 'og:type', content: 'website' },
    
    // Twitter
    { name: 'twitter:title', content: 'Statistiques des victimes - CartograFreeSenegal' },
    { name: 'twitter:description', content: 'Statistiques détaillées sur les victimes de la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://cartografree.sn/statistiques' }
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
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
]

// Couleurs pour les professions
const professionColors = [
  '#dc2626', // Rouge pour ouvriers/mécaniciens
  '#eab308', // Jaune pour élèves/étudiants
  '#16a34a'  // Vert pour commerçants
]

// Statistiques sur les victimes
const plusJeuneVictime = computed(() => {
  if (!store.victimes.length) return { age: '-', nom: '' }
  
  const victimesAvecAge = store.victimes
    .filter(v => v.age !== null && !isNaN(Number(v.age)))
    .sort((a, b) => (a.age || 0) - (b.age || 0))
  
  if (!victimesAvecAge.length) return { age: '-', nom: '' }
  
  return {
    age: victimesAvecAge[0].age,
    nom: victimesAvecAge[0].prenom_nom
  }
})

const plusAgeVictime = computed(() => {
  if (!store.victimes.length) return { age: '-', nom: '' }
  
  const victimesAvecAge = store.victimes
    .filter(v => v.age !== null && !isNaN(Number(v.age)))
    .sort((a, b) => (b.age || 0) - (a.age || 0))
  
  if (!victimesAvecAge.length) return { age: '-', nom: '' }
  
  return {
    age: victimesAvecAge[0].age,
    nom: victimesAvecAge[0].prenom_nom
  }
})

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
  
  // Évolution temporelle (cumulative)
  let cumulatif = 0
  const evolutionData = anneesLabels.map(annee => {
    cumulatif += anneesMap.get(annee)
    return cumulatif
  })
  
  // Répartition par âge
  const agesMap = new Map()
  const agesRanges = ['< 18', '18-25', '26-35', '36-45', '> 45']
  
  agesRanges.forEach(range => agesMap.set(range, 0))
  
  store.victimes.forEach(victime => {
    if (victime.age !== null && !isNaN(Number(victime.age))) {
      const age = Number(victime.age)
      let range = ''
      
      if (age < 18) range = '< 18'
      else if (age <= 25) range = '18-25'
      else if (age <= 35) range = '26-35'
      else if (age <= 45) range = '36-45'
      else range = '> 45'
      
      agesMap.set(range, agesMap.get(range) + 1)
    }
  })
  
  const agesLabels = agesRanges
  const agesData = agesLabels.map(range => agesMap.get(range))
  
  // Répartition par cause de décès
  const causesMap = new Map()
  store.victimes.forEach(victime => {
    if (victime.cause_mort) {
      let cause = victime.cause_mort.toLowerCase()
      
      if (cause.includes('balle')) cause = 'Balle'
      else if (cause.includes('torture')) cause = 'Torture'
      else if (cause.includes('noyade')) cause = 'Noyade'
      else cause = 'Autre'
      
      causesMap.set(cause, (causesMap.get(cause) || 0) + 1)
    }
  })
  
  const causesLabels = [...causesMap.keys()]
  const causesData = [...causesMap.values()]
  
  // Répartition par période de manifestation
  const periodes = ['mars 2021', 'juin 2022', 'mars-mai 2023', 'juin-août 2023', 'février 2024']
  const periodesMap = new Map()
  periodes.forEach(periode => periodesMap.set(periode, 0))

  // Fonction pour déterminer la période selon la date
  const getPeriode = (dateStr: string) => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = date.getMonth()

    if (year === 2021 && month === 2) { // Mars 2021
      return 'mars 2021'
    } else if (year === 2022 && month === 5) { // Juin 2022
      return 'juin 2022'
    } else if (year === 2023 && month >= 2 && month <= 4) { // Mars-Mai 2023
      return 'mars-mai 2023'
    } else if (year === 2023 && month >= 5 && month <= 7) { // Juin-Août 2023
      return 'juin-août 2023'
    } else if (year === 2024 && month === 1) { // Février 2024
      return 'février 2024'
    }
    return null
  }

  store.victimes.forEach(victime => {
    if (victime.date_mort) {
      const periode = getPeriode(victime.date_mort)
      if (periode) {
        periodesMap.set(periode, periodesMap.get(periode) + 1)
      }
    }
  })

  const periodesLabels = periodes
  const periodesData = periodes.map(periode => periodesMap.get(periode))
  
  // Répartition par profession
  const professionsMap = new Map()
  store.victimes.forEach(victime => {
    if (victime.profession) {
      let profession = victime.profession.toLowerCase().trim()
      
      // Regrouper les professions similaires
      if (profession.includes('mécanicien') || profession.includes('ouvrier') || profession.includes('technicien')) {
        profession = 'ouvriers/mécaniciens'
      } else if (profession.includes('élève') || profession.includes('étudiant')) {
        profession = 'élèves/étudiants'
      } else if (profession.includes('commerçant') || profession.includes('vendeur') || profession.includes('marchand')) {
        profession = 'commerçants'
      } else {
        profession = 'autres'
      }
      
      professionsMap.set(profession, (professionsMap.get(profession) || 0) + 1)
    } else {
      professionsMap.set('non spécifié', (professionsMap.get('non spécifié') || 0) + 1)
    }
  })

  // Calculer les pourcentages
  const totalVictimesAvecProfession = [...professionsMap.values()].reduce((a, b) => a + b, 0)
  const professionsWithPercentage = [...professionsMap.entries()].map(([profession, count]) => ({
    profession,
    count,
    percentage: Math.round((count / totalVictimesAvecProfession) * 1000) / 10 // Arrondi à 1 décimale
  }))

  // Trier par nombre décroissant et prendre les 3 premiers (ou moins s'il y en a moins)
  const topProfessions = professionsWithPercentage
    .filter(p => p.profession !== 'non spécifié' && p.profession !== 'autres')
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  // Mettre à jour les refs pour le template
  professionsLabels.value = topProfessions.map(p => p.profession)
  professionsData.value = topProfessions.map(p => p.count)
  professionsPourcentages.value = topProfessions.map(p => p.percentage)

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
    },
    evolution: {
      labels: anneesLabels,
      datasets: [{
        label: 'Nombre cumulé de victimes',
        data: evolutionData,
        borderColor: colors[2],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    ages: {
      labels: agesLabels,
      datasets: [{
        label: 'Nombre de victimes',
        data: agesData,
        backgroundColor: colors[1],
        borderWidth: 1
      }]
    },
    causes: {
      labels: causesLabels,
      datasets: [{
        data: causesData,
        backgroundColor: colors.slice(0, causesLabels.length),
        borderWidth: 1
      }]
    },
    periodes: {
      labels: periodesLabels,
      datasets: [{
        label: 'Nombre de victimes',
        data: periodesData,
        backgroundColor: [
          '#dc2626', // Rouge pour mars 2021
          '#2563eb', // Bleu pour juin 2022
          '#16a34a', // Vert pour mars-mai 2023
          '#eab308', // Jaune pour juin-août 2023
          '#9333ea'  // Violet pour février 2024
        ],
        borderWidth: 1
      }]
    },
    professions: {
      labels: professionsLabels.value,
      datasets: [{
        label: 'Nombre de victimes',
        data: professionsData.value,
        backgroundColor: [
          '#dc2626', // Rouge pour la première profession
          '#eab308', // Jaune pour la deuxième profession
          '#16a34a'  // Vert pour la troisième profession
        ],
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
  },
  evolution: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
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
  },
  ages: {
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
  },
  causes: {
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
  periodes: {
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
  },
  professions: {
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

// Charger les données au montage du composant
onMounted(async () => {
  if (store.victimes.length === 0) {
    await store.fetchVictimes()
  }
})
</script> 