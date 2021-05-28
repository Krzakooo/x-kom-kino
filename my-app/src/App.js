import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ControlledInput from './components/Input';
import FetchData from './components/FetchData';
import Book from './components/Book';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><ControlledInput/></Route>
        <Route path="/bookings"><FetchData /></Route>
        <Route path="/book"><Book /></Route>
      </Switch>
    </Router>
  );
}

export default App;
