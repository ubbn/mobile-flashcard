import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { retreiveDecks } from '../actions'
import { gray } from '../utils/colors'
import * as Api from '../utils/api'

class DeckLists extends React.Component {
  componentDidMount(){
    Api.retrieveDecks().then(decks => {
      this.props.dispatch(retreiveDecks(decks))
    })
  }

  renderDeck = ({ item } ) => {
    const { title, questions } = item
    const cards = questions.length
    return (
      <TouchableOpacity style={styles.deck}
        onPress={() => this.props.navigation.navigate('DeckDetail', {title, cards})}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{cards} cards</Text>
      </TouchableOpacity>
    )
  }

  render (){
    if (this.props.decks.length === 0){
      return (
        <View>
          <Text>No decks to show</Text>
        </View>
      )
    }

    return (
      <View>
        <FlatList 
          data={this.props.decks}
          renderItem={this.renderDeck}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    margin: 15,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    paddingTop: 20,
  },
  subTitle: {
    paddingBottom: 20,
    fontSize: 14,
    color: gray
  }
})


export default connect(
  state => ({
    decks: state.decks
  })
)(DeckLists)