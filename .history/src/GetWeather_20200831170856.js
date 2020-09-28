// import React from "react";

function getWeather(location) {
  //if location doesn't match, then return

  //need to initialize state, and then setState(data: ) below

  //to keep API hidden:
  //const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f"

  const url =
    location &&
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  
  console.log(`url: ~${url}\~`)

  async function getWeatherData(url) {
    try {
      const response = await fetch(url); //is fetch the right function?
      const data = await response.json();
      if (data.cod !== 200) throw new Error(`${data.cod}: ${data.message}`);
    } catch (error) {
      //change error STATE to true
      console.log("error")
      console.log(error)
    }
    // return data
  }
  // getWeatherData(url)
  console.log("getWeatherData:", getWeatherData(url))
  return getWeatherData(url)
}

export default getWeather;