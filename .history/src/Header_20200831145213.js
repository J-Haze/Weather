import React, { Component } from "react";
import getWeather from "./GetWeather";

class Header extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {}
        }
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({[name]: value })
    }
    
    handleSubmit(event) {
        event.preventDefault()
        
        console.log(getWeather(location))
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