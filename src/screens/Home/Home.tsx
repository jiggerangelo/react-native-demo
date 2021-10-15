import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Root';
import { fetchWeatherList } from '../../global/reducers/weather';
import { useSelector } from 'react-redux';

type DevHomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

interface IProps {
  navigation: DevHomeNavigationProp
}

const Home = ({ navigation }: IProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default Home
