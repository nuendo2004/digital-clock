import React, { Component } from "react";

import "./App.css";
const date = new Date();
function updateHour() {
  let hour = date.getHours();

  if (hour > 12) return hour - 12;
}
function getClock() {
  let hour = date.getHours();
  if (hour > 12) return "PM";
  return "PM";
}
function getDate() {
  return date.getDate();
}
function getDay() {
  switch (date.getDay()) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return null;
  }
}
function getMonth() {
  return date.getMonth() + 1;
}
function getYear() {
  return date.getFullYear();
}

class App extends Component {
  state = {
    minute: date.getMinutes(),
    second: date.getSeconds(),
    hour: updateHour(),
    clock: getClock(),
    date: getDate(),
    day: getDay(),
    month: getMonth(),
    year: getYear(),
  };

  render() {
    function toString(num) {
      if (num < 10) return `0${num}`;
      return `${num}`;
    }
    const state = this.state;

    return (
      <React.Fragment>
        <div className="clock">
          <div className="date">{`Today is: ${state.month}/${state.date}/${state.year}, ${state.day}`}</div>
          <div className="flex ">
            <div className="digit hour">{toString(state.hour)} </div>
            <div className="digit minute">{toString(state.minute)}</div>
            <div className="digit second">{toString(state.second)}</div>
            <div className="format">{state.clock}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    let { minute, second, hour, date } = this.state;

    setInterval(() => {
      if (second < 60) second++;
      else {
        second = 0;
        if (minute < 60) minute++;
        else {
          minute = 0;
          if (updateHour() === 11 && getClock() === "PM")
            this.setState({
              hour: updateHour(),
              date: getDate(),
              day: getDay(),
              month: getMonth(),
              year: getYear(),
            });
        }
      }

      this.setState({ minute, second, hour });
    }, 1000);
  }
}

export default App;
