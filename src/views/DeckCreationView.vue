<script setup>
import storageInterface from '@/storage-interface'
import { getRandomDeck, initGame } from '@/components/game'
import { ref } from 'vue'
import { addWordsToDB } from '@/components/firestore'
const customCards = ref([])
const randomCards = ref([])
const currentSuggestion = ref('')
const dataSharingConsent = ref(true)

const addCustomCard = () => {
  customCards.value.push(currentSuggestion.value)
  currentSuggestion.value = ''
}
const fillDeckWithRandomCards = () => {
  const nbRemainingCards = storageInterface.deckSize - customCards.value.length
  randomCards.value = getRandomDeck(nbRemainingCards)
}

const saveCustomCardAndInitGame = () => {
  initGame([...customCards.value, ...randomCards.value])
  if (dataSharingConsent.value) {
    addWordsToDB(customCards.value)
  }
}
const undo = () => {
  if (randomCards.value.length) {
    randomCards.value = []
  } else {
    customCards.value.pop()
  }
}
</script>

<template>
  <h1>La durée est écoulée</h1>
  <h2>{{ customCards.length + randomCards.length }}/{{ storageInterface.deckSize }} mots</h2>
  <template v-if="customCards.length + randomCards.length < storageInterface.deckSize">
    <input type="text" v-model="currentSuggestion" />
    <button @click="addCustomCard" :disabled="currentSuggestion === ''">Ajouter</button>
    <button @click="undo" :disabled="customCards.length === 0">↩</button>
    <button class="secondary" @click="fillDeckWithRandomCards">Compléter le reste</button>
    <label for="allow-data-share">
      J'aide les créateurs de la durée est écoulée en leur transmettant mes idées de cartes
    </label>
    <input type="checkbox" v-model="dataSharingConsent" name="allow-data-share" />
  </template>
  <template v-else>
    <button @click="undo">↩</button>
    <RouterLink class="action" to="/cest-parti-pour-la-manche-1" @click="saveCustomCardAndInitGame">
      Démarrer la partie
    </RouterLink>
  </template>
</template>
