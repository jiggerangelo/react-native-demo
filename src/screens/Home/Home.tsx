import React, { useEffect } from 'react'
import AppLoading from 'expo-app-loading';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Root';
import { fetchWeatherList } from '../../global/reducers/weather';
import { useAppDispatch, useAppSelector } from '../../global/hooks/hooks';
import MyAppText from '../../services/MyAppText'
import { FORECAST_ICON, getMonthName, getWeekName } from '../../services/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface IProps {
  navigation: Props['navigation']
}

const Home = ({ navigation }: IProps) => {
  const { error, loading, currentWeather, weatherList } = useAppSelector((state) => state.weather)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWeatherList())
  }, [dispatch, fetchWeatherList])

  if (loading) {
    return <AppLoading />
  }

  if (error) {
    console.error(error)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.currentSection}>
          <View style={styles.left}></View>
          <View style={styles.middle}>
            <MyAppText style={styles.currentDate}>
              Today, {getMonthName(new Date(currentWeather.dt * 1000).getMonth())} {new Date(currentWeather.dt * 1000).getDate()}
            </MyAppText>
          </View>
          <View style={styles.right}></View>

          <View style={styles.left}></View>
          <View style={styles.middle}>
            <MyAppText style={styles.currentFeelsLike}>{Math.round(parseInt(currentWeather.feels_like))}&deg;</MyAppText>
            <MyAppText style={styles.currentTemperature}>{Math.round(parseInt(currentWeather.temp))}&deg;</MyAppText>
          </View>
          <View style={styles.right}>
            <Image
              style={styles.currentTempImage}
              source={FORECAST_ICON[currentWeather.weather[0].main]}
            />
            <MyAppText style={styles.currentForecast}>{currentWeather.weather[0].main}</MyAppText>
          </View>
        </View>

        {weatherList &&
          weatherList.map((item: any, index: number) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { index: index })} style={styles.row}>
              <View style={styles.left}>
                <Image
                  style={styles.tempImage}
                  source={FORECAST_ICON[item.weather[0].main]}
                />
              </View>
              <View style={styles.middle}>
                <MyAppText style={styles.rowText}>{getWeekName(new Date(item.dt * 1000).getDay())}</MyAppText>
                <MyAppText style={styles.rowSubtext}>{item.weather[0].main}</MyAppText>
              </View>
              <View style={styles.right}>
                <MyAppText style={styles.rowText}>{Math.round(parseInt(item.feels_like.day))}&deg;</MyAppText>
                <MyAppText style={styles.rowSubtext}>{Math.round(parseInt(item.temp.day))}&deg;</MyAppText>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  left: {
    width: '18%',
    alignItems: 'center'
  },
  middle: {
    width: '48%'
  },
  right: {
    width: '34%',
    alignItems: 'center'
  },
  currentSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#03A9F4',
    paddingVertical: 20,
  },
  currentDate: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 5
  },
  currentFeelsLike: {
    color: 'white',
    fontSize: 60
  },
  currentTemperature: {
    color: 'white',
    fontSize: 33
  },
  currentTempImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain'
  },
  currentForecast: {
    color: 'white',
    fontSize: 20
  },
  tempImage: {
    width: 33,
    height: 33,
    resizeMode: 'contain'
  },
  rowText: {
    color: '#212121',
    fontSize: 22,
    fontFamily: 'RobotoCondensed_400Regular'
  },
  rowSubtext: {
    color: '#727272',
    fontSize: 16
  }
});
