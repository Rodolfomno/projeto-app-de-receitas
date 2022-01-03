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
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/comidas/:id" component={ Comidas } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/:ingrediente"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/:ingrediente"
          component={ ExplorarBebidasIngredientes }
        />
        <Route exact path="/receitas-favoritas" component={ Favoritas } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      </Switch>
    </div>
  );
}
export default App;
