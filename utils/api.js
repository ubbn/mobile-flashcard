import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY'

export function retrieveDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
    res => {
      data = JSON.parse(res)
      return Object.values(data)
    })
}

export function addDeck({key, entry}) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: entry
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

      console.log(deck)
      data = {
        ...data,
        [title]: deck
      }
      
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })  
}

export function removeDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}