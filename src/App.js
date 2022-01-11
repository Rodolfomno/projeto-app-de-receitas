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
import ExplorarComidaArea from './pages/ExplorarComidaArea';
import RecipesProvider from './context/RecipesProvider';
import DetalhesReceitas from './pages/DetalhesReceitas';
import ReceitasProcesso from './pages/ReceitasProcesso';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/comidas/:id" component={ DetalhesReceitas } />
        <Route path="/bebidas/:id/in-progress" component={ ReceitasProcesso } />
        <Route path="/comidas/:id/in-progress" component={ ReceitasProcesso } />
        <Route path="/bebidas/:id" component={ DetalhesReceitas } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidaArea } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route exact path="/receitas-favoritas" component={ Favoritas } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </RecipesProvider>
  );
}
export default App;
