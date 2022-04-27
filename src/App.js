import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';

function App() {
  return (
    <div className="app_container">
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
    </div>
  );
}

export default App;
