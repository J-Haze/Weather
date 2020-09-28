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

  async function getWeather(location) {
    let url = http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4d6cade389b20b00b0c5a2ee77f0845f
      let response = await fetch(url); //is fetch the right function?

  }
  
  
  render() {
    return (
      <div className="App" >
        Test
      </div >
    )

  }
}

export default App;
