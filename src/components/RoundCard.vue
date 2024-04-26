<script setup>
defineProps({
  currentCard: { type: String, required: true }
})
</script>

<template>
  <div class="card">
    <div class="inner-card" v-if="currentCard">
      {{ currentCard }}
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40vh;
  max-height: 20vh;
  width: 80%;
  height: 200px;
  border-radius: 9px;
  background: radial-gradient(83.31% 50.39% at 50% 49.74%, #fbd7c8 51%, #ee6123 100%);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
  font-weight: 700;
}
.inner-card {
  border-radius: 9px;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  background-color: #ffffff;
  max-width: calc(550px - 2rem);
  max-height: calc(300px - 2rem);
  text-align: center;
}
</style>
