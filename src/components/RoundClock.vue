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
        remainingTime.value -= 1
      } else {
        emit('onTimeIsUp')
      }
    }, 1000)
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
  <h2>{{ remainingTime }}</h2>
</template>
