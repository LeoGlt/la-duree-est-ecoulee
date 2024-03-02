<script setup>
    import {RouterLink} from "vue-router"
    const cardsFound = JSON.parse(localStorage.getItem("cardsFound"))
</script>

<template>
    <h1>Les scores de la manche 1</h1>
    <ul>
        <li>Equipe 1: {{ cardsFound[1].length }}</li>
        <li>Equipe 2: {{ cardsFound[2].length }}</li>
    </ul>
    <RouterLink to="/manche-2">Manche 2</RouterLink>

</template>