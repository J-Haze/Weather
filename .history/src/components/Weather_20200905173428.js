import React, { Component } from 'react';
import GetWeather from "./GetWeather";

const Weather = () {
    constructor(props) {
        super(props)
        this.state = {
            // loading: false,
            // character: {}
            locationInput: "",
            weather: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        console.log("target:", target)
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
        event.preventDefault();
        // console.log("newState:", this.state.value)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("clicked")

        this.setState({ locationInput: event.target.value })
        console.log("2", this.state.locationInput)
        console.log("type of:", typeof (this.state.locationInput))
        this.setState({ weather: GetWeather(this.state.locationInput) })
        console.log("weather:",this.state.weather)
        event.preventDefault();
    }




    render() {
        return (
            <div id="header">
                <h1>Test2</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        // type="text"
                        name="locationInput"
                        placeholder="Search for City"
                        value={this.state.locationInput || ""}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default Header