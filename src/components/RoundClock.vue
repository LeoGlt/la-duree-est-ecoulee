<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  timeIsRunning: { type: Boolean, required: true }
})

const timeIsRunningRef = ref(props.timeIsRunning)

const initialTime = import.meta.env.VITE_INITIAL_TIME
let remainingTime = ref(initialTime)

const emit = defineEmits(['onTimeIsUp'])

const launchClockIfTimeIsRunning = () => {
  if (timeIsRunningRef.value) {
    setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value -= 0.03
      } else {
        emit('onTimeIsUp')
      }
    }, 30)
  }
}

launchClockIfTimeIsRunning()

watch(
  () => props.timeIsRunning,
  (timeIsRunning) => {
    timeIsRunningRef.value = timeIsRunning
    launchClockIfTimeIsRunning()
  }
)
</script>

<template>
  <div
    class="pie"
    :style="{
      'background-image':
        'conic-gradient(rgba(238, 97, 35, 0.4) ' +
        (remainingTime / initialTime) * 100 +
        '%, transparent ' +
        (remainingTime / initialTime) * 100 +
        '% 100%)'
    }"
    data-time="remainingTime"
  >
    <div>{{ Math.ceil(remainingTime) }}</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main';
.pie {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  transition: background-image 1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $background-color;
    font-weight: 700;
    font-size: 2rem;
    color: $primary-light;
    position: absolute;
  }
}
</style>
