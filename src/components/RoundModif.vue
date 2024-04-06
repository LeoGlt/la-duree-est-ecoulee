<script setup>
import { getNbCardsFound } from '@/components/cardsGuessed'

const props = defineProps({
  cardsGuessed: { type: Array, required: true },
  currentTeam: { type: Number, required: true }
})

const emit = defineEmits(['changeCardStatus'])

const changeCardStatus = (index) => {
  emit('changeCardStatus', { message: index })
}
</script>

<template>
  <h2>Equipe {{ currentTeam }}</h2>
  <h2>{{ getNbCardsFound(cardsGuessed) }} cartes trouvées</h2>
  <div class="card-guessed" v-for="(item, index) in cardsGuessed" :key="index">
    <button
      :class="{ found: item.found, 'not-found': !item.found }"
      @click="changeCardStatus(index)"
    >
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

button.not-found {
  background-color: #cd350b9e;
}
</style>
