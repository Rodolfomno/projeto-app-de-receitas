import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/comidas" component={ Comidas } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
