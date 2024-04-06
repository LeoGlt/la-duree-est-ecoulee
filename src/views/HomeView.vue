<script setup>
import { RouterLink } from 'vue-router'
import { initDeck } from '@/components/deck'
import storageInterface from '@/storage-interface'

const initGame = () => {
  storageInterface.cardsFound1 = undefined
  storageInterface.cardsFound2 = undefined
  storageInterface.cardsFound3 = undefined
  initDeck(import.meta.env.VITE_DECK_SIZE)
  storageInterface.nextTeamToPlay = 1
}
</script>

<template>
  <h1>La durée est écoulée</h1>
  <h2>Faites 2 équipes</h2>
  <RouterLink class="action" to="/cest-parti-pour-la-manche-1" @click="initGame">Jouer</RouterLink>
</template>
