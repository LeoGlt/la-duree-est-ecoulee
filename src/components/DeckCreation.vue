<script setup>
import storageInterface from '@/storage-interface'
import { ref } from 'vue'
const customCards = ref([])
const currentSuggestion = ref('')

const addCustomCard = () => {
  console.log(currentSuggestion.value)
  customCards.value.push(currentSuggestion.value)
  currentSuggestion.value = ''
}

const initGame = (deck) => {
  storageInterface.cardsFound1 = undefined
  storageInterface.cardsFound2 = undefined
  storageInterface.cardsFound3 = undefined
  storageInterface.deck = deck
  storageInterface.nextTeamToPlay = 1
}
</script>

<template>
  <h2>{{ customCards.length }}/{{ storageInterface.deckSize }} mots</h2>
  <template v-if="customCards.length < storageInterface.deckSize">
    <input type="text" v-model="currentSuggestion" />
    <button @click="addCustomCard" :disabled="currentSuggestion === ''">Ajouter</button>
    <button class="secondary">Compléter le reste</button>
  </template>
  <template v-else>
    <RouterLink class="action" to="/cest-parti-pour-la-manche-1" @click="initGame(customCards)"
      >Démarrer la partie</RouterLink
    >
  </template>
</template>
