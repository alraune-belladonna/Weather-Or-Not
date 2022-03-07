//section - gps coordinate
const searchButton = document.getElementById("confirmSearch")

searchButton.addEventListener("click", locationAPI);

locationAPI()

function locationAPI() {

  let locationInput = document.getElementById('cityName').value
  console.log(locationInput)
  lastSearch = localStorage.getItem('lastSearch')

  //search history
  if (lastSearch === null || locationInput.length !== 0) {
    let searchHistory = document.createElement('li')
    document.getElementById('searchHistory').appendChild(searchHistory)
    searchHistory.innerText = locationInput
    console.log(locationInput)
    localStorage.setItem('lastSearch', locationInput)
  }
  else {
    locationInput = lastSearch
  }

  document.getElementById('today').innerHTML = moment().format("MMM Do YYYY")

  console.log(locationInput)

  let geoCodingAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=${' + locationInput + '}&limit=5&appid=f656a41670de8a8c5067987b0bdf5407'

  fetch(geoCodingAPI)

    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      let lon = data[0].lon
      let lat = data[0].lat
      document.getElementById('locationName').innerHTML = data[0].name;

      let weatherTodayAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=f656a41670de8a8c5067987b0bdf5407'

      fetch(weatherTodayAPI)

        .then(function (response) {
          return response.json()
        })

        .then(function (data) {
          console.log(data)

          //temperature data
          let kelvin
          let celsius = () => kelvin - 273.15

          kelvin = parseFloat(data.current.temp)
          document.getElementById('temperatureToday').innerHTML = 'Temperature: ' + Math.floor(celsius()) + '\xB0C';

          //humidity data
          document.getElementById('humidityToday').innerHTML = 'Humidity: ' + data.current.humidity + '%'

          //wind data
          let rawSpeed
          let windSpeed = () => rawSpeed * 2.2369

          rawSpeed = data.current.wind_speed
          document.getElementById('windToday').innerHTML = 'Wind Speed: ' + Math.floor(windSpeed()) + 'MPH'

          //uvi data
          let uviValue = data.current.uvi
          document.getElementById('UVI').innerHTML = 'UV Index: ' + uviValue

          if (uviValue > 10) {
            document.getElementById('UVI').style.backgroundColor = 'purple'
          }
          if (uviValue < 11) {
            document.getElementById('UVI').style.backgroundColor = 'red'
          }
          if (uviValue < 8) {
            document.getElementById('UVI').style.backgroundColor = 'orange'
          }
          if (uviValue < 6) {
            document.getElementById('UVI').style.backgroundColor = 'yellow'
          }
          if (uviValue < 3) {
            document.getElementById('UVI').style.backgroundColor = 'green'
          }

        })

      let fiveDayAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=f656a41670de8a8c5067987b0bdf5407'

      fetch(fiveDayAPI)

        .then(function (response) {
          return response.json()
        })
        .then(function(data) {
          console.log(data)
          document.getElementById('day1Date').innerHTML = moment().add(1, 'days').format('L')    
          document.getElementById('day2Date').innerHTML = moment().add(2, 'days').format('L')
          document.getElementById('day3Date').innerHTML = moment().add(3, 'days').format('L')
          document.getElementById('day4Date').innerHTML = moment().add(4, 'days').format('L')
          document.getElementById('day5Date').innerHTML = moment().add(5, 'days').format('L')

          document.getElementById('weatherFuture1').innerHTML = data.list[1].weather[0].main
          document.getElementById('weatherFuture2').innerHTML = data.list[2].weather[0].main
          document.getElementById('weatherFuture3').innerHTML = data.list[3].weather[0].main
          document.getElementById('weatherFuture4').innerHTML = data.list[4].weather[0].main
          document.getElementById('weatherFuture5').innerHTML = data.list[5].weather[0].main

          let celsius1 = () => data.list[1].main.temp - 273.15
          let celsius2 = () => data.list[2].main.temp - 273.15
          let celsius3 = () => data.list[3].main.temp - 273.15
          let celsius4 = () => data.list[4].main.temp - 273.15
          let celsius5 = () => data.list[5].main.temp - 273.15

          document.getElementById('tempFuture1').innerHTML = 'Temperature: ' + Math.floor(celsius1()) + '\xB0C';
          document.getElementById('tempFuture2').innerHTML = 'Temperature: ' + Math.floor(celsius2()) + '\xB0C';
          document.getElementById('tempFuture3').innerHTML = 'Temperature: ' + Math.floor(celsius3()) + '\xB0C';
          document.getElementById('tempFuture4').innerHTML = 'Temperature: ' + Math.floor(celsius4()) + '\xB0C';
          document.getElementById('tempFuture5').innerHTML = 'Temperature: ' + Math.floor(celsius5()) + '\xB0C';

          document.getElementById('humidFuture1').innerHTML = 'Humidity: ' + data.list[1].main.humidity + '%'
          document.getElementById('humidFuture2').innerHTML = 'Humidity: ' + data.list[2].main.humidity + '%'
          document.getElementById('humidFuture3').innerHTML = 'Humidity: ' + data.list[3].main.humidity + '%'
          document.getElementById('humidFuture4').innerHTML = 'Humidity: ' + data.list[4].main.humidity + '%'
          document.getElementById('humidFuture5').innerHTML = 'Humidity: ' + data.list[5].main.humidity + '%'
        })
    })
  locationInput = ''
}

//section - weather api fetch

// let weatherToday = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=f656a41670de8a8c5067987b0bdf5407'