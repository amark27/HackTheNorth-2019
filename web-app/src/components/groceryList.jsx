import React from 'react';
import {getShoppingList} from '../assets/edamam_test.js';

const GroceryList = (props) => {
    let missingIng = null;
    if (props.recipe != null){
        let recipe = props.recipe;
        console.log(recipe);
        missingIng = getShoppingList(props.objects, recipe.ingredients);
        console.log("ingredients to buy: "+JSON.stringify(missingIng));
    }
    return ( 
        <div className="container custom-container">
            <h1>Grocery List</h1>
            <p>Checks what is in your fridge and generates a list of missing ingredients based on your previously chosen recipe.</p>
            <ul class="grocery-list">
            {(missingIng != null) ? missingIng.map((item) => {
                return (<li>{(Object.is(item.amount, NaN)) ? "1" : item.amount} {item.name}</li>);
            }) : <li>No recipe was chosen</li>}
            </ul>
        </div>
    );
}
 
export default GroceryList;