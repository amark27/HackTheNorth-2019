import React from 'react';
import Inventory from './inventory.jsx';
import Recipe from './recipe.jsx';
import GroceryList from './groceryList.jsx';
import NavBar from './navbar.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './login.jsx';

const Header = (props) => {
   
    return (
        <BrowserRouter>
              <NavBar/>  
                <Switch>
                    <Route exact path="/" render={() => <Inventory {...props}/>}/>
                    <Route path="/inventory" render={() => <Inventory {...props}/>}/>
                    <Route path="/recipe" render={() => <Recipe {...props}/>}/>
                    <Route path="/grocerylist" render={() => <GroceryList {...props}/>}/>
                    <Route path="/login" component={Login}/>
                </Switch>
        </BrowserRouter>
    );
}

export default Header;