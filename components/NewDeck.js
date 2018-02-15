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

    const newDeck = { 
      title: this.state.text, 
      questions: [] 
    }

    Api.addDeck(newDeck)
    this.props.dispatch(addDeck(newDeck))
    this.input.clear()
  }

  render(){  
    return (
      <View style={styles.container}>
        <TextBox 
          caption={'Enter title'} 
          onTextChanged={text => this.setState({text})}
          style={{marginTop: 40}}
          inputRef={ref => this.input = ref}
        />
        <CustomButton text={'create deck'} onPress={this.addNew}/>
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