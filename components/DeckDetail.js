import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import CustomButton from './UI/CustomButton'
import { darkBlue, lightBlue, blue, white } from '../utils/colors'

class DeckDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { title } = navigation.state.params

    return {
      title
    }
  }
  
  render(){
    const { title, cardsCount, navigation } = this.props
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{cardsCount} cards</Text>

        <CustomButton text={'Add card'} 
          onPress={() => navigation.navigate('NewCard', {title})}
          styleBtn={styles.button}
        />
        <CustomButton text={'Start Quiz'}
          onPress={() => navigation.navigate('Quiz', {title})}
          styleBtn={[styles.button, styles.specialButton]}
          styleTxt={{color: blue}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    color: darkBlue,
    marginTop: 40
  },
  subTitle: {
    fontSize: 23,
    color: lightBlue,
    marginBottom: 40
  },
  button: {
    width: 200,
    margin: 10,
  },
  specialButton: {
    backgroundColor: white,
    borderWidth: 2,
    borderColor: blue
  }
})

export default connect(
  (state, { navigation }) => {
    let { title } = navigation.state.params
    let deck = state.decks.find(x => x.title === title)
    let cardsCount = !!deck ? deck.questions.length : 0
  
    return {
      title,
      cardsCount,
      decks: state.decks
    }
  }  
)(DeckDetail)
