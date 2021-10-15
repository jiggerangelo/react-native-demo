import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const API_KEY = '0b08f90f151899c4474014277b081899'
const lat = '12.8797'
const lon = '121.7740'
const part = 'minutely,hourly,alerts'
const units = 'metric'

export interface ListState {
  weatherList: any
  loading: boolean
  error: string | null
}

const initialState: ListState = {
  weatherList: null,
  loading: false,
  error: null,
}

export const fetchWeatherList = createAsyncThunk(
  'weather/fetchWeatherList',
  async () => {
    return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=${units}&appid=${API_KEY}`)
      .then(res => res.json())
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherList.pending, (state, action) => {
      state.loading = true
    }),
    builder.addCase(fetchWeatherList.fulfilled, (state, action) => {
      state.weatherList = action.payload
      state.loading = false
    }),
    builder.addCase(fetchWeatherList.rejected, (state, action) => {
      state.error = 'error'
      console.log(action.payload)
      state.loading = false
    })
  }
})

export default weatherSlice.reducer
