import React, { Component } from "react";

class Header extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {}
        }
    }
    render() {
        return (
            <div id="header">
                <h1>Test</h1>
                <button>Search</button>
            </div>
        )
    }
}

export default Header