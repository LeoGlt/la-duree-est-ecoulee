<script setup>
import { useRouter } from 'vue-router'
import RoundClock from './RoundClock.vue'
import RoundScores from './RoundScores.vue'

import { ref } from 'vue'
import { getDeck, shuffle } from './deck'

const router = useRouter()

const props = defineProps({
  roundNumber: { type: Number, required: true }
})

/** Remaining cards to guess*/
let cards = getDeck()

/** */
let cardsFound = []
let cardsNotFound = []

/** For each team, the number of cards they found */
const nbCardsFound = {
  1: 0,
  2: 0
}
const timeIsRunning = ref(true)
const currentCard = ref(cards[0])
const nextCardIsDisabled = ref(false)

let currentTeam = ref(+localStorage.getItem('nextTeamToPlay'))

/**
 * Returns the number of the next team
 * @returns {number} Number of the next team
 */
const getNextTeam = () => (currentTeam.value == 1 ? 2 : 1)

const nextCard = (found) => {
  if (found) {
    nbCardsFound[currentTeam.value] += 1
    cardsFound.push(cards.shift())
  } else {
    const notFound = cards.shift()
    cardsNotFound.push(notFound)
    cards.push(notFound)
  }

  if (cards.length === 0) {
    localStorage.setItem('nbCardsFound' + props.roundNumber, JSON.stringify(nbCardsFound))
    localStorage.setItem('nextTeamToPlay', getNextTeam())
    router.push('/recap-manche-' + props.roundNumber)
  }

  currentCard.value = cards[0]
  nextCardIsDisabled.value = true

  setTimeout(() => (nextCardIsDisabled.value = false), 800)
}

const continueGame = () => {
  timeIsRunning.value = true
  cards = shuffle(cards)
  nextCard(false)
}

const timeIsUp = () => {
  timeIsRunning.value = false
  currentTeam.value = getNextTeam()
}
</script>

<template>
  <template v-if="timeIsRunning">
    <h1>Ceci est la manche {{ props.roundNumber }}</h1>
    <p>Equipe {{ currentTeam }}</p>
    <round-clock @on-time-is-up="timeIsUp" />
    <h2 class="card">{{ currentCard }}</h2>
    <div class="next-card-container">
      <button
        class="next-card action success"
        :disabled="nextCardIsDisabled"
        @click="nextCard(true)"
      >
        ✔
      </button>
      <div v-if="props.roundNumber > 1">
        <button
          class="next-card action failure"
          :disabled="nextCardIsDisabled"
          @click="nextCard(false)"
        >
          ×
        </button>
      </div>
    </div>
    <round-scores :score1="nbCardsFound[1]" :score2="nbCardsFound[2]" />
  </template>

  <template v-else>
    <p>C'est au tour de l'équipe {{ currentTeam }}</p>
    <button @click="continueGame()">C'est parti !</button>
  </template>
</template>

<style scoped>
.next-card {
  font-size: 3rem;
  width: 100px;
  height: 100px;
}

.success,
.failure {
  color: white;
}

.success {
  background-color: #00916e;
}

.failure {
  background-color: #fa003f;
}

button.action {
  border: none;
  width: 130px;
  height: 130px;
  border-radius: 298px;
  font-size: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 11px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

button.action:disabled {
  opacity: 0.5;
}

.card {
  background-color: #ffcf00;
  color: #664a05;
  min-height: 100px;
  min-width: 80%;
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.clock {
  font-size: 3rem;
  font-size: 3rem;
  font-family: monospace;
  line-height: 0;
  color: #ee6123;
}

.next-card-container {
  display: flex;
}
</style>
