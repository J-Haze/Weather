import React, { Component } from 'react';
// import GetWeather from "./GetWeather";
import { useState, useEffect } from 'react';

const Weather = () {
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

    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [locationInput, setLocationInput] = useState({});

    function GetWeather(location) {
        //if location doesn't match, then return
        const [data, setData] = useState(null);

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
                // setHasError(false);
                // setIsLoading(true);
                try {
                    const response = await fetch(url, { mode: "cors" }); //is fetch the right function?
                    const data = await response.json();
                    if (data.cod !== 200) throw new Error(`${data.cod}: ${data.message}`);
                    setData(data);
                    //setIsLoading(false);
                } catch (error) {
                    //change error STATE to true
                    // setHasError(true);
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

    }



    // handleChange(event) {
    //     event.preventDefault();
    //     const target = event.target;
    //     console.log("target:", target)
    //     const name = target.name;
    //     const value = target.value;
    //     this.setState({
    //         [name]: value
    //     })
    //     event.preventDefault();
    //     // console.log("newState:", this.state.value)
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     console.log("clicked")

    //     this.setState({ locationInput: event.target.value })
    //     console.log("2", this.state.locationInput)
    //     console.log("type of:", typeof (this.state.locationInput))
    //     this.setState({ weather: GetWeather(this.state.locationInput) })
    //     console.log("weather:",this.state.weather)
    //     event.preventDefault();
    // }




    render() {
        return (
            <div id="header">
                <h1>Search for Local Weather</h1>
                <form onSubmit={GetWeather}>
                    <input
                        // type="text"
                        name="locationInput"
                        placeholder="Enter City"
                        maxLength = "50"
                        value={locationInput || ""}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default Header