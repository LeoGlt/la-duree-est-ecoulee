<script setup>
const props = defineProps({
  currentValue: { type: Number, required: true },
  completedValue: { type: Number, required: true }
})
</script>

<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: (currentValue / completedValue) * 100 + '%' }">
      <div class="text text-min" v-if="currentValue > completedValue / 2">
        {{ currentValue }} / {{ completedValue }} mots
      </div>
    </div>
    <div class="text text-50-max" v-if="currentValue <= completedValue / 2">
      {{ currentValue }} / {{ completedValue }} mots
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main';
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $primary-color;
  font-size: 1.25rem;
  font-weight: 700;
  &-min {
    color: white;
  }
}
.progress-bar {
  width: 90%;
  height: 40px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
  container-type: inline-size;
  display: flex;
  justify-content: flex-start;
  font-size: 1.5rem;
  font-weight: 700;
  gap: 1rem;
  background-color: white;
  border-radius: 5px;
  padding: 3px;
}
.progress {
  background-color: $primary-color;
  border-radius: 5px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
