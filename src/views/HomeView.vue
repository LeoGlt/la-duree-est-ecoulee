<script setup>
import { RouterLink } from 'vue-router'
import { getRandomDeck, initGame } from '@/components/game'
import storageInterface from '@/storage-interface'
import DeckSizePicker from '../components/DeckSizePicker.vue'

let deckSize
</script>

<template>
  <h1>La durée est écoulée</h1>
  <h2>Faites 2 équipes !</h2>

  <DeckSizePicker @change-deck-size="(value) => (storageInterface.deckSize = value)" />

  <RouterLink
    class="action primary"
    to="/cest-parti-pour-la-manche-1"
    @click="initGame(getRandomDeck(storageInterface.deckSize))"
  >
    Partie classique
  </RouterLink>
  <RouterLink class="action" to="/propose-tes-cartes">Propose tes cartes</RouterLink>
</template>
