import React from 'react';
import { useState } from 'react';

function GetWeather(location) {
  //if location doesn't match, then return
  const [data, setData] = useState(null);

  //need to initialize state, and then setState(data: ) below

  //to keep API hidden:
  //const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f";

  const url =
    location &&
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  
  if (!url) return;
  
  console.log(`url: ~${url}~`)

  async function getWeatherData(url) {
    try {
      const response = await fetch(url,{mode:"cors"}); //is fetch the right function?
      const data = await response.json();
      if (data.cod !== 200) throw new Error(`${data.cod}: ${data.message}`);
      setData(data);
    } catch (error) {
      //change error STATE to true
      console.log("error")
      console.log(error)
    }
    console.log("Data:", data)
  }
  getWeatherData(url)
  
  return {
    data
  };

}

export default GetWeather;