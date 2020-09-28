import React from 'react';
// import getWeather from "./getWeather";
import { useState, useEffect } from 'react';

const Weather = () => {

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    let [location, setLocation] = useState("");
    const [data, setData] = useState(null);
    const [url, setUrl] = useState("")

    // const [weatherData, setWeatherData] = useState({});
    // const [temps, setTemps] = useState({});

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    // const [country, setCountry] = useState("");
    const [weather, setWeather] = useState("");
    const [description, setDescription] = useState("");
    const [pressure, setPressure] = useState("");
    const [humidity, setHumidity] = useState("");

    const [temp, setTemp] = useState("");
    const [max, setMax] = useState("");
    const [min, setMin] = useState("");
    const [feel, setFeel] = useState("");

    // const [submitCount, incrementSubmit] = useState(0);

    //to keep API hidden:
    //const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f";


    // function increment() {
    //     incrementSubmit(prevSubmit => prevSubmit + 1);
    // }

    // const getWeather = async () => {
    //     //if location doesn't match, then return
    //     if (url == null) {
    //         return
    //         // setError(true);
    //     }

    //     // Clear state in preparation for new data
    //     // setError(false);
    //     // setData({});

    //     // setLoading(true);

    //     //to keep API hidden:
    //     //const API_KEY = process.env.REACT_APP_API_KEY;
    //     // const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f";

    //     console.log(`url: ~${url}~`)

    //     // function updateData(response) {
    //     //     setData(response);
    //     //     console.log('response5:', response)
    //     //     console.log('data5', data)
    //     // }

    //     // async function fetchWeatherData(url) {
    //     //   setError(false);
    //     //   setLoading(true);


    //     try {
    //         const fetcher = await fetch(url);
    //         const response = await fetcher.json();
    //         console.log("url2:", url)
    //         if (response.cod !== 200) throw new Error(`${response.cod}: ${response.message}`);
    //         // updateData(response);
    //         console.log("setData1:", response)
    //         setData(response);
    //         changeAttributes(response);
    //         // console.log("setData2:", data)
    //         // setLoading(false);
    //     } catch (error) {
    //         setError(true);
    //         setErrorMessage(error.message);
    //         console.log("error")
    //         console.log(error)
    //     }
    //     console.log("Data4:", data)



    //     // }
    //     //fetchWeatherData(url);


    //     // console.log("final-data:", data)
    //     // return {
    //     //     data
    //     // };

    // };

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
                // country: data.sys.country,
                // date: makeDate(),
                setWeather(data.weather[0].main);
                setDescription(data.weather[0].description);
                // icon: getIconClass(data.weather[0].icon),
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


    // function setWeatherData() {
    //     setCity(data.name);
    //     // country: data.sys.country,
    //     // date: makeDate(),
    //     setWeather(data.weather[0].main);
    //     setDescription(data.weather[0].description);
    //     // icon: getIconClass(data.weather[0].icon),
    //     setPressure(data.main.pressure);
    //     setHumidity(data.main.humidity);
    // };
    // function setTemps() {
    //     setTemp(data.main.temp);
    //     setMax(data.main['temp_max']);
    //     setMin(data.main['temp_min']);
    //     setFeel(data.main['feels_like']);
    // };

    // function changeAttributes(data) {
    //     if (data !== null && data !== undefined) {
    //         setWeatherData();
    //         setTemps();
    //     }
    // };



    return (
        <div id="header">
            <h1>Search for Local Weather</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="location"
                    placeholder="Enter City"
                    maxLength="50"
                    value={location || ""}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                <div>City: {city}</div>
                {/* <div>State: {state}</div> */}
                <div>Country: {country}</div>
                <div>Weather: {weather}</div>
                <div>Description: {description}</div>
                <div>Pressure: {pressure}</div>
                <div>Humidity: {humidity}</div>

                <div>Temp: {temp}</div>
                <div>Max: {max}</div>
                <div>Min: {min}</div>
                <div>Feels Like: {feel}</div>
            </div>
        </div >
    )

}

export default Weather