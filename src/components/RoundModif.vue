<script setup>
import { countCardsFound } from '@/components/cardsShown'
import CrossSvg from '@/components/Svg/CrossSvg.vue'
import CheckSvg from '@/components/Svg/CheckSvg.vue'

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
  <h2 class="team">Equipe {{ currentTeam }}</h2>
  <h2>{{ countCardsFound(cardsShown) }} cartes trouvées</h2>
  <div class="card-guessed" v-for="(item, cardShownIndex) in cardsShown" :key="cardShownIndex">
    <button :class="{ found: item.found }" @click="changeCardStatus(cardShownIndex)">
      <template v-if="item.found">
        <CheckSvg />
      </template>
      <template v-else>
        <CrossSvg />
      </template>
      <div class="inner-card-guessed">
        {{ item.name }}
      </div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main';

.team {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: $secondary-color;
}
.inner-card-guessed {
  font-size: 1.5rem;
  font-weight: 700;
  background-color: white;
  border-radius: 5px;
  width: calc(100% - 20px);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 300px;
  padding: 10px;
  svg {
    margin: 0 auto;
    width: 50px;
  }
}

button.found {
  background-color: $secondary-color;
  .inner-card-guessed {
    color: $secondary-color;
  }
}

button:not(.found) {
  background-color: $primary-color;
  .inner-card-guessed {
    color: $primary-color;
  }
}
</style>
