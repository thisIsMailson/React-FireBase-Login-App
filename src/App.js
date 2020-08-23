import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Authen from "./Authen";
import Container from "./fetchQuotes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container />
    </div>
  );
}

export default App;
