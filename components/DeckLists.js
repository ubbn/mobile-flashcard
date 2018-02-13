import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { retreiveDecks } from '../actions'
import * as Api from '../utils/api'

class DeckLists extends React.Component {

  componentDidMount(){
    console.log('Didmount')
    Api.retrieveDecks().then(decks => {
      this.props.dispatch(retreiveDecks(decks))
    })
  }

  // clicked = () => {
  //   Api.retrieveDecks().then(decks => {
  //     this.props.dispatch(retreiveDecks(decks))
  //     console.log(decks.length)
  //     console.log(this.props.decks.length)
  //   })
  // }

  render (){
    return (
      <View>
        <Text>All my decks</Text>
        {!!this.props.decks && this.props.decks.map(x => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', {title: x.title})} key={x.title}>
            <Text>{x.title} {x.questions.length}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(DeckLists)