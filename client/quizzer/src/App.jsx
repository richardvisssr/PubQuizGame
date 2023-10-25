// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter here
import Router from "./router/router";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
