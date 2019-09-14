import React from 'react';
import Inventory from './inventory.jsx';
import Recipe from './recipe.jsx';
import GroceryList from './groceryList.jsx';
import NavBar from './navbar.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import recipeList from './recipeComponents/recipeList.jsx';

const Header = (props) => {
   
    return (
        <BrowserRouter>
            <header>
              <NavBar/>  
                <Switch>
                    <Route exact path="/" render={() => <Inventory {...props}/>}/>
                    <Route path="/inventory" render={() => <Inventory {...props}/>}/>
                    <Route path="/recipe" component={() => <Recipe {...props}/>}/>
                    <Route path="/grocerylist" component={GroceryList}/>
                </Switch>
            </header>
        </BrowserRouter>
    );
}

export default Header;