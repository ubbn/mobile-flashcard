import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { retreiveDecks, addCard } from '../actions'
import * as Api from '../utils/api'
import TextBox from './UI/TextBox'
import CustomButton from './UI/CustomButton'

class NewCard extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  addNew = () => {
    const { question, answer } = this.state
    if (question.length === 0 || answer.length === 0)
      return

    Api.addCard(this.props.title, this.state)
    this.props.dispatch(addCard(this.props.title, this.state))

    this.inputAnswer.clear()
    this.inputQuestion.clear()
  }

  render(){  
    return (
      <View style={styles.container}>
        <TextBox 
          caption={'Enter question'} 
          style={styles.textBox} 
          onTextChanged={question => this.setState({question})}
          inputRef={ref => this.inputQuestion = ref}
        />
        <TextBox 
          caption={'Enter answer'} 
          style={styles.textBox}
          onTextChanged={answer => this.setState({answer})}
          inputRef={ref => this.inputAnswer = ref}
        />
        <CustomButton onPress={this.addNew} text={'Add card'}/>
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
      title
    }
  }
)(NewCard)
