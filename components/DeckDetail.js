import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckDetail extends React.Component {
  render(){
    
    return (
      <View>
        <Text>{this.props.title}</Text>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', {title: this.props.title})}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', {title: this.props.title})}>
          <Text>Add card</Text>
        </TouchableOpacity>        
      </View>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const { title } = navigation.state.params

  return {
    title,
    decks: state.decks
  }
}

export default connect(mapStateToProps)(DeckDetail)
