<script setup>
import { useRouter } from 'vue-router'
import RoundClock from './RoundClock.vue'
import RoundScores from './RoundScores.vue'
import RoundModif from './RoundModif.vue'

import { countCardsFound } from '@/components/cardsShown'
import { reactive, ref } from 'vue'
import { getDeck, shuffle } from './deck'
import storageInterface from '@/storage-interface'
import RoundHeader from '@/components/RoundHeader.vue'
import RoundCard from '@/components/RoundCard.vue'
import CheckSvg from '@/components/CheckSvg.vue'
import CrossSvg from '@/components/CrossSvg.vue'

const router = useRouter()

const props = defineProps({
  roundNumber: { type: Number, required: true }
})

/** Remaining cards to guess*/
let cards = getDeck()

/** Will contain cards found and not found by a team*/
let cardsShown = reactive([])

/** For each team, the number of cards they found */
const nbCardsFound = {
  1: 0,
  2: 0
}
const isPlaying = ref(true)
const timeIsRunning = ref(true)
const currentCard = ref(cards[0])
const nextCardIsDisabled = ref(false)

let currentTeam = ref(storageInterface.nextTeamToPlay)

/**
 * Returns the number of the next team
 * @returns {number} Number of the next team
 */
const getNextTeam = () => (currentTeam.value == 1 ? 2 : 1)

const nextCard = (found) => {
  cardsShown.push({ name: cards.shift(), found: found })

  if (cards.length === 0) {
    timeIsRunning.value = false
    isPlaying.value = false
  }

  currentCard.value = cards[0]
  nextCardIsDisabled.value = true

  setTimeout(() => (nextCardIsDisabled.value = false), 800)
}

const updateCardStatus = (cardShownIndex) => {
  cardsShown[cardShownIndex].found = !cardsShown[cardShownIndex].found
}

const reviewPreviousTurn = () => {
  const nbFound = countCardsFound(cardsShown)
  nbCardsFound[currentTeam.value] += nbFound

  /** Put cards not found back in the deck */
  const notFoundCards = cardsShown.filter((card) => !card.found).map((card) => card.name)
  cards = cards.concat(notFoundCards)
}

const changeRound = () => {
  storageInterface['nbCardsFound' + props.roundNumber] = nbCardsFound
  storageInterface.nextTeamToPlay = getNextTeam()
  router.push('/recap-manche-' + props.roundNumber)
}

const prepareNextTeamTurn = () => {
  cards = shuffle(cards)
  cardsShown = reactive([])
  currentTeam.value = getNextTeam()
  isPlaying.value = true
  currentCard.value = ''
}

const continueGame = () => {
  reviewPreviousTurn()

  if (cards.length === 0) {
    changeRound()
  }

  prepareNextTeamTurn()
}

const startClock = () => {
  timeIsRunning.value = true
  currentCard.value = cards[0]
}

const timeIsUp = () => {
  cardsShown.push({ name: cards.shift(), found: false })
  timeIsRunning.value = false
  isPlaying.value = false
}
</script>

<template>
  <round-header :roundNumber="props.roundNumber"></round-header>
  <template v-if="isPlaying">
    <round-clock :time-is-running="timeIsRunning" @on-time-is-up="timeIsUp" />
    <p class="team">Equipe {{ currentTeam }}</p>
    <round-card :current-card="currentCard"></round-card>
    <template v-if="timeIsRunning">
      <div class="next-card-container">
        <button
          class="next-card action success"
          :disabled="nextCardIsDisabled"
          @click="nextCard(true)"
        >
          <check-svg></check-svg>
        </button>
        <div v-if="props.roundNumber > 1">
          <button
            class="next-card action failure"
            :disabled="nextCardIsDisabled"
            @click="nextCard(false)"
          >
            <cross-svg></cross-svg>
        </button>
      </div>
    </div>
<!--    <round-scores-->
  <!--      v-if="currentTeam === 1"-->
  <!--      :score1="nbCardsFound[1] + countCardsFound(cardsShown)"-->
  <!--      :score2="nbCardsFound[2]"-->
  <!--    />-->
<!--    <round-scores-->
  <!--      v-else-->
  <!--      :score1="nbCardsFound[1]"-->
  <!--      :score2="nbCardsFound[2] + countCardsFound(cardsShown)"-->
  <!--    />-->
    </template>
    <template v-else>
      <button @click="startClock()">C'est parti !</button>
    </template>
  </template>

  <template v-else>
    <round-modif
      :cardsShown="cardsShown"
      :currentTeam="currentTeam"
      @change-card-status="updateCardStatus"
    />
    <button class="validate" @click="continueGame()">Valider</button>
  </template>
</template>

<style scoped  lang="scss">
@import '@/assets/main';
.next-card {
  font-size: 3rem;
  width: 100px;
  height: 100px;
}
.team {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 20px;
  color: $secondary-color;
}
.success,
.failure {
  color: white;
}

.success {
  background-color: $secondary-color;
}

.failure {
  background-color: $primary-color
}

button.action {
  border: none;
  width: 100px;
  height: 100px;
  border-radius: 300px;
  font-size: 4rem;
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

button.validate {
  width: 60%;
  height: 60px;
  font-size: 2rem;
  background-color: $secondary-color;
  margin-top: 40px;
  border-radius: 5px;
  color: white;
}

.clock {
  font-size: 3rem;
  font-size: 3rem;
  font-family: monospace;
  line-height: 0;
  color: $primary-color;
}

.next-card-container {
  display: flex;
  gap: 20px;
}
</style>
@/components/cardsShowned
