import React from 'react';

function GetWeather(location) {
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  let [location, setlocation] = useState("");
  
  //if location doesn't match, then return
  if (location.length < 1) {
    return setError(true);
  }

  // Clear state in preparation for new data
  setError(false);
  setData({});

  setLoading(true);

  //to keep API hidden:
  //const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "4d6cade389b20b00b0c5a2ee77f0845f";

  const url =
    location &&
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;



  console.log(`url: ~${url}~`)

  // function updateData(response) {
  //     setData(response);
  //     console.log('response5:', response)
  //     console.log('data5', data)
  // }

  useEffect(() => {
    async function fetchWeatherData(url) {
      setError(false);
      setLoading(true);
      try {
        const fetcher = await fetch(url); //is fetch the right function?
        const response = await fetcher.json();
        console.log("url2:", url)
        if (response.cod !== 200) throw new Error(`${response.cod}: ${response.message}`);
        // updateData(response);
        setData(response);
        console.log("setData1:", response)
        console.log("setData2:", data)
        setLoading(false);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        console.log("error")
        console.log(error)
      }
      console.log("Data4:", data)
    }
    fetchWeatherData(url);
  },
    [url]
  );



  // console.log("final-data:", data)
  // return {
  //     data
  // };

};


export default GetWeather