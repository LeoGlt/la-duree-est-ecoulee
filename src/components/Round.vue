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
const initialTime = 30;
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
        localStorage.setItem("cardsFound", JSON.stringify(cardsFound))
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
    <template v-if="clockIsRunning">
        <h1>Ceci est la manche {{ props.roundNumber }}</h1>
        <p>Equipe {{ currentTeam }}</p>
        <h2 class="clock">{{ remainingTime }} </h2>
        <h2 class="card">{{ currentCard }}</h2>
        <div class="next-card-container">

            <button class="next-card action success" @click="nextCard(true)">✔</button>
            <button class="next-card action failure" @click="nextCard(false)">×</button>
        </div>
        <div class="scores">
            <p class="score-1" :style="{ 'width': (20 + 10 * cardsFound[1].length) + 'px' }">
                {{ cardsFound[1].length }}
            </p>
            <p class="score-2" :style="{ 'width': (20 + 10 * cardsFound[2].length) + 'px' }">
                {{ cardsFound[2].length }}
            </p>
        </div>
    </template>

    <template v-else>
        <p>C'est au tour de l'équipe {{ currentTeam }}</p>
        <button @click="continueGame()">C'est parti !</button>
    </template>

</template>

<style scoped>
.next-card {
    font-size: 3rem;
    width: 100px;
    height: 100px;
}

.scores {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.scores p {
    text-align: center;
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
}

.score-1 {
    margin: 0;
    background-color: #FFCF00;
}

.score-2 {
    background-color: #00916e;
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
    width: 130px;
    height: 130px;
    border-radius: 298px;
    font-size: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 11px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.card {
    background-color: #FFCF00;
    color: #664a05;
    min-height: 100px;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.clock {
    font-size: 3rem;
    font-size: 3rem;
    font-family: monospace;
    line-height: 0;
    color: #ee6123;
}

.next-card-container {
    display: flex
}
</style>