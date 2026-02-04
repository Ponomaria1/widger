import React, {useEffect, useState, useRef} from 'react'
import './Weather.css'
import './Widget.css'
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"

const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);
    const [message, setMessage] = useState('');

    const allIcons ={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };

    const search = async (city) => {
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&lang=ru`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Город не найден');
            }

            const data = await response.json();
            console.log(data);

            const icon = allIcon[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.huminidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location:data.name,
                icon: icon,
            });

            setMessage('');

        } catch (error) {
            setMessage(error.message);
        }
    }

    useEffect(() => {
        search('London');
    }, []);

    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="search" placeholder='Введите город' />
                <img src={search_icon} alt="#"  onClick={()=> search(inputRef.current.value)}/>
            </div>

            {message && <p className='error-message'>{message}</p>}

            <img src={weatherData.icon || clear_icon} alt="№" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature ? `${weatherData.temperature}C`: ''}</p>
            <p className='location'>{weatherData.location}</p>

            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                <div>
                <p>{weatherData.humidity} %</p>
                <span>Влажность</span>
           </div>
         </div>
        <div className="col">
        <img src={wind_icon} alt="" />
        <div>
            <p>{weatherData.windSpeed} м/с</p>
            <span>Скорость ветра</span>
        </div>
        </div> 
        </div>

        </div>
       
    )
}


export default Weather
