import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// importando páginas
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';

import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import Favoritas from './pages/Favoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';

function App() {
  return (
    <div>
      <Switch>

        <Route exact path="/" component={ Login } />

        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />

        <Route path="/perfil" component={ Perfil } />

        <Route path="/explorar" component={ Explorar } />
        <Route path="/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas" component={ ExplorarComidasIngredientes } />
        <Route path="/explorar/bebidas" component={ ExplorarBebidasIngredientes } />

        <Route path="receitas-favoritas" component={ Favoritas } />
        <Route path="receitas-feitas" component={ ReceitasFeitas } />
      </Switch>
    </div>
  );
}

export default App;
