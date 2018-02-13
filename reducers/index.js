import {
  RETREIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
} from '../actions'

const initState = {
  decks: [],
  currectDeck: {}
}

export default function decks(state=initState, action){
  //console.log(action)
  switch (action.type) {
    case RETREIVE_DECKS:
      return {
        decks: action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case REMOVE_DECK:
      //state.filter(x => x)
      return {
        state
      }
    default:
      return state
  }
}