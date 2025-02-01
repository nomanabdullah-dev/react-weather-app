import React, {useEffect, useState, useRef} from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/clouds.png';
import dizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': dizzle_icon,
        '04n': dizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '13d': snow_icon,
        '13n': wind_icon
    }

    const search = async (city)=> {
        if(city === ""){
            alert('Please enter a city name');
            return;
        }
        try{
            const api_key = 'e1b36645e4a0ec8bd3ec8c93af76eb20';
            const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
            const response = await fetch(api_url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                location: data.name,
                temperature: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: icon
            });
        }catch(error){
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect( ()=> {
        search();
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Enter City Name" />
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
            </div>

            {weatherData?<>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°c</p>
                <p className='location'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.windSpeed} km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </>:<></>}
            
        </div>
    );
};

export default Weather;