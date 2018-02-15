import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

export default CustomStatusBar = ({bgColor, ...props}) => (
  <View style={{height: Constants.statusBarHeight, backgroundColor: bgColor}}>
    <StatusBar 
      translucent 
      backgroundColor={bgColor} 
      {...props}
    />
  </View>
)