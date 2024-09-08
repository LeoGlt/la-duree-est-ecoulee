import characters from '@/assets/cards.json'
import storageInterface from '@/storage-interface'
/**
 * Get deck from local storage and shuffle it
 * @returns {string[]} Shuffled deck
 */
export const getDeck = () => {
  return shuffle(storageInterface.deck)
}

/**
 * Initialize a deck by randomly selecting cards.
 * @param {number} deckSize Number of cards to put in the deck
 */
export const initDeck = (deckSize) => {
  const deck = shuffle(characters).splice(0, deckSize)
  return deck
}

/**
 * Shuffle an array
 * @template T
 * @param {Array.<T>} array Array to shuffle
 * @returns {Array.<T>} Shuffled array
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
