import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from '../../global/store/store'

import Home from '../Home/Home'
import Detail from '../Home/Detail';

export type RootStackParamList = {
  Home: undefined
  Details: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Root = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
)

export default Root
