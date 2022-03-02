//section - gps coordinate

let lat = 35
let lon = 139

// let geoCodingAPI = 'https://api.myptv.com/geocoding/v1/locations/by-text?searchText=Oceanside%20&apiKey=YzRhMGVjOTgwNTJmNGRiOTg1ODViMzM2YzZjOGFmZjA6MTA2ZjY0MzQtYWFkZi00MjE4LTg4NmQtZWVhYmU3NzJiNTUy'

// 'https://api.myptv.com/geocoding/v1/locations/by-text?searchText=aan%27t%20verlaat%2033f%20&apiKey=YOUR_API_KEY'

// fetch(geoCodingAPI)
//   .then(function (response) {
//     return response.json()
//   })
//   .then(function(data) {
//     console.log(data)
//   })

console.log(document.getElementById('locationName').innerHTML)

//section - weather api fetch

// let weatherToday = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=f656a41670de8a8c5067987b0bdf5407'

let weatherTodayAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=f656a41670de8a8c5067987b0bdf5407'

fetch(weatherTodayAPI)

  .then(function (response) {
    return response.json()
  })

  .then(function (data) {
    console.log(data)
    document.getElementById('locationName').innerHTML = data.name

    //temperature data
    let kelvin
    let celsius = () => kelvin - 273.15

    kelvin = parseFloat(data.main.temp)
    document.getElementById('temperatureToday').innerHTML = 'Temperature: ' + Math.floor(celsius()) + '\xB0C';

    //humidity data
    document.getElementById('humidityToday').innerHTML = 'Humidity: ' + data.main.humidity + '%'

    //wind data
    let rawSpeed
    let windSpeed = () => rawSpeed * 2.2369

    rawSpeed = data.wind.speed
    document.getElementById('windToday').innerHTML = 'Wind Speed: ' + Math.floor(windSpeed()) + 'MPH'
  })