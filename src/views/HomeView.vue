<script setup>
import { RouterLink } from 'vue-router'
import { getRandomDeck, initGame } from '@/components/game'
import storageInterface from '@/storage-interface'
import DeckSizePicker from '../components/DeckSizePicker.vue'

let deckSize
</script>

<template>
  <img src="@/assets/logo.svg" alt="La durée est écoulée" />
  <h2>Faites 2 équipes !</h2>
  <DeckSizePicker @change-deck-size="(value) => (storageInterface.deckSize = value)" />
  <div>
    <RouterLink
      class="action primary"
      to="/cest-parti-pour-la-manche-1"
      @click="initGame(getRandomDeck(storageInterface.deckSize))"
    >
      Partie classique
    </RouterLink>
    <RouterLink class="action" to="/propose-tes-cartes">Propose tes cartes</RouterLink>
  </div>
</template>
