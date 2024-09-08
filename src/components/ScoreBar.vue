<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Array, required: true },
  total: { type: Number, required: true },
  color: { type: String, required: true }
})
const scoreTotal = computed(() => props.score.reduce((acc, val) => acc + val, 0))
</script>

<template>
  <div class="score-bar-container">
    <div
      :style="{ width: (scoreTotal / $props.total) * 100 + '%' }"
      class="score-bar"
      :class="{ primary: color === 'primary' }"
    >
      <div class="score-bar-text">
        {{ scoreTotal }} <span class="score-bar-point"> points </span>
      </div>
    </div>
    <span class="score-bar-details" v-if="$props.score.length > 1"
      >({{ $props.score.join(' + ') }})</span
    >
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main';

.score-bar-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem;
}
.score-bar {
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
  container-type: inline-size;
  display: flex;
  justify-content: space-around;
  font-size: 1.5rem;
  font-weight: 700;
  gap: 1rem;
  background-color: $secondary-color;
  border-radius: 5px;
  &.primary {
    background-color: $primary-color;
  }
}
@container (max-width: 100px) {
  .score-bar-point {
    display: none;
  }
}

.score-bar-text {
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9px;
  height: 53px;
  flex-shrink: 0;
}
</style>
