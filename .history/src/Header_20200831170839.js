import React, { Component } from "react";
import getWeather from "./GetWeather";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // loading: false,
            // character: {}
            locationInput: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        console.log("target:", target)
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
        // console.log("newState:", this.state.value)
    }

    handleSubmit(event) {
        this.setState({ locationInput: event.target.value })
        console.log("2", this.state.locationInput)
        console.log("type of:", typeof (this.state.locationInput))
        console.log("return:", getWeather(this.state.locationInput))
        event.preventDefault()
    }




    render() {
        return (
            <div id="header">
                <h1>Test</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        // type="text"
                        name="locationInput"
                        placeholder="Search for City"
                        value={this.state.locationInput || ""}
                        onChange={this.handleChange}
                    />
                    <button>Search</button>
                </form>
            </div>
        )
    }
}

export default Header