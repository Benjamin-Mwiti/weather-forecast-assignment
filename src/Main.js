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
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
  
  const [city_name, setCity_Name] = useState("");
  const [country_Code, setCountry_Code] = useState("");
  const [show, setShow] = useState(true);
  
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
          // setLat_Lon(latLon);
          setCountry_Code(data.sys.country);
          
          let cityForecast_2 = $('.city__forecast > .city__stats > p');
          // Weather icon
          $('.city__forecast > span').html("<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png />");

          $('.city__stats').html("<p><strong><span>" + data.name + ", " + data.sys.country + "</span> <i>" + data.weather[0].description + "</i></strong></p>" + "<p><span><span className='temp average__temp'>" + data.main.temp + "</span><sup>o</sup>C</span> temperature from <span className='temp'>" + data.main.temp_min + "</span> to <span className='temp'>" + data.main.temp_max + "</span><sup>o</sup>C, wind <span className='wind__speed'>" + data.wind.speed + "</span>m/s. clouds <span className='clouds'>" + data.clouds.all + "</span> %, <span className='pressure'>" + data.main.pressure + "</span> hpa</p><p>Geo coords <span>[" + data.coord.lat + ", " + data.coord.lon + "]</span></p>");

          $.ajax({
            url: restCountriesURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
              console.log(data);
              console.log(data.flag);
              let cityForecast_2 = $('.city__forecast > .city__stats > p');
              $(cityForecast_2.find('strong > span')).append("<img src=" + data.flag + " />");
            }
          });

          /* // First child of city__stats class
          $(cityForecast_2.find('strong > span')).text(data.name + ", " + data.sys.country);
          $(cityForecast_2.find('strong > i')).text(data.weather[0].description);

          // Second child of city__stats class
          $(cityForecast_2.find('.temp').eq(0)).text(data.main.temp);
          // $(cityForecast_2.find('.temp').eq(0)).append("<div><sup>o</sup>C</div>");
          $(cityForecast_2.find('.temp').eq(1)).text(data.main.temp_min);
          $(cityForecast_2.find('.temp').eq(2)).text(data.main.temp_max);
          $(cityForecast_2.find('.wind__speed')).text(data.wind.speed);
          $(cityForecast_2.find('.clouds')).text(data.clouds.all);

          // Third child of city__stats class
          $(cityForecast_2.eq(2).find('span')).text("[" + data.coord.lat + ", " + data.coord.lon + "]");
          $(cityForecast_2.eq(1).find('.pressure')).text(data.main.pressure); */
        } else {
          $(function() {
            $('.city__forecast').html('<Alert variant="warning" toggle={() => setShow(true)} dismissible>Ensure the internet connection is on</Alert>');
          });
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
        <div className="city__forecast">
          <span></span>
          <div className="city__stats">
            {/* <p><strong><span>Toronto, US</span> <i>overcast clouds</i></strong></p>
            <p><span><span className="temp average__temp">0.9</span><sup>o</sup>C</span> temperature from <span className="temp">0.6</span> to <span className="temp">1.1</span><sup>o</sup>C, wind <span className="wind__speed">3.13</span>m/s. clouds <span className="clouds">100</span> %, <span className="pressure">1013</span> hpa</p>
            <p>Geo coords <span>[40.4642, -80.6009]</span></p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
