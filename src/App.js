import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Foods from './pages/FoodsPages/Foods';
import Drinks from './pages/DrinksPages/Drinks';
import DrinkExplore from './pages/DrinksPages/DrinkExplore';
import FoodsDetails from './pages/FoodsPages/FoodsDetails';
import DrinksDetails from './pages/DrinksPages/DrinksDetails';
import FoodInProgress from './pages/FoodsPages/FoodInProgress';
import DrinksInProgress from './pages/DrinksPages/DrinksInProgress';
import Explore from './pages/ExplorePages/Explore';
import FoodExplore from './pages/FoodsPages/FoodExplore';
import FoodByIngredient from './pages/FoodsPages/FoodByIngredient';
import DrinkByIngredient from './pages/DrinksPages/DrinkByIngredient';
import FoodByOrigin from './pages/FoodsPages/FoodByOrigin';
import Profile from './pages/Profile';
import CompletedRecipes from './pages/Recipes/CompletedRecipes';
import FavoriteRecipe from './pages/Recipes/FavoriteRecipe';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
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
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipe } />
      </Switch>
    </main>
  );
}

export default App;
