import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'

import { addDeck, retreiveDecks } from '../actions'
import * as Api from '../utils/api'

class NewDeck extends React.Component {
  state = {
    text: ''
  }

  addNew = () => {
    const num = Math.random().toString(36)
    const obj = {key: num, entry: {title: num, questions: []}}
    Api.addDeck(obj)

    this.props.dispatch(addDeck(obj))
    console.log('addingnew')

    Api.retrieveDecks().then(decks => {
      this.props.dispatch(retreiveDecks(decks))
      console.log(decks)
    })    
  }

  render(){  
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity onPress={this.addNew}>
          <Text>ADDXX</Text>
        </TouchableOpacity>      
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...state
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     addNew: deck => dispatch(addDeck(deck))
//   }
// }

export default connect(mapStateToProps)(NewDeck)