import React from 'react'
import { Text } from 'react-native'

const textStyles = {
  fontFamily: "RobotoCondensed_300Light"
}

export const MyAppText = ({ style, ...props }: any) => (
  <Text {...props} style={[textStyles, style]} />
)

export default MyAppText
