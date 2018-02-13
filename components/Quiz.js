import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { addDeck, retreiveDecks } from '../actions'
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
        <View>
          <Text>{score} correct out of {questionsCount}</Text>
        </View>
      )
    }

    return (
      <View>
        <Text>Quiza on {title}</Text>
        <Text>{currentQuestion+1}/{questionsCount}</Text>
        <Text>{questions[currentQuestion].question}</Text>
        { showAnswer
          ?
          <View>
            <TouchableOpacity onPress={() => this.goNext(1)} key={1}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.goNext(0)} key={0}>
              <Text>Incorrect</Text>
            </TouchableOpacity>            
          </View>
          :
          <TouchableOpacity onPress={this.showAnswer}>
            <Text>Show Answer</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const mapStateToProps = (state, {navigation}) => {
  const { title } = navigation.state.params
  const deck = state.decks.find(x => x.title === title)

  return {
    title,
    questions: !!deck ? deck.questions : [],
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Quiz)
