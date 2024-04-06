<script setup>
import storageInterface from '@/storage-interface'

const rules = {
  1: 'Tu peux dire tout ce que tu veux !',
  2: "Tu ne peux dire qu'un seul mot !",
  3: 'Tu dois mimer !'
}

defineProps({
  roundNumber: { type: Number, required: true }
})
</script>

<template>
  <h1>Manche {{ roundNumber }}</h1>
  <h2 class="rules">{{ rules[roundNumber] }}</h2>
  <RouterLink class="action" :to="'/manche-' + roundNumber"
    >L'équipe {{ storageInterface.nextTeamToPlay }} commence !</RouterLink
  >
</template>
