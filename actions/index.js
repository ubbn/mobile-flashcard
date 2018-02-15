import * as Api from '../utils/api'

export const RETREIVE_DECKS='RETREIVE_DECKS'
export const GET_DECK='GET_DECK'
export const ADD_DECK='ADD_DECK'
export const REMOVE_DECK='REMOVE_DECK'
export const ADD_CARD='ADD_CARD'
export const REMOVE_QUESTION='REMOVE_QUESTION'

export const retreiveDecks = (decks) => {
  return {
    type: RETREIVE_DECKS,
    decks
  }
}

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck
  }
}

export const addCard = (title, card) => {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

