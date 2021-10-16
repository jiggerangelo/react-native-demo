import React from 'react'
import { Provider } from 'react-redux'
import { Image, Platform, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import store from '../../global/store/store'

import Home from '../Home/Home'
import Detail from '../Home/Detail'

export type RootStackParamList = {
  Home: undefined
  Detail: { index?: number; current?: boolean } // See note in weather reducer
}

const HomeTitle = () => {
  return (
    <>
      <Image style={styles.logoImage} source={require('assets/icons/ic_clear.png')} />
      <Image style={styles.logoText} source={require('assets/icons/ic_logo.png')} />
    </>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Root = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#03A9F4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: (props: any) => <HomeTitle {...props} />,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: 'Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
)

export default Root

const styles = StyleSheet.create({
  logoImage: {
    width: Platform.OS === 'ios' ? 35 : 50,
    height: Platform.OS === 'ios' ? 40 : 50,
    resizeMode: 'contain',
  },
  logoText: {
    width: Platform.OS === 'ios' ? 90 : 100,
    height: Platform.OS === 'ios' ? 40 : 50,
    resizeMode: 'contain',
  },
})
