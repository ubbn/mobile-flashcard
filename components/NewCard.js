import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { retreiveDecks } from '../actions'
import * as Api from '../utils/api'
import TextBox from './UI/TextBox'
import CustomButton from './UI/CustomButton'

class NewCard extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  addNew = () => {
    Api.addCard(this.props.title, this.state)
    Api.retrieveDecks().then(decks => {
      this.props.dispatch(retreiveDecks(decks))
    })
  }

  render(){  
    return (
      <View style={styles.container}>
        <TextBox 
          caption={'Question'} 
          style={styles.textBox} 
          onTextChanged={question => this.setState({question})}
        />
        <TextBox 
          caption={'Answer'} 
          style={styles.textBox}
          onTextChanged={answer => this.setState({answer})}
        />
        <CustomButton onPress={this.addNew} text={'Add'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  textBox: {
    width: 250
  }
})

export default connect(
  (state, { navigation}) => {
    const { title } = navigation.state.params
  
    return {
      title,
      decks: state.decks
    }
  }
)(NewCard)
