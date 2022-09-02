const form  = document.querySelector('[data-js="change-location"]')
const imgTime = document.querySelector('[data-js="time"]')
const icon = document.querySelector('[data-js="time-icon"]')
const containerCity = document.querySelector("[data-js='data-city']")
const containerWeather = document.querySelector("[data-js='data-weather']")
const containerTemperture  = document.querySelector("[data-js='data-temperture']")
const forecast5dDays = document.querySelector('[data-js="container-5Days-Forecast"]')

const  imgIconContainer = document.createElement('img')

const getCurrentWeatherIntoDOM = (LocalizedName, IsDayTime, WeatherText, WeatherIcon, Temperature) => {

  imgTime.src = IsDayTime ? './src/day.svg':'./src/night.svg'

  containerCity.textContent = LocalizedName
  containerTemperture.textContent = Temperature.Metric.Value
  containerWeather.textContent = WeatherText
      
  imgIconContainer.setAttribute('src',`./src/icons/${WeatherIcon}.svg`)
  imgIconContainer.classList.add('iconImage')
  icon.appendChild(imgIconContainer)
}

const getNext5DaysForescastIntoDOM = DailyForecasts => {
  DailyForecasts.forEach(({Date, Day, Night}) =>{
      forecast5dDays.innerHTML += 
      `
      <div class="d-flex flex-column mb-4">
        <h5 class="mb-0">Data : ${Date.substring(5,10)}</h5>
        <div class="d-flex flex-row justify-content-center align-items-center">
          <h6 class="mb-0">Dia:</h6>
          <img class="imageIcon" src="./src/icons/${Day.Icon}.svg"/>
          <p class="mb-0">${Day.IconPhrase}</p>
        </div>
        <div class="d-flex flex-row justify-content-center align-items-center">
          <h6 class="mb-0">Noite:</h6>
          <img class="imageIcon" src="./src/icons/${Night.Icon}.svg"/>
          <p class="mb-0">${Night.IconPhrase}</p>
        </div>
      </div>
      `
  })
}

const  fetchInfoForecastWeather = async event => {
  event.preventDefault()

  const inputValue = event.target.city.value.trim()
      
  if(inputValue.length <= 3 || inputValue === '') {
    alert('Por favor, digite novamente a cidade desejada.')
  }
     
  const [{Key , LocalizedName}] = await getCityInfo(inputValue)
  const [{IsDayTime, WeatherText, WeatherIcon, Temperature}] = await getConditionWeather(Key)
  const {DailyForecasts} = await get5DaysForecast(Key)

  getCurrentWeatherIntoDOM(LocalizedName, IsDayTime, WeatherText, WeatherIcon, Temperature)
  getNext5DaysForescastIntoDOM(DailyForecasts)

  form.reset()
}

const removeForecastNext5Days = () => {
  Array.from(forecast5dDays.children).forEach(item => {
    item.remove()
  })
}

form.addEventListener('input',removeForecastNext5Days)
form.addEventListener('submit',fetchInfoForecastWeather)


