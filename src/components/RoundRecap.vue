<script setup>
import { computed } from "vue";
import {RouterLink} from "vue-router"
const cardsFound = JSON.parse(localStorage.getItem("cardsFound"))

const props = defineProps({
    roundNumber: {type: Number, required: true}
})
const nextRoundNumber = computed(
    () => +props.roundNumber + 1
)

</script>

<template>
    <h1>Les scores de la manche {{ props.roundNumber }}</h1>
    <ul>
        <li>Equipe 1: {{ cardsFound[1].length }}</li>
        <li>Equipe 2: {{ cardsFound[2].length }}</li>
    </ul>
    <RouterLink :to="'/manche-' + nextRoundNumber">Manche {{ nextRoundNumber}}</RouterLink>
</template>