import React from 'react'
import { Provider } from 'react-redux'
import { Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from '../../global/store/store'

import Home from '../Home/Home'
import Detail from '../Home/Detail';

export type RootStackParamList = {
  Home: undefined
  Detail: undefined
}

function HomeTitle(props: any) {
  return (
    <>
      <Image
        style={{ width: 50, height: 50, resizeMode: 'contain' }}
        source={require('assets/icons/ic_clear.png')}
      />
      <Image
        style={{ width: 100, height: 50, resizeMode: 'contain' }}
        source={require('assets/icons/ic_logo.png')}
      />
    </>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

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
            headerTitle: (props) => <HomeTitle {...props} />,
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
