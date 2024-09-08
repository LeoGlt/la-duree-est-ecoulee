<script setup>
import storageInterface from '@/storage-interface'
import { getRandomDeck, initGame } from '@/components/game'
import { ref } from 'vue'
const customCards = ref([])
const currentSuggestion = ref('')

const addCustomCard = () => {
  customCards.value.push(currentSuggestion.value)
  currentSuggestion.value = ''
}
const fillDeckWithRandomCards = () => {
  const nbRemainingCards = storageInterface.deckSize - customCards.value.length
  const randomCards = getRandomDeck(nbRemainingCards)
  customCards.value = [...customCards.value, ...randomCards]
}
</script>

<template>
  <h2>{{ customCards.length }}/{{ storageInterface.deckSize }} mots</h2>
  <template v-if="customCards.length < storageInterface.deckSize">
    <input type="text" v-model="currentSuggestion" />
    <button @click="addCustomCard" :disabled="currentSuggestion === ''">Ajouter</button>
    <button class="secondary" @click="fillDeckWithRandomCards">Compléter le reste</button>
  </template>
  <template v-else>
    <RouterLink class="action" to="/cest-parti-pour-la-manche-1" @click="initGame(customCards)"
      >Démarrer la partie</RouterLink
    >
  </template>
</template>
