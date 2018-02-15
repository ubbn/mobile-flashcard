import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import CustomButton from './UI/CustomButton'

class DeckDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { title } = navigation.state.params

    return {
      title
    }
  }
  
  render(){
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.subTitle}>{this.props.cardsCount} cards</Text>

        <CustomButton text={'Start Quiz'}
          onPress={() => this.props.navigation.navigate('Quiz', {title: this.props.title})}
          styleBtn={styles.button}
        />

        <CustomButton text={'Add card'} 
          onPress={() => this.props.navigation.navigate('NewCard', {title: this.props.title})}
          styleBtn={[styles.button, {backgroundColor: 'black'}]}
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
    marginTop: 40
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 40
  },
  button: {
    width: 200,
    margin: 10,
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
