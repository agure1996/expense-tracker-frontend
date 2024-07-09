import React, { Component } from "react";
import HomeNavbar from "./HomeNavbar";
export default class Home extends Component {
  state = {};

  render() {
    return (
      <>
        <HomeNavbar />
        <div className="App">
          <h2>Focus on minimising your Expenses</h2>
        </div>
      </>
    );
  }
}
