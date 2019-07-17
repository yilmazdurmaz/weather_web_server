const request = require("request")

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoieWlsbWF6ZHVybWF6IiwiYSI6ImNqeTQ2a214aTEydWIzYmxoa29sZ2JtcWkifQ.l8dWtjPPfnUEelRdsODOJQ&limit=5"

  request({
    url: url,
    json: true
  }, (error, response) => {
    if (error) {
      callback("Error connecting geocoding api: " + error, undefined)
    } else if (response.body.message) {
      callback("Request error: " + response.body.message, undefined)
    } else if (response.body.features.length === 0) {
      callback("No results")
    } else {
      const longitude = response.body.features[0].center[0]
      const latitude = response.body.features[0].center[1]
      const location = response.body.features[0].place_name
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: location
      })
    }
  })

}

module.exports = geocode