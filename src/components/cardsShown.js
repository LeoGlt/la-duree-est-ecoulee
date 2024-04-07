/**
 * A la durée est écoulée card.
 * @typedef {Object} Card
 * @property {String} name - Name of the card (character or object to guess)
 * @property {boolean} found - Wether the card was found
 */


/**
 * Returns the number of cards found in an array of cards guessed
 * @param {Array.<Card>} cardsShown Array of cards guesses
 * @returns {Number} Number of cards found
 */
export const countCardsFound = (cardsShown) => cardsShown.filter((card) => card.found).length
