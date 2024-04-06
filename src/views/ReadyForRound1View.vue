<script setup>
import { initDeck } from '@/components/deck'
import storageInterface from '@/storage-interface'
import { RouterLink } from 'vue-router'

storageInterface.cardsFound1 = undefined
storageInterface.cardsFound2 = undefined
storageInterface.cardsFound3 = undefined
initDeck(import.meta.env.VITE_DECK_SIZE)
localStorage.nextTeamToPlay = 1
</script>

<template>
  <h1>Equipe 1</h1>
  <p>Voici les regles de la manche 1</p>
  <RouterLink class="action" to="/manche-1">L'équipe 1 commence !</RouterLink>
</template>
