import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const DeckLists = (props) => {
  return (
    <View>
      <Text>All decks</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('DeckDetail')}>
        <Text>Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DeckLists