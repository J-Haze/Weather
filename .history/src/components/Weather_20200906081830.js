import React from 'react';
import getWeather from "./getWeather";
import { useState, useEffect } from 'react';

const Weather = () => {

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    let [location, setLocation] = useState("");
    const [data, setData] = useState(null);
    const [dataResponse, setDataResponse] = useState(null);

    const [weather, setWeather] = useState(data);
    const [temps, setTemps] = useState(data);

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

        console.log("error:", error)
        console.log("loading?", loading)
    };

    useEffect(() => {
        setData(getWeather(location))
        console.log("New Data:")
    },
        [submitCount]
    );


    useEffect(
        () => {
            console.log("change:", data)
            if (data !== null) {
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
            }
            console.log("city:", city)
        },
        [data]
    );



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