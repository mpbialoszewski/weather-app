import React from "react";
import './Result.css' 

const Result = props => {
  const {
    date,
    city,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    err
  } = props.weather;

  let content = null;

  if (!err && city) {
    
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
    content = (
      <div>
        <h3>Search result for {city}</h3>
        <h4>Time: {date} </h4>
        <h4> Current temperature: {temp} &#176;C </h4>
        <h4> Sunrise time: {sunriseTime}</h4>
        <h4> Sunset time: {sunsetTime}</h4>
        <h4> Wind strength: {wind} m/s </h4>
        <h4> Current pressure: {pressure} hPa</h4>

      </div>
    )
  }

  return (
    <div className="result">
      {err ? `We do not have ${city} in our database` : content}
    </div>
  );
};

export default Result;
