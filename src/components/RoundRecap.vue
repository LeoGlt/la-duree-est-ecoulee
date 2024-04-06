<script setup>
import storageInterface from '@/storage-interface';
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  roundNumber: { type: Number, required: true }
})
const nextRoundNumber = computed(() => +props.roundNumber + 1)

const getNumberCardsFound = (roundNumber, teamNumber) => {
  let nbCardsFound = storageInterface['nbCardsFound' + roundNumber]
  return nbCardsFound[teamNumber]
}

const getWinnerStr = () => {
  let nbFound1 = 0
  let nbFound2 = 0
  for (let i = 1; i <= 3; i++) {
    let nbCardsFound = storageInterface['nbCardsFound' + i]
    nbFound1 += nbCardsFound[1]
    nbFound2 += nbCardsFound[2]
  }
  if (nbFound1 > nbFound2) {
    return "L'équipe 1 a gagné !"
  } else if (nbFound1 < nbFound2) {
    return "L'équipe 2 a gagné !"
  } else {
    return 'Il y a égalité !'
  }
}
</script>

<template>
  <h1>Scores</h1>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Equipe 1</th>
        <th>Equipe 2</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i of [...Array(props.roundNumber).keys()]" :key="i">
        <th>Manche {{ i + 1 }}</th>
        <th>{{ getNumberCardsFound(i + 1, 1) }}</th>
        <th>{{ getNumberCardsFound(i + 1, 2) }}</th>
      </tr>
    </tbody>
  </table>

  <div v-if="props.roundNumber < 3">
    <RouterLink :to="'/manche-' + nextRoundNumber">Manche {{ nextRoundNumber }}</RouterLink>
  </div>
  <template v-else>
    <h2>{{ getWinnerStr() }}</h2>
    <RouterLink class="action" to="/">Accueil</RouterLink>
  </template>
</template>
