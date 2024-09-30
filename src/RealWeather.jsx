import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function RealWeather() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul",
      "Aug",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];

    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} 
                    ${currentDate.getDate()} 
                    ${months[currentDate.getMonth()]}`;
    return date;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInput("");
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/weather';  
    const apiKey = '4bcf7f0814e79205596724bf3be99e37';  
      // q=${input}&appid=${apiKey}


      await axios
        .get(url, { params: {
            q: input,
            units: "metric",
            appid: apiKey,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
          console.log("error", error);
        });
  };

  return (
    <div className="App">
      <h1 className="app-name">
        <strong>My Current Weather</strong>
      </h1>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="city-search"
          type="text"
          placeholder="Enter your City"
          name="query"
          value={input}
          style={{
            width: "75%",
            padding: "10px",
            border: "1px thick white",
            borderRadius: "5px",
          }}
          onChange={(event) => setInput(event.target.value)}
          //   onClick={search}
        />
        <button
          type="submit"
          //   onClick={handleSubmit}
          style={{ width: "130px", alignContent: "center", marginTop: "20px" }}
        >
          Get Weather
        </button>
      </form>

      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}

      

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "20px" }}>Unable to find City</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>

          <div className="date">
            <span>{toDateFunction()}</span>
          </div>

          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt="weather.data.description"
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>

          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
            <p>Humidity: {weather.data.main.humidity}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RealWeather;



{/* <button id="getWeather"
      
      
      style="margin-top: 20px; padding: 10px 20px; 
        background-color: rgb(3, 3, 95); color: whitesmoke; 
        font-size: medium; border: thick; 
        font-family: 'Times New Roman', Times, serif;
        border-radius: 5px; cursor: pointer; ">
      Get Weather Report
    </button>
    
    
    <div id="weatherContainer" 
        style="margin: 50px; border: 15px;
          border-radius: 5px; box-shadow: 0 0 10px;
          color: brown; background-color: white;
          padding: 15px; max-width: 300px;
          width: 100%; font-size: medium;
          font-family: 'Times New Roman', Times, serif;">
      
     */}