// import React from "react";

function getWeather(location) {
  //if location doesn't match, then return

  //to keep API hidden:
  //const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f"

  const url =
    location &&
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  async function getWeatherData(url) {
    try {
      const response = await fetch(url); //is fetch the right function?
      const data = await response.json();
    } catch (error) {
      //change error STATE to true
      console.log("error")
      console.log(error)
    }
  }
  getWeatherData(url)

  //return??
}

export default getWeather;