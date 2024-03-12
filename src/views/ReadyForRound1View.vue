<script setup>
import { initDeck } from '@/components/deck'
import { RouterLink } from 'vue-router'

localStorage.clear('cardsFound1')
localStorage.clear('cardsFound2')
localStorage.clear('cardsFound3')
initDeck(40) // TODO: move in an environment variable
localStorage.setItem('nextTeamToPlay', 1)
</script>

<template>
  <h1>Equipe 1</h1>
  <p>Voici les regles de la manche 1</p>
  <RouterLink class="action" to="/manche-1">L'équipe 1 commence !</RouterLink>
</template>
