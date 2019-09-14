import React from 'react';
//import {generateLink} from '../../assets/edamam_test.js';

const createQuery = (ingredients) => {
    let queryString = "";
    ingredients.forEach((curr) => {
        queryString += curr + ","
    });

    queryString = queryString.substring(queryString.length-1);
}

const RecipeList = (props) => {
    let query = createQuery(props.ingredients);
    //let recipes = generateLink(query, []);

    //console.log(recipes);
    return ( 
        <div className="container custom-container">
            <h1>Recipe List</h1>  

                        {/*.map((item) => {
                            return (<li key={item.key}>{item.quantity}x {item.name}</li>);
                        }) : ""*/}
        </div>
     );
}
 
export default RecipeList;