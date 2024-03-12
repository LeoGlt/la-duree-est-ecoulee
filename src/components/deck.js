import characters from '@/assets/cards.json'

/**
 * Get deck from local storage and shuffle it
 * @returns {string[]} Shuffled deck
 */
export const getDeck = () => {
  return shuffle(JSON.parse(localStorage.getItem('deck')))
}

/**
 * Initialize a deck by randomly selecting cards, and store it in the local storage.
 * @param {number} numberCards Number of cards to put in the deck
 */
export const initDeck = (numberCards) => {
  const cards = shuffle(characters).splice(0, numberCards)
  localStorage.setItem('deck', JSON.stringify(cards))
}

/**
 * Shuffle an array
 * @param {Array<T>} array Array to shuffle
 * @returns {Array<T>} Shuffled array
 */
export const shuffle = (array) => {
    let copy = [...array]

    let currentIndex = copy.length,
        randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]]
  }

  return copy
}
