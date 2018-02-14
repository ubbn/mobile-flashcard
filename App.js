import React, { Component } from 'react'
import { View, Text, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import reducer from './reducers'
import { purple, white, gray } from './utils/colors'
import DeckList from './components/DeckLists'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import NewCard from './components/NewCard'

const CustomStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
)

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
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
      title: 'Detail',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }    
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }    
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add a new card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }    
  }  
})

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={gray} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
