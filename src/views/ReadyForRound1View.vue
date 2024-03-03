<script setup>
import { RouterLink } from 'vue-router'

localStorage.clear('cardsFound1')
localStorage.clear('cardsFound2')
localStorage.clear('cardsFound3')
</script>

<template>
  <h1>Equipe 1</h1>
  <p>Voici les regles de la manche 1</p>
  <RouterLink class="action" to="/manche-1">L'équipe 1 commence !</RouterLink>
</template>
