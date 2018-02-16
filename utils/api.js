import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'Flashcard:DECK_STORAGE_KEY'

export function retrieveDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (typeof data === 'object' && data !== null)
        return Object.values(data) 
      return []
    })
}

export function addDeck(deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}

export function addCard(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      data = JSON.parse(results)
      deck = data[title]
      
      deck = {
        ...deck,
        questions: deck.questions.concat(card)
      }
      data = {
        ...data,
        [title]: deck
      }
      
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })  
}
