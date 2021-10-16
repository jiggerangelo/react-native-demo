import React, { useEffect } from 'react'
import AppLoading from 'expo-app-loading';
import { Image, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Root';
import { fetchWeatherList } from '../../global/reducers/weather';
import { useAppDispatch, useAppSelector } from '../../global/hooks/hooks';
import MyAppText from '../../services/MyAppText';
import { degToDirection, FORECAST_ICON, getMonthName, getWeekName } from '../../services/utils';

const DetailTitle = (props: any) => {
  const { image } = props
  return (
    <>
      <Image
        style={{ width: 50, height: 50, resizeMode: 'contain' }}
        source={image}
      />
      <Text style={{ color: '#fff', fontSize: 20, marginLeft: 7 }}>Details</Text>
    </>
  );
}

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

interface IProps {
  route: Props['route']
  navigation: Props['navigation']
}

const Detail = ({ route, navigation }: IProps) => {
  const { index } = route.params;
  const { error, loading, weatherList } = useAppSelector((state) => state.weather)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWeatherList())
    navigation.setOptions({ headerTitle: (props) => <DetailTitle {...props} image={FORECAST_ICON[weatherList![index].weather[0].main]} /> })
  }, [dispatch, fetchWeatherList])

  let weatherItem = weatherList && weatherList[index]

  if (loading) {
    return <AppLoading />
  }

  if (error) {
    console.error(error)
  }

  return (
    <View style={styles.container}>
      <MyAppText style={styles.text}>{getWeekName(new Date(weatherItem.dt * 1000).getDay())}</MyAppText>
      <MyAppText style={styles.subText}>{getMonthName(new Date(weatherItem.dt * 1000).getMonth())} {new Date(weatherItem.dt * 1000).getDate()}</MyAppText>

      <View style={styles.temperatureContainer}>
        <View style={styles.left}>
          <MyAppText style={styles.feelsLike}>{Math.round(parseInt(weatherItem.feels_like.day))}&deg;</MyAppText>
          <MyAppText style={styles.temperature}>{Math.round(parseInt(weatherItem.temp.day))}&deg;</MyAppText>
        </View>
        <View style={styles.right}>
          <Image
            style={styles.tempImage}
            source={FORECAST_ICON[weatherItem.weather[0].main]}
          />
          <MyAppText style={styles.forecast}>{weatherItem.weather[0].main}</MyAppText>
        </View>
      </View>

      <MyAppText style={styles.text}>Humidity: {weatherItem.humidity} %</MyAppText>
      <MyAppText style={styles.text}>Pressure: {weatherItem.pressure} hPa</MyAppText>
      <MyAppText style={styles.text}>Wind: {weatherItem.wind_speed} km/h {degToDirection(weatherItem.wind_deg)}</MyAppText>
    </View>
  );
}

export default Detail

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  text:{
    fontSize: 25,
    fontFamily: 'RobotoCondensed_400Regular'
  },
  subText: {
    color: '#727272',
    fontSize: 16,
    fontFamily: 'RobotoCondensed_400Regular'
  },
  temperatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20
  },
  left: {

  },
  right: {
    alignItems: 'center'
  },
  feelsLike: {
    fontSize: 80
  },
  temperature: {
    color: '#727272',
    fontSize: 50
  },
  tempImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain'
  },
  forecast: {
    color: '#727272',
    fontSize: 22,
    fontFamily: 'RobotoCondensed_400Regular',
    textAlignVertical: 'center'
  },
})
