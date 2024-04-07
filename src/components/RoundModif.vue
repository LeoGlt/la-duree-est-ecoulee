<script setup>
import { countCardsFound } from '@/components/cardsShown'

defineProps({
  cardsShown: { type: Array, required: true },
  currentTeam: { type: Number, required: true }
})

const emit = defineEmits(['changeCardStatus'])

const changeCardStatus = (cardShownIndex) => {
  emit('changeCardStatus', cardShownIndex)
}
</script>

<template>
  <h2>Equipe {{ currentTeam }}</h2>
  <h2>{{ countCardsFound(cardsShown) }} cartes trouvées</h2>
  <div class="card-guessed" v-for="(item, cardShownIndex) in cardsShown" :key="cardShownIndex">
    <button :class="{ found: item.found }" @click="changeCardStatus(cardShownIndex)">
      {{ item.found ? '✔ ' : '✗ ' }}{{ item.name }}
    </button>
  </div>
</template>

<style scoped>
.card-guessed button {
  width: 250px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.2rem;
  color: white;
}

button.found {
  background-color: #1bb116b2;
}

button:not(found) {
  background-color: #cd350b9e;
}
</style>
