import React from 'react';
import Inventory from './inventory.jsx';
import Recipe from './recipe.jsx';
import GroceryList from './groceryList.jsx';
import NavBar from './navbar.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Header = (props) => {
    console.log("Header: "+ JSON.stringify(props.objects));
    return (
        <BrowserRouter>
            <header>
              <NavBar/>  
                <Switch>
                    <Route exact path="/" render={(props) => <Inventory {...props}/>}/>
                    <Route path="/inventory" render={(props) => <Inventory {...props}/>}/>
                    <Route path="/recipe" component={Recipe}/>
                    <Route path="/grocerylist" component={GroceryList}/>
                </Switch>
            </header>
        </BrowserRouter>
    );
}

export default Header;