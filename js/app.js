const form  = document.querySelector('[data-js="change-location"]')
const imgTime = document.querySelector('[data-js="time"]')
const icon = document.querySelector('[data-js="time-icon"]')
const containerCity = document.querySelector("[data-js='data-city']")
const containerWeather = document.querySelector("[data-js='data-weather']")
const containerTemperture  = document.querySelector("[data-js='data-temperture']")

let imgIconContainer = document.createElement('img')

const getCurrentWeatherIntoDOM = (LocalizedName,IsDayTime , WeatherText , WeatherIcon , Temperature) => {
   containerCity.textContent = LocalizedName
    containerTemperture.textContent = Temperature.Metric.Value
    containerWeather.textContent = WeatherText
    
    IsDayTime ? imgTime.src = './src/day.svg' : imgTime.src = './src/night.svg'

    imgIconContainer.setAttribute('src',`./src/icons/${WeatherIcon}.svg`)
    imgIconContainer.classList.add('iconImage')
    icon.appendChild(imgIconContainer)
}

const  fetchInfoForecastWeather = async event => {
      event.preventDefault()
  
      const inputValue = event.target.city.value.trim()
     
      const [{Key , LocalizedName}] = await getCityInfo(inputValue)
      const [{IsDayTime , WeatherText , WeatherIcon , Temperature}] = await logConditionWeather(Key)
  
      getCurrentWeatherIntoDOM(LocalizedName,IsDayTime,WeatherText,WeatherIcon,Temperature)
  
      form.reset()
}

form.addEventListener('submit',fetchInfoForecastWeather)
