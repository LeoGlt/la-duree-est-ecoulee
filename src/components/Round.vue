<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import characters from '@/assets/cards.json'
const router = useRouter()

const props = defineProps(
    {
        roundNumber: { type: Number, required: true }
    }
)

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const cards = shuffle(characters).splice(0, 5)

const cardsFound = {
    1: [],
    2: [],
};
const initialTime = 1000;
const clockIsRunning = ref(true)
const currentCard = ref(cards[0])

let currentTeam = ref(1)
let remainingTime = ref(initialTime);

const nextCard = (found) => {
    if (found) {
        cardsFound[currentTeam.value].push(cards.shift())
    } else {
        cards.push(cards.shift(cardsFound))
    }
    console.log({ cardsFound, cards })

    if (cards.length === 0) {
        localStorage.setItem("cardsFound" + props.roundNumber, JSON.stringify(cardsFound))
        router.push("/recap-manche-" + props.roundNumber)
    }

    currentCard.value = cards[0]
}

const continueGame = () => {
    remainingTime.value = initialTime;
    clockIsRunning.value = true;
}

setInterval(() => {
    if (clockIsRunning.value) {
        if (remainingTime.value > 0) {
            remainingTime.value -= 1;
        } else {
            clockIsRunning.value = false;
            currentTeam.value = currentTeam.value == 1 ? 2 : 1
        }
    }

}, 1000);

</script>

<template>
    <div v-if="clockIsRunning">
        <h1>Ceci est la manche {{ props.roundNumber }}</h1>
        <p>Equipe {{ currentTeam }}</p>
        <h2>{{ remainingTime }} </h2>
        <h2>{{ currentCard }}</h2>
        <button class="next-card action success" @click="nextCard(true)">✔</button>
        <div v-if= "props.roundNumber > 1">
            <button class="next-card action failure" @click="nextCard(false)">×</button>
        </div>
        <div class="scores">
            <div class="score">
                <p>{{ cardsFound[1].length }}</p>
                <div :style="{ 'height': (10 * cardsFound[1].length) + 'px', 'background-color': 'blue' }"></div>
            </div>
            <div class="score">
                <p>{{ cardsFound[2].length }}</p>
                <div :style="{ 'height': (10 * cardsFound[2].length) + 'px', 'background-color': 'pink' }"></div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>C'est au tour de l'équipe {{ currentTeam }}</p>
        <button @click="continueGame()">C'est parti !</button>
    </div>

</template>

<style scoped>
.next-card {
    font-size: 3rem;
    width: 100px;
    height: 100px;
}

.scores {
    display: flex;
    align-items: flex-end;
}

.score {
    min-width: 50px;
}

.score>div {
    width: 100%;
}

.success,
.failure {
    color: white;
}

.success {
    background-color: #00916e;
}

.failure {
    background-color: #fa003f;
}

button.action {
    border: none;
    border-radius: 298px;
    font-size: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>