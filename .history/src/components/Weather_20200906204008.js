import React from 'react';
// import getWeather from "./getWeather";
import { useState, useEffect } from 'react';
import "../App.css";
// import { getIconClass, makeDate } from '../Helpers';

//Weather Icons
import sun from '../assets/icons/01n.png'
import cloud from '../assets/icons/02n.png'
import scatteredCloud from '../assets/icons/03n.png'
import brokenCloud from '../assets/icons/04n.png'
import rain from '../assets/icons/09n.png'
import heavyRain from '../assets/icons/10n.png'
import thunderstorm from '../assets/icons/11n.png'
import snow from '../assets/icons/13n.png'
import mist from '../assets/icons/50n.png'


const Weather = () => {

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    let [location, setLocation] = useState("");
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

    // const [searched, setSearched] = useState("false")

    //to keep API hidden:
    //const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY = process.env.REACT_APP_API_KEY;


    const handleChange = (event) => {
        event.preventDefault();
        setLocation(event.target.value);
        console.log("event.target.value:", event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let urlInput = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
        setUrl(urlInput)
    };

    useEffect(() => {
        if (!url) return;
        console.log("url:", url)
        const fetchWeather = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log()
                if (data.cod !== 200) throw new Error(`${data.cod}: ${data.message}`);
                setData(data);
                setCity(data.name);
                setCountry(data.sys.country)
                // date: makeDate(),
                setWeather(data.weather[0].main);
                setDescription(data.weather[0].description);
                setIcon(data.weather[0].icon)
                //^^ get picture based on what the icon is
                setPressure(data.main.pressure);
                setHumidity(data.main.humidity);
                setWind(data.wind.speed);
                setTemp(data.main.temp);
                setMax(data.main['temp_max']);
                setMin(data.main['temp_min']);
                setFeel(data.main['feels_like']);
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
                console.log(error);
            }
        };
        setLoading(false);
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
        '50n': mist
    };


    // function toCelsius(fahrenheit) {
    //     return (fahrenheit - 32) * 5 / 9;
    // }

    // function toFahrenheit(celsius) {
    //     return (celsius * 9 / 5) + 32;
    // }


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
                <div> Toggle </div>
            </header>
            <div id="results-section">
                <div id="results-card">
                    <div className="location">
                        {`Corvallis, Oregon${city}${country}`}
                    </div>

                    <div className="row">
                        <div className="temp-container">
                            <div className="temp-main">15&#176; {temp}</div>
                            <div className="feel temp">Feels like 13&#176; {feel}</div>
                            <div className="max temp">High: 17&#176; {max}</div>
                            <div className="min temp">Low: 12&#176; {min}</div>

                        </div>

                        <div className="weather-container">
                            <div className="weather mid"> Weather: {weather} </div>
                            <div className="mid"><img src={weatherIcons[icon]} className="icon"/></div>
                            <div className="description mid">Description: {description}</div>
                        </div>

                        <div className="other-container">
                            <div className="wind">2.7 km/h {wind}</div>
                            <div className="pressure">1022 hPa {pressure}</div>
                            <div className="humidity">77% {humidity}</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                Created by Justin Hazelton
            </footer>
        </div>
    )

}

export default Weather