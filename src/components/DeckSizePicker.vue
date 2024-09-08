<script setup>
import { ref } from 'vue'
import CrossSvg from '@/components/Svg/CrossSvg.vue'
import LessSvg from '@/components/Svg/LessSvg.vue'

const emit = defineEmits(['changeDeckSize'])

const defaultDeckSize = +import.meta.env.VITE_DEFAULT_DECK_SIZE

emit('changeDeckSize', defaultDeckSize)
const deckSize = ref(defaultDeckSize)

function increment(value) {
  if(deckSize.value + value < 10) return
  if(deckSize.value + value > 50) return
  deckSize.value = deckSize.value + value
  emit('changeDeckSize', deckSize.value)
}
</script>

<template>
  <h3>Combien veux-tu de cartes ?</h3>
  <div class="container">
    <div class="decksize-actions">
      <button :disabled="deckSize === 50" @click="increment(10)"><cross-svg :style="{transform : 'rotate(-45deg)'}"></cross-svg></button>
      <span>{{deckSize}} cartes</span>
      <button :disabled="deckSize === 10"  @click="increment(-10)"><less-svg></less-svg></button>
    </div>
    <div class="card-container">
      <div  v-for="i in Math.floor(deckSize/10)" :key="i" class="card" ></div>
    </div>
  </div>
  <span v-if="deckSize === 10">&nbsp;&nbsp;Pour une partie rapidou 🐰</span>
  <span v-if="deckSize > 10 && deckSize < 50">&nbsp;&nbsp;</span>
  <span v-if="deckSize === 50">&nbsp;&nbsp;Pour les fadas 🤪</span>

</template>

<style scoped lang="scss">
@import '@/assets/main';

select {
  font-size: 2rem;
  text-align: center;
  min-width: 30%;
  max-width: 90%;
}
.decksize-actions {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  button {
    background-color: $secondary-color;
    font-size: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled {
      background-color: $grey;
    }
  }
}
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
}

.card-container {
  display:  grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(5, 5px);
  transition: grid-template-columns 0.5s;

  margin-top: 20px;
  height: 100%;
  position: relative;

  &:hover {
    grid-template-columns: repeat(5, 8px);
  }
}
.card {
  max-width: 40vh;
  max-height: 25vh;
  width: 60px;
  height: 100px;
  border-radius: 9px;
  position: relative;
  background: radial-gradient(83.31% 50.39% at 50% 49.74%, #fbd7c8 51%, #ee6123 100%);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
  transform: rotate(-25deg);
}
</style>
