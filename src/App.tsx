import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainLayout from './components/MainLayout';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={MainLayout} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
