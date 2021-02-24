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

import React, { useState } from "react";
import './style.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
  
  const [city_name, setCity_Name] = useState("");
  const [country_Code, setCountry_Code] = useState("");
  
  let isOnline = window.navigator.onLine;
  

  $(function() {
    const openWeatherMapURL = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=1cc7ad57a30f3ba7be0d6a9766a69562`;
    const restCountriesURL = `https://restcountries.eu/rest/v2/alpha/${country_Code}`;
    
    $.ajax({
      url: openWeatherMapURL,
      type: "GET",
      /* 
      * JavaScript Object Nottion Pattern
      * Some APIs only accept jsonp dataType and they may throw an error if its just json
      */
      dataType: "jsonp",
      success: function(data) {
        if(isOnline) {
          setCountry_Code(data.sys.country);
          
          // Weather icon
          $('.city__forecast > span').html("<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png />");

          $('.city__stats').html("<p><strong><span>" + data.name + ", " + data.sys.country + " </span> <i>" + data.weather[0].description + "</i></strong></p>" + "<p><span><span className='temp average__temp'>" + data.main.temp + "</span><sup>o</sup>C</span> temperature from <span className='temp'>" + data.main.temp_min + "</span> to <span className='temp'>" + data.main.temp_max + "</span><sup>o</sup>C, wind <span className='wind__speed'>" + data.wind.speed + "</span>m/s. clouds <span className='clouds'>" + data.clouds.all + "</span> %, <span className='pressure'>" + data.main.pressure + "</span> hpa</p><p>Geo coords <span>[" + data.coord.lat + ", " + data.coord.lon + "]</span></p>");

          $.ajax({
            url: restCountriesURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
              let cityForecast_2 = $('.city__forecast > .city__stats > p');
              $(cityForecast_2.find('strong > span')).append("<img src=" + data.flag + " />");
            },
            error: (err) => {
              console.log(err);
            }
          });
        } else {
          $(function() {
            alert("Ensure the internet connection is on");
          });
        }
      },
      error: (err) => {
        console.log(err);
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
            <input type="search" name="city name" value={city_name} placeholder="Name of your city" 
              onChange = {e => {
                setCity_Name(e.target.value);
              }} />
            <button type="submit" onClick={(e) => {
              if(city_name == "") {
                alert("The field should not be empty");
              }
              e.preventDefault();
            }} >Search</button>
          </form>
        </div>
      </div>
      <div className="app__body">
        <div className="city__forecast">
          <span></span>
          <div className="city__stats">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
