import React from 'react';
// import GetWeather from "./GetWeather";
import { useState, useEffect } from 'react';

const Weather = () => {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         // loading: false,
    //         // character: {}
    //         locationInput: "",
    //         weather: ""
    //     };
    //     this.handleChange = this.handleChange.bind(this)
    //     this.handleSubmit = this.handleSubmit.bind(this)
    // }

    // let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    let [locationInput, setLocationInput] = useState("");
    const [data, setData] = useState(null);

    function GetWeather(location) {
        //if location doesn't match, then return
        

        //need to initialize state, and then setState(data: ) below

        //to keep API hidden:
        //const API_KEY = process.env.REACT_APP_API_KEY;
        const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f";

        const url =
            location &&
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;


        useEffect(() => {
            if (!url) return;

            console.log(`url: ~${url}~`)

            async function fetchWeatherData(url) {
                setError(false);
                setLoading(true);
                try {
                    const response = await fetch(url, { mode: "cors" }); //is fetch the right function?
                    const data = await response.json();
                    if (data.cod !== 200) throw new Error(`${data.cod}: ${data.message}`);
                    setData(data);
                    setLoading(false);
                } catch (error) {
                    //change error STATE to true
                    setError(true);
                    // setErrorMessage(error.message);
                    console.log("error")
                    console.log(error)
                }
                console.log("Data:", data)
            };
            fetchWeatherData(url);
        },
            [url]
        );

        return {
            data
        };

    };



    const handleChange = (event) => {
        event.preventDefault();
        // const target = event.target;
        // console.log("target:", target)
        // const name = target.name;
        // const value = target.value;
        setLocationInput(event.target.value);
        console.log("event.target.value:", event.target.value)
        event.preventDefault();
        // console.log("newState:", this.state.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("clicked")
        console.log("locationInput:", locationInput)
        GetWeather(locationInput);

        console.log("error:", error)
        console.log("loading?", loading)

        // this.setState({ locationInput: event.target.value })
        // console.log("2", this.state.locationInput)
        // console.log("type of:", typeof (this.state.locationInput))
        // this.setState({ weather: GetWeather(this.state.locationInput) })
        // console.log("weather:",this.state.weather)
        event.preventDefault();
    }


    return (
        <div id="header">
            <h1>Search for Local Weather</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="locationInput"
                    placeholder="Enter City"
                    maxLength="50"
                    value={locationInput || ""}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )

}

export default Weather