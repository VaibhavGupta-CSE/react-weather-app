import React, { useEffect, useState } from 'react'
import './style.css'

import Weathercard from './weathercard'

const Temp = () => {
  const [searchValue, setSearchValue] = useState(
    JSON.parse(localStorage.getItem('datacity')) || 'varanasi'
  )
  const [tempInfo, setTempinfo] =
    useState(JSON.parse(localStorage.getItem('data'))) || {}

  const getWeatherInfo = async () => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=353cde60e270aa88def2c81fbd01b5f7`
      )
      const data = await res.json()
      const { temp, humidity, pressure } = data.main
      const { main: weathermood } = data.weather[0]
      const { name } = data
      const { speed } = data.wind
      const { country, sunset } = data.sys

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      }
      console.log(myNewWeatherInfo)
      setTempinfo(myNewWeatherInfo)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getWeatherInfo()
  })
  localStorage.setItem('data', JSON.stringify(tempInfo))
  localStorage.setItem('datacity', JSON.stringify(searchValue))

  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input
            type='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='search...'
            className='searchTerm'
          />
          <button
            className='searchButton'
            onClick={getWeatherInfo}
            type='button'
          >
            Search
          </button>
        </div>
      </div>
      <Weathercard {...tempInfo} />
    </>
  )
}

export default Temp
