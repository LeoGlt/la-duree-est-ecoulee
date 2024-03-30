<script setup>
defineProps({
  score1: { type: Number, required: true },
  score2: { type: Number, required: true }
})
</script>

<template>
  <div class="scores">
    <p class="score-1" :style="{ width: 20 + 10 * score1 + 'px' }">
      {{ score1 }}
    </p>
    <p class="score-2" :style="{ width: 20 + 10 * score2 + 'px' }">
      {{ score2 }}
    </p>
  </div>
</template>

<style scoped>
.scores {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scores p {
  text-align: center;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
}

.score-1 {
  margin: 0;
  background-color: #ffcf00;
}

.score-2 {
  background-color: #00916e;
}

.score > div {
  width: 100%;
}
</style>
