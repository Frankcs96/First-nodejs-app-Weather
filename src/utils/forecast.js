const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/fd121016e32928a40d27d3e182d745e3/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request({url: url, json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if(response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% of rain`)
        }
    });

};


module.exports = forecast;
