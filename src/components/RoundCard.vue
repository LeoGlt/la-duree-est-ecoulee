<script setup>

defineProps({
  currentCard: { type: String, required: true },
})
</script>

<template>
  <div class="card">
    <div class="inner-card">
      {{ currentCard }}
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 550px;
  max-height: 300px;
  width: 100%;
  height: 250px;
  border-radius: 9px;
  background: radial-gradient(83.31% 50.39% at 50% 49.74%, #FBD7C8 51%, #EE6123 100%);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);:
  font-weight: 700;
}
.inner-card {
  border-radius: 9px;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  background-color: #ffffff;
  max-width: calc(550px - 2rem);
  max-height: calc(300px - 2rem);
}
</style>
