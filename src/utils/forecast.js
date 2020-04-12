const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const access_token = '99ceb5d439c488ecd5d0bc1f317d83fe'
  const urlOptions = {
    url: `https://api.darksky.net/forecast/${access_token}/${latitude}, ${longitude}`,
    json: true,
    qs:{
      units:'si',
      lang:'en' 
    }
  }
  request(urlOptions, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service')
    } else if (response.body.error) {
      callback('Unable to find location')
    } else {
      // console.log(urlOptions)
      // console.log(response.body)
      const currentForecast = response.body.currently
      const dailyForecast = response.body.daily
      const forecast = `${dailyForecast.summary} It's currently ${currentForecast.temperature} degrees out. There is a ${currentForecast.precipProbability * 100}% chance of rain`
      const forecasData = {
        currentForecast,
        dailyForecast,
        forecast
      }
      callback(error, forecasData)
    }
  })
}

module.exports = forecast
