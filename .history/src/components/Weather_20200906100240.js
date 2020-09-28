import React from 'react';
// import getWeather from "./getWeather";
import { useState, useEffect } from 'react';

const Weather = () => {

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    let [location, setLocation] = useState("");
    const [data, setData] = useState(null);
    const [dataResponse, setDataResponse] = useState(null);

    const [weather, setWeather] = useState({});
    const [temps, setTemps] = useState({});

    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    // const [weather, setWeather] = useState("");
    const [description, setDescription] = useState("");
    const [pressure, setPressure] = useState("");
    const [humidity, setHummidity] = useState("");

    const [temp, setTemp] = useState("");
    const [max, setMax] = useState("");
    const [min, setMin] = useState("");
    const [feel, setFeel] = useState("");

    const [submitCount, incrementSubmit] = useState(0);


    function increment() {
        incrementSubmit(prevSubmit => prevSubmit + 1)
    }

    async function getWeather(location) {
        //if location doesn't match, then return
        if (location.length < 1) {
            return
            // setError(true);
        }

        // Clear state in preparation for new data
        // setError(false);
        // setData({});

        // setLoading(true);

        //to keep API hidden:
        //const API_KEY = process.env.REACT_APP_API_KEY;
        const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f";

        const url =
            location &&
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;



        console.log(`url: ~${url}~`)

        // function updateData(response) {
        //     setData(response);
        //     console.log('response5:', response)
        //     console.log('data5', data)
        // }

        // async function fetchWeatherData(url) {
        //   setError(false);
        //   setLoading(true);
        try {
            const fetcher = await fetch(url); //is fetch the right function?
            const response = await fetcher.json();
            console.log("url2:", url)
            if (response.cod !== 200) throw new Error(`${response.cod}: ${response.message}`);
            // updateData(response);
            console.log("setData1:", response)
            setData( await response);
            const attributes = await changeAttributes();
            // console.log("setData2:", data)
            // setLoading(false);
        } catch (error) {
            // setError(true);
            // setErrorMessage(error.message);
            console.log("error")
            console.log(error)
        }
        console.log("Data4:", data)
        // }
        //fetchWeatherData(url);


        // console.log("final-data:", data)
        // return {
        //     data
        // };

    };

    const handleChange = (event) => {
        event.preventDefault();
        setLocation(event.target.value);
        console.log("event.target.value:", event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("clicked")
        console.log("location:", location)
        increment();
        console.log(submitCount)

        console.log("error:", error)
        console.log("loading?", loading)
    };

    useEffect(() => {
        getWeather(location)
        // await setData(getWeather(location))
        console.log("New Data:", data)
    },
        [submitCount]
    );


    function changeAttributes() {
        console.log("change:", data)
        if (data !== null && data !== undefined) {
            console.log('data3:', data)
            console.log("Data Changed")
            setWeather({
                city: data.name,
                // country: data.sys.country,
                // date: makeDate(),
                weather: data.weather[0].main,
                description: data.weather[0].description,
                // icon: getIconClass(data.weather[0].icon),
                pressure: data.main.pressure,
                humidity: data.main.humidity,
            });
            setTemps({
                temp: data.main.temp,
                max: data.main['temp_max'],
                min: data.main['temp_min'],
                feelsLike: data.main['feels_like'],
            });
            setWeather();
            setTemps();
            console.log("city:", city)
        }
    };



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
            </div>
        </div >
    )

}

export default Weather