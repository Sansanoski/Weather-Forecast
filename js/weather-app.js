const APIKey = 'aMgfmqf4bcSElOuMm6PlkmELPHEHuqkG'
const getCityInfoURL = inputValue => 
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${inputValue}&language=pt-br`

const getCityConditionWeatherURL = Key => 
    `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`

const fetchData = async url => {
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new Error()
        }
        return  response.json()
    }catch(error){
        alert('Por favor, digite novamente a cidade desejada.')
    }
}

const getCityInfo = city => fetchData(getCityInfoURL(city))

const logConditionWeather = Key => fetchData(getCityConditionWeatherURL(Key))  



