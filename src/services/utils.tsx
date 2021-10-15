const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getMonthName = (monthNumber: number) => {
  return monthNames[monthNumber]
}

export const getWeekName = (weekNumber: number) => {
  return weekNames[weekNumber]
}

export const FORECAST_ICON: {[index: string]: any } = {
  Clear: require('assets/icons/ic_clear.png'),
  Clouds: require('assets/icons/ic_cloudy.png'),
  Fog: require('assets/icons/ic_fog.png'),
  Drizzle: require('assets/icons/ic_light_rain.png'),
  Rain: require('assets/icons/ic_rain.png'),
  Snow: require('assets/icons/ic_snow.png'),
  Thunderstorm: require('assets/icons/ic_storm.png'),
}
