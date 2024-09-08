<script setup>
const emit = defineEmits(['changeDeckSize'])

const defaultDeckSize = +import.meta.env.VITE_DEFAULT_DECK_SIZE

emit('changeDeckSize', defaultDeckSize)
</script>

<template>
  <h2>Combien veux-tu de cartes ?</h2>
  <select @change="(event) => emit('changeDeckSize', event.target.value)">
    <option v-for="i in 9" :key="i" :value="5 + 5 * i" :selected="5 + 5 * i === defaultDeckSize">
      {{ 5 + 5 * i }}
      <span v-if="5 + 5 * i === 10">&nbsp;&nbsp;Pour une partie rapidou 🐰</span>
      <span v-if="5 + 5 * i === 50">&nbsp;&nbsp;Pour les fadas 🤪</span>
    </option>
  </select>
</template>

<style scoped>
select {
  font-size: 2rem;
  text-align: center;
  min-width: 30%;
  max-width: 90%;
}
</style>
