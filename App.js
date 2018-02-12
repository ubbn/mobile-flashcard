import React, { Component } from 'react'
import { View, Text, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import { purple, white } from './utils/colors'
import DeckList from './components/DeckLists'
import NewDeck from './components/NewDeck'

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
    screen: NewDeck
  }
})

export default class App extends Component {
  render() {
    return (
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={purple} barStyle="light-content" />
          <Tabs />
        </View>
    )
  }
}
