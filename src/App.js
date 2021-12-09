import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
