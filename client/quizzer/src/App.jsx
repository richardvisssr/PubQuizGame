// App.js
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
