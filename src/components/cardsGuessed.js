/**
 * Returns the number of cards found in an array of cards guessed
 * @param {Array} array Array of cards guesses
 * @returns {Number} Number of cards found
 */
export const getNbCardsFound = (cardsGuessed) => {
  let nbFound = 0
  for (const card of cardsGuessed) {
    if (card.found) {
      nbFound += 1
    }
  }
  return nbFound
}
