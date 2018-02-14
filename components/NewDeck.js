import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { addDeck, retreiveDecks } from '../actions'
import * as Api from '../utils/api'
import TextBox from './UI/TextBox'
import CustomButton from './UI/CustomButton'

class NewDeck extends React.Component {
  state = {
    text: ''
  }

  addNew = () => {
    if (this.state.text.length === 0)
      return

    const title = this.state.text
    const obj = {key: title, entry: {title, questions: []}}
    Api.addDeck(obj)

    this.props.dispatch(addDeck(obj))

    Api.retrieveDecks().then(decks => {
      this.props.dispatch(retreiveDecks(decks))
    })    
  }

  render(){  
    return (
      <View style={styles.container}>
        <TextBox 
          caption={'Enter deck name'} 
          onTextChanged={text => this.setState({text})}
          style={{marginTop: 40}}
        />
        <CustomButton text={'submit'} onPress={this.addNew}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})


export default connect(
  state => ({
    ...state
  })
)(NewDeck)