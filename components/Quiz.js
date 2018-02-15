import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { blue, white } from '../utils/colors'
import CustomButton from './UI/CustomButton'
import * as Api from '../utils/api'

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    score: 0,
    showAnswer: false
  }

  showAnswer = () => {
    this.setState({showAnswer: true})
  }

  goNext = (score) => {
    this.setState(state => ({
      currentQuestion: state.currentQuestion + 1,
      showAnswer: false,
      score: state.score + score
    }))
  }

  render(){  
    const {title, questions} = this.props
    const {showAnswer, currentQuestion, score} = this.state
    const questionsCount = questions.length

    if (questionsCount === 0) {
      return (
        <View>
          <Text>First add some cards to the deck</Text>
        </View>
      )
    }

    if (currentQuestion >= questionsCount){
      return (
        <View style={styles.container}>
          <Text style={styles.answer}>{score} correct out of {questionsCount}</Text>
          <CustomButton 
            onPress={() => { this.setState({score: 0, currentQuestion: 0})}} 
            text={'Restart quiz'} styleBtn={styles.button}
          />
          <CustomButton 
            onPress={() => this.props.navigation.goBack()} 
            text={'Back to Deck'} styleTxt={{color: blue}}
            styleBtn={[styles.button, styles.specialButton]}
          />          
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.questionCount}>
          {questionsCount - currentQuestion}/{questionsCount}
        </Text>
        <Text style={styles.question}>
          {questions[currentQuestion].question}
        </Text>
        {showAnswer
          ? <View>
              <Text style={styles.answer}>
                {questions[currentQuestion].answer}
              </Text>            
              <CustomButton 
                onPress={() => this.goNext(1)} 
                text={'Correct'} styleBtn={styles.button}
              />
              <CustomButton 
                onPress={() => this.goNext(0)} 
                text={'Incorrect'} styleTxt={{color: blue}}
                styleBtn={[styles.button, styles.specialButton]}
              />
            </View>
          : <CustomButton onPress={this.showAnswer} text={'Show answer'}/>          
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  questionCount: {
    margin: 15,
    fontSize: 19,
    alignSelf: 'flex-start'
  },
  question: {
    fontSize: 45,
    paddingBottom: 30
  },
  answer: {
    fontSize: 35,
    color: blue,
    paddingBottom: 30
  },
  button: {
    margin: 10,
    width: 210
  },
  specialButton: {
    backgroundColor: white,
    borderWidth: 2,
    borderColor: blue
  }  
})

export default connect(
  (state, {navigation}) => {
    const { title } = navigation.state.params
    const deck = state.decks.find(x => x.title === title)

    return {
      title,
      questions: !!deck ? deck.questions : []
    }
  }
)(Quiz)
