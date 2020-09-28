import React from 'react';
// import GetWeather from "./GetWeather";
import { useState, useEffect } from 'react';

const Weather = () => {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         // loading: false,
    //         // character: {}
    //         location: "",
    //         weather: ""
    //     };
    //     this.handleChange = this.handleChange.bind(this)
    //     this.handleSubmit = this.handleSubmit.bind(this)
    // }

    // let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    let [location, setlocation] = useState("");
    const [data, setData] = useState(null);

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


    function GetWeather(location) {
        //if location doesn't match, then return
        if (location.length < 1) {
            return setError(true);
        }

        // Clear state in preparation for new data
        setError(false);
        setData(null);

        setLoading(true);

        //need to initialize state, and then setState(data: ) below

        //to keep API hidden:
        //const API_KEY = process.env.REACT_APP_API_KEY;
        const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f";

        const url =
            location &&
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;



        console.log(`url: ~${url}~`)

        async function fetchWeatherData(url) {
            setError(false);
            setLoading(true);
            try {
                const response = await fetch(url); //is fetch the right function?
                const data = await response.json();
                console.log("url2:", url)
                if (data.cod !== 200) throw new Error(`${data.cod}: ${data.message}`);
                setData(data);
                console.log("setData:", data)
                setLoading(false);
            } catch (error) {
                //change error STATE to true
                setError(true);
                // setErrorMessage(error.message);
                console.log("error")
                console.log(error)
            }
            // console.log("Data4:", data)
        };
        fetchWeatherData(url);

        console.log("final-data:", data)
        // return {
        //     data
        // };

    };

    const handleChange = (event) => {
        event.preventDefault();

        setlocation(event.target.value);
        console.log("event.target.value:", event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("clicked")
        console.log("location:", location)
        GetWeather(location)

        console.log("error:", error)
        console.log("loading?", loading)

        // this.setState({ location: event.target.value })
        // console.log("2", this.state.location)
        // console.log("type of:", typeof (this.state.location))
        // this.setState({ weather: GetWeather(this.state.location) })
        // console.log("weather:",this.state.weather)
        // event.preventDefault();
    };


    useEffect(
        () => {
            console.log("change:", data)
            if (data !== null) {
                console.log('data3:', data)
                console.log("Data Changed")
                setWeather({
                    city: data.name,
                    country: data.sys.country,
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
                {/* <div>Data: {data}</div> */}
                <div>City: {city}</div>
            </div>
        </div >
    )

}

export default Weather