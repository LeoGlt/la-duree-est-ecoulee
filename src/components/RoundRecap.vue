<script setup>
import storageInterface from '@/storage-interface'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import RoundHeader from '@/components/RoundHeader.vue'
import ScoreBar from '@/components/ScoreBar.vue'

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

console.log('coucou')

const team1Score = [...Array(props.roundNumber).keys()].map((i) => getNumberCardsFound(i + 1, 1))
const team2Score = [...Array(props.roundNumber).keys()].map((i) => getNumberCardsFound(i + 1, 2))
const totalScore =
  team1Score.reduce((acc, val) => acc + val, 0) + team2Score.reduce((acc, val) => acc + val, 0)
</script>

<template>
  <round-header :roundNumber="props.roundNumber"></round-header>
  <h1>Scores</h1>
  <div class="score-bar-list">
    <h2>Equipe 1</h2>
    <score-bar color="primary" :score="team1Score" :total="totalScore"></score-bar>
    <h2>Equipe 2</h2>
    <score-bar color="secondary" :score="team2Score" :total="totalScore"></score-bar>
  </div>
  <div v-if="props.roundNumber < 3">
    <RouterLink class="action" :to="'/cest-parti-pour-la-manche-' + nextRoundNumber"
      >Manche {{ nextRoundNumber }}</RouterLink
    >
  </div>
  <template v-else>
    <h2>{{ getWinnerStr() }}</h2>
    <RouterLink class="action" to="/">Accueil</RouterLink>
  </template>
</template>

<style scoped lang="scss">
@import '@/assets/main';
.score-bar-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
h2 {
  text-align: center;
  color: $secondary-color;
  margin: 0;
}
</style>
