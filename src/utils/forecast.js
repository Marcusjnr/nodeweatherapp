
const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d9ad78713a1c6fb7323a2447a9932d91/'+ encodeURIComponent(latitude) +',' + encodeURIComponent(longitude)
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to internet', undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)

        }else{
            const baseUrl = body.currently
            callback(undefined, body.daily.data[0].summary+ " It is currently " + baseUrl.temperature + " degrees out. There is a " + baseUrl.precipProbability + "% chance of rain")
        }
    })
}

module.exports = forecast