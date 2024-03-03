<script setup>
import { computed } from "vue";
import {RouterLink} from "vue-router"

const props = defineProps({
    roundNumber: {type: Number, required: true}
})
const nextRoundNumber = computed(
    () => +props.roundNumber + 1
)

const getNumberCardsFound = (roundNumber, teamNumber) => {
    let cardsFound = JSON.parse(localStorage.getItem("cardsFound" + roundNumber))
    return cardsFound[teamNumber].length
}

</script>
<template>
    <h1>Scores</h1>
    <table >
    <thead>
        <tr>
        <th></th>
        <th>Equipe 1</th>
        <th>Equipe 2</th>
        </tr>
    </thead>
  <tbody>
    <tr v-for="i of [...Array(props.roundNumber).keys()]" :key="i">
        <th> Manche {{ i + 1 }}</th>
        <th> {{getNumberCardsFound(i+1, 1)}}</th>
        <th> {{getNumberCardsFound(i+1, 2)}}</th>
    </tr>
  </tbody>
    </table>

    <div v-if= "props.roundNumber < 3">
        <RouterLink :to="'/manche-' + nextRoundNumber">Manche {{ nextRoundNumber}}</RouterLink>
    </div>
</template>