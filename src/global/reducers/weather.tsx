import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_KEY = '0b08f90f151899c4474014277b081899' // Intentionally left here for easier cloning
const lat = '12.8797'
const lon = '121.7740'
const part = 'minutely,hourly,alerts'
const units = 'metric'

export interface ListState {
  currentWeather: any
  weatherList: any[] | null
  loading: boolean
  error: any | null
}

const initialState: ListState = {
  currentWeather: null,
  weatherList: null,
  loading: true,
  error: null,
}

// This particular API does not support queries for specific dates so upon visiting the detail page, we just call this endpoint
// again (to make sure we don't miss data updates on navigation change) and get the object by index from weatherList.
// If target is current weather, take data from currentWeather instead.
export const fetchWeatherList = createAsyncThunk('weather/fetchWeatherList', async () => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=${units}&appid=${API_KEY}`,
  ).then((res) => res.json())
})

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherList.pending, (state) => {
      state.loading = true
    }),
      builder.addCase(fetchWeatherList.fulfilled, (state, action) => {
        state.currentWeather = action.payload.current
        state.weatherList = action.payload.daily
        state.loading = false
      }),
      builder.addCase(fetchWeatherList.rejected, (state, action) => {
        state.error = action.error
        state.loading = false
      })
  },
})

export default weatherSlice.reducer
