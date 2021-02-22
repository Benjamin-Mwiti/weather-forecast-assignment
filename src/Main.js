import React, { useState, useEffect, useReducer } from "react";
import './style.css';
import $ from 'jquery';

$(function() {
  $();
});


function Main() {

  const [userInput, setUserInput] = useState("");
  const [cityName, setCityName] = useState();
  const [countryFlag, setcountryFlag] = useState();
  // const [baseURL, setBaseURL] = useState('api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}');
  
  const baseURL = 'api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}';

  useEffect(() => {
    // effect
    return () => {
      setUserInput("");
    }
  }, [userInput])

  return (
    <div className="app">
      <div className="app__bar">
        <div className="app__title">
          <h1>Weather in your city</h1>
        </div>
        <div className="search__container">
          <form>
            <input type="search" name="City name" placeholder="Name of your city" />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="app__body">
        <div className="city__forecast">
          <span>icon</span>
          <div className="city__stats">
            <p><strong><span>Toronto, CA</span> <i>broken clouds</i></strong></p>
            <p><span>-0.7<sup>o</sup>C</span> temperature from -1.1 to 0<sup>o</sup>C, wind 4.52m/s. clouds 77 %, 1008 hpa</p>
            <p>Geo coords <span>[43.7001, -79.4163]</span></p>
          </div>
        </div>
        <div className="city__forecast">
          <span>icon</span>
          <div className="city__stats">
            <p><strong><span>Toronto, US</span> <i>overcast clouds</i></strong></p>
            <p><span>0.9<sup>o</sup>C</span> temperature from 0.6 to 1.1<sup>o</sup>C, wind 3.13m/s. clouds 100 %, 1013 hpa</p>
            <p>Geo coords <span>[40.4642, -80.6009]</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
