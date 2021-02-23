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
import { Alert } from 'react-bootstrap';

function Main() {
  
  const [city_name, setCity_Name] = useState("");
  
  const openWeatherMapURL = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=1cc7ad57a30f3ba7be0d6a9766a69562`;
  const restCountriesURL = `https://restcountries.eu/rest/v2/name/${city_name}`;

  $(function() {
    $.ajax({
      url: openWeatherMapURL,
      type: "GET",
      /* 
      * JavaScript Object Nottion Pattern
      * Some APIs only accept jsonp dataType and they may throw an error if its just json
      */
      dataType: "jsonp",
      success: function(data) {
        if(window.navigator.onLine) {
          let cityForecast_2 = $('.city__forecast > .city__stats > p');
          // Weather icon
          $('.city__forecast > span').html("<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png />");

          // First child of city__stats class
          $(cityForecast_2.find('strong > span')).text(data.name + ", " + data.sys.country);
          $(cityForecast_2.find('strong > i')).text(data.weather[0].description);

          // Second child of city__stats class
          $(cityForecast_2.find('.temp').eq(0)).text(`${data.main.temp}<div><sup>o</sup>C</div>`);
          $(cityForecast_2.find('.temp').eq(1)).text(data.main.temp_min);
          $(cityForecast_2.find('.temp').eq(2)).text(data.main.temp_max);
          $(cityForecast_2.find('.wind__speed')).text(data.wind.speed);
          $(cityForecast_2.find('.clouds')).text(data.clouds.all);

          // Third child of city__stats class
          $(cityForecast_2.eq(2).find('span')).text("[" + data.coord.lat + ", " + data.coord.lon + "]");
          $(cityForecast_2.eq(1).find('.pressure')).text(data.main.pressure);
        } else {
          console.log("Offline");
          /* const isOnline = () => {
            $(function() {
              $('.city__forecast').html(
                <Alert show="true" variant="success" color="primary">Make sure your browser has internet connection for website to work properly
                alertService.warn("Warning!");
                </Alert>
                // <div class="alert alert-warning alert-dismissible fade show">
                //   Make sure your browser has internet connection for website to work properly
                // </div>
              );
            });
          }; */
        }
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
              // isOnline
              e.preventDefault();
            }} >Search</button>
          </form>
        </div>
      </div>
      <div className="app__body">
        {/* <div className="city__forecast">
          <span>Icon</span>
          <div className="city__stats">
            <p><strong><span>Toronto, CA</span> <i>broken clouds</i></strong></p>
            <p><span>-0.7<sup>o</sup>C</span> temperature from -1.1 to 0<sup>o</sup>C, wind 4.52m/s. clouds 77 %, 1008 hpa</p>
            <p>Geo coords <span>[43.7001, -79.4163]</span></p>
          </div>
        </div> */}
        <div className="city__forecast">
          <span></span>
          <div className="city__stats">
            <p><strong><span>Toronto, US</span> <i>overcast clouds</i></strong></p>
            <p><span><span className="temp average__temp">0.9</span><sup>o</sup>C</span> temperature from <span className="temp">0.6</span> to <span className="temp">1.1</span><sup>o</sup>C, wind <span className="wind__speed">3.13</span>m/s. clouds <span className="clouds">100</span> %, <span className="pressure">1013</span> hpa</p>
            <p>Geo coords <span>[40.4642, -80.6009]</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
