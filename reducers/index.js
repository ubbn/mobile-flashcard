import {
  RETREIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  REMOVE_DECK,
} from '../actions'

const initState = {
  decks: []
}

export default function decks(state=initState, action){
  switch (action.type) {
    case RETREIVE_DECKS:
      return {
        decks: action.decks
      }
    case ADD_DECK:
      return {
        decks: state.decks.concat(action.deck)
      }
    case ADD_CARD:
      let i = state.decks.findIndex(x => x.title === action.title)
      
      let deck = state.decks[i]
      deck = {
        ...deck,
        questions: deck.questions.concat(action.card)
      }
      
      const res = {
        decks: state.decks.slice(0,i).concat(deck).concat(state.decks.slice(i+1))
      }
      return res
    case REMOVE_DECK:
      return {
        state
      }
    default:
      return state
  }
}