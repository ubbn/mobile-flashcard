import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { gray } from '../utils/colors'
import CustomButton from './UI/CustomButton'
import * as Api from '../utils/api'

class Quiz extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { title } = navigation.state.params

    return {
      title
    }
  }

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
      currentQuestion: state.currentQuestion+1,
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
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.questionCount}>
          {currentQuestion+1}/{questionsCount}
        </Text>
        <Text style={styles.question}>
          {questions[currentQuestion].question}
        </Text>
        {showAnswer
          ? <View>
              <Text style={styles.answer}>
                {questions[currentQuestion].answer}
              </Text>            
              <CustomButton onPress={() => this.goNext(1)} key={1}
                text={'Correct'} styleBtn={[styles.button, {backgroundColor: 'black'}]}/>
              <CustomButton onPress={() => this.goNext(0)} key={0}
                text={'Incorrect'} styleBtn={styles.button}/>
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
    color: gray,
    paddingBottom: 30
  },
  button: {
    margin: 10,
    width: 200
  }
})

export default connect((state, {navigation}) => {
  const { title } = navigation.state.params
  const deck = state.decks.find(x => x.title === title)

  return {
    title,
    questions: !!deck ? deck.questions : [],
    decks: state.decks
  }
})(Quiz)