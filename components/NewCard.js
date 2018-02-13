import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { addDeck, retreiveDecks } from '../actions'
import * as Api from '../utils/api'

class NewCard extends React.Component {
  addNew = () => {
    const obj = {
      question: 'Hello?', 
      answer: 'and you'
    }

    Api.addCard(this.props.title, obj)
    Api.retrieveDecks().then(decks => {
      this.props.dispatch(retreiveDecks(decks))
    })
  }

  render(){  
    return (
      <View>
        <Text>New card on {this.props.title}</Text>
        <TouchableOpacity onPress={this.addNew}>
          <Text>Add card</Text>
        </TouchableOpacity>      
      </View>
    );
  }
}

function mapStateToProps(state, { navigation}){
  const { title } = navigation.state.params

  return {
    title,
    decks: state.decks
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     addNew: deck => dispatch(addDeck(deck))
//   }
// }

export default connect(mapStateToProps)(NewCard)