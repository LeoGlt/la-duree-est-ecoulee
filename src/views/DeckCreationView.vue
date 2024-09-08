<script setup>
import storageInterface from '@/storage-interface'
import { getRandomDeck, initGame } from '@/components/game'
import { ref } from 'vue'
import CardInput from '@/components/CardInput.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import HomeSvg from '@/components/Svg/HomeSvg.vue'
import MagicSvg from '@/components/Svg/MagicSvg.vue'

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
    currentSuggestion.value = customCards.value.pop()
  }
}

</script>

<template>
  <h1>La durée est écoulée</h1>
  <progress-bar
    :completed-value="storageInterface.deckSize"
    :current-value="customCards.length + randomCards.length"
  ></progress-bar>
  <template v-if="customCards.length < storageInterface.deckSize">
    <input type="text" v-model="currentSuggestion" />
    <div class="action-list">
      <button @click="addCustomCard" :disabled="currentSuggestion === ''" class="primary">+ Ajouter</button>
      <button @click="undo()" :disabled="customCards.length === 0" class="rounded">↩</button>
    </div>
    <button class="secondary" @click="fillDeckWithRandomCards"><magic-svg></magic-svg><span>Compléter le reste</span></button>
    <label for="allow-data-share">
      J'aide les créateurs de la durée est écoulée en leur transmettant mes idées de cartes
    </label>
    <input type="checkbox" v-model="dataSharingConsent" name="allow-data-share" />
  </template>
  <template v-else>
    <button @click="undo()">Annuler le dernier ↩</button>
    <RouterLink class="action" to="/cest-parti-pour-la-manche-1" @click="saveCustomCardAndInitGame">
      Démarrer la partie
    </RouterLink>
  </template>
</template>

<style scoped lang="scss">
@import '@/assets/main';


.action-list {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>