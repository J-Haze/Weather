import React from 'react';
// import getWeather from "./getWeather";
import { useState, useEffect } from 'react';
import "../App.css";
// import { getIconClass, makeDate } from '../Helpers';


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

    const [temp, setTemp] = useState("");
    const [max, setMax] = useState("");
    const [min, setMin] = useState("");
    const [feel, setFeel] = useState("");

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

    console.log(error,loading,errorMessage,data)

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
                        <i class="fas fa-search-location"></i>
                    </button>
                </form>
                <div> Toggle </div>
            </header>
            <main id="results-section">
                <div>
                    <div>City: {city}</div>
                    {/* <div>State: {state}</div> */}
                    <div>Country: {country}</div>
                    <div>Weather: {weather}</div>
                    <div>Description: {description}</div>
                    <div>Icon: {icon}</div>
                    {/* ^^Get picture based on what the icon data is */}
                    <div>Pressure: {pressure}</div>
                    <div>Humidity: {humidity}</div>

                    <div>Temp: {temp}</div>
                    <div>Max: {max}</div>
                    <div>Min: {min}</div>
                    <div>Feels Like: {feel}</div>
                </div>
            </main>
        </div>
    )

}

export default Weather