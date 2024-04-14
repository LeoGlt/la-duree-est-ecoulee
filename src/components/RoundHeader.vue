<script setup>
defineProps({
  roundNumber: { type: Number, required: true }
})
</script>

<template>
  <div class="round-header">
    <div class="round-header-item" :class="roundNumber == 1 ? 'active' : ''">
      {{ roundNumber == 1 ? 'Manche ' : '' }} 1
    </div>
    <div class="round-header-item" :class="roundNumber == 2 ? 'active' : ''">
      {{ roundNumber == 2 ? 'Manche ' : '' }}2
    </div>
    <div class="round-header-item" :class="roundNumber == 3 ? 'active' : ''">
      {{ roundNumber == 3 ? 'Manche ' : '' }} 3
    </div>
  </div>
</template>

<style scoped>
.round-header {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  gap: 1rem;
}
.round-header-item {
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  background: rgba(238, 97, 35, 0.4);
  width: 57px;
  height: 53px;
  flex-shrink: 0;
}
.round-header-item.active {
  background: #ee6123;
  width: 200px;
}
</style>
