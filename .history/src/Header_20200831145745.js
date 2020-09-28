import React, { Component } from "react";
import getWeather from "./GetWeather";

class Header extends Component {
    constructor() {
        super()
        this.state = {
            // loading: false,
            // character: {}
            location: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({[name]: value })
    }
    
    handleSubmit(event) {
        event.preventDefault()
        const value = event.target.value
        this.setState({ location: value })
        console.log(this.state.location)
        console.log(getWeather(this.state.location))
    }




    render() {
        return (
            <div id="header">
                <h1>Test</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="locationInput"
                        placeholder="Search for City"
                        value={this.state.locationInput}
                        onChange={this.handleChange}
                />
                    <button>Search</button>
                </form>
            </div>
        )
    }
}

export default Header