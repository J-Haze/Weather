import React from 'react';
import { useState, useEffect } from 'react';
import "../App.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';


//Weather Icons
import sun from '../assets/icons/01n.png';
import cloud from '../assets/icons/02n.png';
import scatteredCloud from '../assets/icons/03n.png';
import brokenCloud from '../assets/icons/04n.png';
import rain from '../assets/icons/09n.png';
import heavyRain from '../assets/icons/10n.png';
import thunderstorm from '../assets/icons/11n.png';
import snow from '../assets/icons/13n.png';
import mist from '../assets/icons/50n.png';
import windy from '../assets/icons/wind.png';
import pressIcon from '../assets/icons/pressure.png';
import humidIcon from '../assets/icons/humidity.png';


const Weather = () => {

    const [location, setLocation] = useState("");
    const [data, setData] = useState(null);
    const [url, setUrl] = useState("")

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [weather, setWeather] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [pressure, setPressure] = useState("");
    const [humidity, setHumidity] = useState("");
    const [wind, setWind] = useState("");

    const [temp, setTemp] = useState("");
    const [max, setMax] = useState("");
    const [min, setMin] = useState("");
    const [feel, setFeel] = useState("");

    const [unit, setUnit] = useState("imperial")

    const [searched, setSearched] = useState(false)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const API_KEY = process.env.REACT_APP_API_KEY;
    let urlInput = "";

    const handleChange = (event) => {
        event.preventDefault();
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        urlInput = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=&appid=${API_KEY}`
        setUrl(urlInput)
    };

    const handleF = (event) => {
        event.preventDefault();
        if (unit === "metric") {
            setUnit("imperial")
        }
    };

    const handleC = (event) => {
        event.preventDefault();
        if (unit === "imperial") {
            setUnit("metric")
        }
    };

    useEffect(() => {
        if (!url) return;

        const fetchWeather = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.cod !== 200) throw new Error(`${data.cod}: ${data.message}`);
                setData(data);
                setCity(data.name);
                setCountry(data.sys.country)
                setWeather(data.weather[0].main);
                setDescription(data.weather[0].description);
                setIcon(data.weather[0].icon)
                setPressure(data.main.pressure);
                setHumidity(data.main.humidity);
                setWind(data.wind.speed);
                setTemp(data.main.temp);
                setMax(data.main['temp_max']);
                setMin(data.main['temp_min']);
                setFeel(data.main['feels_like']);
                setSearched(true);
                setLoading(false);
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
                console.log(error.message);
                setLoading(false);
            }
        };
        fetchWeather();
    },
        [url]
    );

    const weatherIcons = {
        '01n': sun,
        '02n': cloud,
        '03n': scatteredCloud,
        '04n': brokenCloud,
        '09n': rain,
        '10n': heavyRain,
        '11n': thunderstorm,
        '13n': snow,
        '50n': mist,
        '200': windy,
        '300': pressIcon,
        '400': humidIcon,
        '01d': sun,
        '02d': cloud,
        '03d': scatteredCloud,
        '04d': brokenCloud,
        '09d': rain,
        '10d': heavyRain,
        '11d': thunderstorm,
        '13d': snow,
        '50d': mist,
    };

    function toCelsius(kelvin) {
        return Math.round((kelvin - 273.15));
    }

    function toFahrenheit(kelvin) {
        return Math.round(((kelvin * 9 / 5) - 459.67));
    }

    function toMPH(mps) {
        return Math.round((mps * 2.236936));
    }


    console.log(error, loading, errorMessage, data)

    return (
        <div id="app">
            <header id="header">
                <div id="title" >Justin's Weather App</div>
                <div id="subtitle"> Search weather by location:</div>
                <form onSubmit={handleSubmit} id="form">
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter City"
                        maxLength="50"
                        value={location || ""}
                        onChange={handleChange}
                        id="search-box"
                    />
                    <button type="submit" id="search-button">
                        <i className="fas fa-search-location"></i>
                        Search
                    </button>
                </form>
                <div className="toggle">
                    <div className={(unit === "imperial") ? "toggleBtn imperial selected" : "toggleBtn imperial"} onClick={handleF}>&#176;F</div>
                    <div className={(unit === "metric") ? "toggleBtn metric selected" : "toggleBtn metric"} onClick={handleC}>&#176;C</div>
                </div>
            </header>
            <div id="results-section">
                <div className={(searched === false || error === true || loading === true) ? "hide results-card" : "results-card"}>
                    <div className="location">
                        {`${city}, ${country}`}
                    </div>

                    <div className="row">
                        <div className="temp-container">
                            <div className="temp-main">{unit === "imperial" ? toFahrenheit(temp) : toCelsius(temp)}&#176;{unit === "imperial" ? 'F' : 'C'}</div>
                            <div className="feel temp">Feels like {unit === "imperial" ? toFahrenheit(feel) : toCelsius(feel)}&#176;{unit === "imperial" ? 'F' : 'C'}</div>
                            <div className="max temp">High: {unit === "imperial" ? toFahrenheit(max) : toCelsius(max)}&#176;{unit === "imperial" ? 'F' : 'C'}</div>
                            <div className="min temp">Low: {unit === "imperial" ? toFahrenheit(min) : toCelsius(min)}&#176;{unit === "imperial" ? 'F' : 'C'}</div>

                        </div>

                        <div className="weather-container">
                            <div className="weather mid">{weather} </div>
                            <div className="mid"><img src={weatherIcons[icon]} className="icon" alt="Weather Icon" /></div>
                            <div className="description mid">{description}</div>
                        </div>

                        <div className="other-container">
                            <div className="wind other"><img src={weatherIcons['200']} className="windy" alt="Wind Icon" />{unit === "imperial" ? toMPH(wind) : wind} {unit === "imperial" ? 'mph' : 'm/s'}</div>
                            <div className="pressure other">
                                <img src={weatherIcons['300']} className="windy" alt="Wind Icon" /> {`${pressure} hPa`}
                            </div>
                            <div className="humidity other">
                                <img src={weatherIcons['400']} className="windy" alt="Wind Icon" /> {humidity} %</div>
                        </div>
                    </div>
                </div>
                <div className={(error === false || loading === true) ? "hide error-card" : "error-card"}>Could not find city.</div>
                <div className={loading === false ? "hide loading-card" : "loading-card"}>Loading...</div>
            </div>
            <footer>
                Created by Justin Hazelton
            </footer>
        </div>
    )

}

export default Weather