import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      character: {}
    }
  }

  // componentDidMount() {

  // }




  render() {
    return (
      <div className="App" >
        <h1>Test</h1>
        <button>Search</button>
      </div >
    )

  }
}

export default App;
