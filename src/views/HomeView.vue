<script setup>
import { RouterLink } from 'vue-router'
import { initDeck } from '@/components/deck'
import storageInterface from '@/storage-interface'
import DeckSizePicker from '../components/DeckSizePicker.vue'

let deckSize

const initGame = () => {
  storageInterface.cardsFound1 = undefined
  storageInterface.cardsFound2 = undefined
  storageInterface.cardsFound3 = undefined
  initDeck(deckSize)
  storageInterface.nextTeamToPlay = 1
}
</script>

<template>
  <h1>La durée est écoulée</h1>
  <h2>Faites 2 équipes !</h2>

  <DeckSizePicker @change-deck-size="(value) => (deckSize = value)" />

  <RouterLink class="action" to="/cest-parti-pour-la-manche-1" @click="initGame">Jouer</RouterLink>
</template>
