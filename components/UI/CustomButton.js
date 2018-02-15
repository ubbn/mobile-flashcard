import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { blue, white } from '../../utils/colors'

export default CustomButton = ({text, onPress, styleBtn={}, styleTxt={}}) => {
  text = typeof text === 'string' ? text.toUpperCase() : 'SUBMIT'

  return (
    <TouchableOpacity onPress={onPress}
      style={[styles.AndroidSubmitBtn, styleBtn]}
    >
      <Text style={[styles.submitBtnText, styleTxt]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  AndroidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 40,
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  }
})
