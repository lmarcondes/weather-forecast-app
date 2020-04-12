const request = require('request')

const geocode = (address, callback) => {
  const urlOptions = {
    baseUrl : 'https://api.mapbox.com',
    uri: `/geocoding/v5/mapbox.places/${address}.json`,
    json: true,
    qs: {
      access_token:'pk.eyJ1IjoibG1hcmNvbmRlczk1IiwiYSI6ImNrODM4Ymd2ZTBla3ozZmxxNDF3ZXhvYmYifQ._WxV5eIrVVtLWO_XuliCQQ',
      limit: 1
    }
  }
  request(urlOptions, (error, response) => {
    if (error) {
      callback('Unable to access service')
    } else if (response.body.features.length == 0) {
      callback('Location not found in query')
    } else {
      callback(error, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode

