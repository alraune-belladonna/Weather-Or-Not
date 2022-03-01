//weather api fetch

let lat = 35
let lon = 139

let weatherToday = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=f656a41670de8a8c5067987b0bdf5407';

// let weatherToday = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=f656a41670de8a8c5067987b0bdf5407'

fetch(weatherToday)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
  })