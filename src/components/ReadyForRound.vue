<script setup>
import storageInterface from '@/storage-interface'
import RoundHeader from '@/components/RoundHeader.vue'

const rules = {
  1: 'Tu peux dire tout ce que tu veux, sauf une partie du mot !',
  2: "Tu ne peux dire qu'un seul mot !",
  3: 'Tu dois mimer !'
}

defineProps({
  roundNumber: { type: Number, required: true }
})
</script>

<template>
  <round-header :round-number="roundNumber"></round-header>
  <h1>Manche {{ roundNumber }}</h1>
  <h2 class="rules">{{ rules[roundNumber] }}</h2>
  <RouterLink class="action primary" :to="'/manche-' + roundNumber"
    >L'équipe {{ storageInterface.nextTeamToPlay }} commence !</RouterLink
  >
</template>
