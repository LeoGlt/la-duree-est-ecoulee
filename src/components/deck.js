import characters from '@/assets/cards.json'

export const getDeck = () => {
    return shuffle(JSON.parse(localStorage.getItem("deck")))
}

export const initDeck = (numberCards) => {
    const cards = shuffle(characters).splice(0, numberCards)
    localStorage.setItem("deck", JSON.stringify(cards))
}


const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

            // And swap it with the current element.
            ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
}

