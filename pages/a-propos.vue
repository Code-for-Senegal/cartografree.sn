<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-12">
    <!-- Introduction -->

        <section class="space-y-4">
      <h2 class="text-2xl md:text-3xl font-medium text-white">À propos</h2>
      <div class="bg-gradient-to-br from-neutral-950 to-black/80 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] space-y-4">
        <p class="text-neutral-300 leading-relaxed">
          CartograFreeSenegal est une initiative citoyenne née au lendemain des soulèvements populaires de juin 2023, réunissant une quarantaine de journalistes, cartographes et spécialistes des données. Elle recense et documente les décès liés à la répression des manifestations politiques au Sénégal entre mars 2021 et février 2024. Par ce travail, CartograFreeSenegal cherche à dissiper la confusion autour du bilan humain des violences policières et à raconter l'histoire de leurs victimes.        </p>
      </div>
    </section>


    <!-- Section: Comment avons-nous procédé ? -->
    <section class="space-y-4">
      <h2 class="text-2xl md:text-3xl font-medium text-white">Comment avons-nous procédé ?</h2>
      <div class="bg-gradient-to-br from-neutral-950 to-black/80 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] space-y-4">
        <p class="text-neutral-300 leading-relaxed">
          Dans le feu de l'action, de nombreuses informations non vérifiées ont circulé sur les réseaux sociaux. En réponse, nous avons établi un lien sûr et direct avec les familles des victimes afin d'authentifier chaque décès. Pour chaque cas, au moins un journaliste a été chargé de la documentation, examinant les certificats d'autopsie, les éléments photos et vidéos, ainsi que les témoignages des proches, des témoins oculaires et du personnel médical. Nous avons également bénéficié de la collaboration d'Amnesty International pour ses données sur les décès antérieurs à juin 2023.     </p> </div>
    </section>

    <!-- Section: Comment utiliser les résultats de nos recherches ? -->
    <section class="space-y-4">
      <h2 class="text-2xl md:text-3xl font-medium text-white">Comment utiliser les résultats de nos recherches ?</h2>
      <div class="bg-gradient-to-br from-neutral-950 to-black/80 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-white/[0.05] space-y-4">
        <p class="text-neutral-300 leading-relaxed">
          Les données collectées sont accessibles en libre accès et mises à disposition de l'ensemble des médias et acteurs de la société civile. Nos cartes interactives, optimisées pour le web, offrent une analyse détaillée des circonstances des décès, enrichie de diverses informations sur l'identité des victimes.</p>
        <p class="text-neutral-300 leading-relaxed">
          Pour obtenir les données cartographiques, veuillez contacter : 
          <a href="mailto:freesenegalcarto@gmail.com" class="text-white hover:text-neutral-200 transition-colors underline">freesenegalcarto@gmail.com</a>
        </p>
      </div>
    </section>


  </div>
</template>

<script setup>
import { useHead } from 'unhead'

// Méta-tags SEO spécifiques à la page À propos
useHead({
  title: 'À propos - CartograFreeSenegal',
  meta: [
    { name: 'description', content: 'CartograFreeSenegal est une initiative citoyenne documentant les décès liés à la répression des manifestations politiques au Sénégal. Découvrez notre méthodologie et notre mission.' },
    { name: 'keywords', content: 'CartograFreeSenegal, initiative citoyenne, méthodologie, documentation, victimes, manifestations, Sénégal, témoignages' },
    
    // Open Graph / Facebook
    { property: 'og:title', content: 'À propos - CartograFreeSenegal' },
    { property: 'og:description', content: 'CartograFreeSenegal est une initiative citoyenne documentant les décès liés à la répression des manifestations politiques au Sénégal.' },
    { property: 'og:url', content: 'https://cartografree.sn/a-propos' },
    { property: 'og:type', content: 'website' },
    
    // Twitter
    { name: 'twitter:title', content: 'À propos - CartograFreeSenegal' },
    { name: 'twitter:description', content: 'CartograFreeSenegal est une initiative citoyenne documentant les décès liés à la répression des manifestations politiques au Sénégal.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://cartografree.sn/a-propos' }
  ]
})
</script> 