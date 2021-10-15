import React from 'react'
import AppLoading from 'expo-app-loading';
import Root from './src/screens/Root/index'
import { 
  useFonts,
  RobotoCondensed_300Light,
  RobotoCondensed_300Light_Italic,
  RobotoCondensed_400Regular,
  RobotoCondensed_400Regular_Italic,
  RobotoCondensed_700Bold,
  RobotoCondensed_700Bold_Italic 
} from '@expo-google-fonts/roboto-condensed'

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoCondensed_300Light,
    RobotoCondensed_300Light_Italic,
    RobotoCondensed_400Regular,
    RobotoCondensed_400Regular_Italic,
    RobotoCondensed_700Bold,
    RobotoCondensed_700Bold_Italic 
  });

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return <Root />
  }
}
