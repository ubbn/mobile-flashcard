import React, { Component } from 'react'
import { View, Text, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from './reducers'
import { blue, white, darkBlue } from './utils/colors'
import DeckList from './components/DeckLists'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import NewCard from './components/NewCard'
import CustomStatusBar from './components/UI/CustomStatusBar'

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'Add Deck',
    }
  }
},
{
  navigationOptions: {
    header: null
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }    
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar bgColor={darkBlue} />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
