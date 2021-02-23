/******************************************************************************
***
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ___________________ Student ID: _______________ Date: ____________________
*
*
******************************************************************************
**/

import React, { useState, useEffect } from "react";
import './style.css';
import $ from 'jquery';

function Main() {
  
  const [city_name, setCity_Name] = useState("");
  
  const baseURL = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=1cc7ad57a30f3ba7be0d6a9766a69562`;

  $(function() {
    $.ajax({
      url: baseURL,
      type: "GET",
      /* 
      * JavaScript Object Nottion Pattern
      * Some APIs only accept jsonp dataType and they may throw an error if its just json
      */
      dataType: "jsonp",
      success: function(data) {
        let cityForecast_2 = $('.city__forecast > .city__stats').eq(1);
        $(cityForecast_2).text(data.name + ", " + data.sys.country);
      }
    });
  });

  return (
    <div className="app">
      <div className="app__bar">
        <div className="app__title">
          <h1>Weather in your city</h1>
        </div>
        <div className="search__container">
          <form>
            <input type="search" name="City name" value={city_name} placeholder="Name of your city" 
              onChange = {e => {
                setCity_Name(e.target.value);
              }} />
            <button type="submit" onClick={(e) => { 
              console.log(city_name);
              setCity_Name("");
              e.preventDefault();
            }} >Search</button>
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
