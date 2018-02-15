import React from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'

import { blue } from '../../utils/colors'

export default class TextBox extends React.Component {
  state = {
    text: ''
  }

  textChanged = (text) => {
    if (this.props.onTextChanged)
      this.props.onTextChanged(text)

    this.setState({text})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.textbox, this.props.style]}
          onChangeText={(text) => this.textChanged(text)}
          value={this.state.text}
          underlineColorAndroid='transparent'
        />
        <Text style={styles.caption}>{this.props.caption}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 20,
    marginBottom: 20
  },
  caption: {
    fontSize: 11,
    marginTop: 0,
    color: blue
  },
  textbox: {
    height: 30, 
    width: 220, 
    borderBottomWidth: 1,
    borderColor: blue,
  }
})
