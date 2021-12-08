import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ FoodExplore } />
        <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ FoodByIngredient }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ DrinkByIngredient }
        />
        <Route exact path="/explorar/comidas/area" component={ FoodByOrigin } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ CompletedRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } /> */}
      </Switch>
    </main>
  );
}

export default App;
