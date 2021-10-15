import React, { useEffect } from 'react'
import { Button, View, Text, ScrollView } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Root';
import { fetchWeatherList } from '../../global/reducers/weather';
import { useAppDispatch, useAppSelector } from '../../global/hooks/hooks';

type DevHomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

interface IProps {
  navigation: DevHomeNavigationProp
}

const Home = ({ navigation }: IProps) => {
  const { error, loading, weatherList } = useAppSelector((state) => state.weather)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWeatherList())
  }, [dispatch, fetchWeatherList])

  // Add loading spinner

  console.log(weatherList)

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  let current = weatherList.current && weatherList.current

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View
          style={{
            backgroundColor: '#03A9F4',
            paddingVertical: 20,
            paddingHorizontal: 68
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20
            }}
          >
            Today, {monthNames[new Date(current.dt * 1000).getMonth()]} {new Date(current.dt * 1000).getDate()}
          </Text>
        </View>

        {weatherList &&
          <>
            <Text>Today: {weatherList.current.weather[0].description}</Text>
            <Text>Tomorrow: {weatherList.daily[0].weather[0].description}</Text>
            {weatherList.daily.map((item: any, index: number) => (
              <Text key={index}>{new Date(item.dt * 1000).toString()}: {item.weather[0].description}</Text>
            ))}
          </>
        }

        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Detail')}
        />
      </ScrollView>
    </View>
  );
}

export default Home
