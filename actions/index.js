import * as Api from '../utils/api'

export const RETREIVE_DECKS='RETREIVE_DECKS'
export const GET_DECK='GET_DECK'
export const ADD_DECK='ADD_DECK'
export const REMOVE_DECK='REMOVE_DECK'
export const ADD_QUESTION='ADD_QUESTION'
export const REMOVE_QUESTION='REMOVE_QUESTION'

export const retreiveDecks = (decks) => {
  return {
    type: RETREIVE_DECKS,
    decks
  }
}

export const getDeck = (title) => dispatch => {
  return Api.retrieveDecks().then(decks => {
    const deck = decks.find(x => x.title === title)
    return dispatch({
      type: GET_DECK,
      deck
    })
  })
}

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck
  }
}

