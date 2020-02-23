import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css";

//API key value
const APIKey = `b0d9a04ba69e8510c1110d9dfc4506f6`

class App extends Component {

  state = {
    value: ``,
    date: ``,
    city: ``,
    sunrise: ``,
    sunset: ``,
    temp: ``,
    pressure: ``,
    wind: ``,
    err: ``
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

 

//Debugging to see the progress for dynamic search
componentDidUpdate(prevProps, prevState){
  
  if(prevState.value !== this.state.value) {
       const API = 
       `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}
        &APPID=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("No city matched");
      })
      .then(response => response.json())
      .then(data => {
        //Setting up data properties for API 
          const time = new Date().toLocaleString()
        
          this.setState({
          
          err: false,
          date: time,
          city: this.state.value,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({
          err: true,
          city: prevState.value
        }))
      })
  }

}

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
