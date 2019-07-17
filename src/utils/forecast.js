const request = require("request")


const forecast = (lat, long, callback) => {
  const url = "https://api.darksky.net/forecast/6b2338fc907ad2d552448384546e1305/" + lat + "," + long + "?units=si&exclude=minutely,hourly,alerts,flags";

  request({
    url: url,
    json: true
  }, (error, response) => {
    if (error) {
      callback("Error connecting to weather api: " + error, undefined)
    } else if (response.body.error) {
      callback(response.body.error, undefined)
    } else if (typeof response.body !== typeof {}) {
      callback("Adress format error", undefined)
    } else {
      callback(undefined, response.body.daily.data[0].summary + " Currently " + response.body.currently.temperature + " and " + response.body.currently.precipProbability * 100 + "% chance to rain")
    }
  })
}

module.exports = forecast