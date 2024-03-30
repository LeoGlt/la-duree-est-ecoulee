<script setup>
import { ref } from 'vue'

const initialTime = import.meta.env.VITE_INITIAL_TIME
let remainingTime = ref(initialTime)

const emit = defineEmits(['onTimeIsUp'])

setInterval(() => {
  if (remainingTime.value > 0) {
    remainingTime.value -= 1
  } else {
    emit('onTimeIsUp')
    //clockIsRunning.value = false
    //currentTeam.value = getNextTeam()
  }
}, 1000)
</script>

<template>
  <h2>{{ remainingTime }}</h2>
</template>
