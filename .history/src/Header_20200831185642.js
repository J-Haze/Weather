import React, { Component } from "react";
import GetWeather from "./GetWeather";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // loading: false,
            // character: {}
            locationInput: "",
            weather: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
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

    handleClick(event) {
        console.log("clicked")
        
        // this.setState({ locationInput: event.target.value })
        // console.log("2", this.state.locationInput)
        // console.log("type of:", typeof (this.state.locationInput))
        // this.setState({ weather: GetWeather(this.state.locationInput) })
        // console.log("weather:",this.state.weather)
        event.preventDefault();
    }




    render() {
        return (
            <div id="header">
                <h1>Test</h1>
                <form onSubmit={this.handleClick}>
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