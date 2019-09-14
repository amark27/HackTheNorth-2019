import React from 'react';
import {} from '../../assets/edamam_test.js';

const createQuery = (ingredients) => {
    let queryString = "";
    ingredients.forEach((curr) => {
        queryString += curr + ","
    });

    queryString = queryString.substring(queryString.length-1);
}

const RecipeList = (props) => {
    let query = createQuery(props.ingredients);

    //console.log(recipe);
    return ( 
        <div className="container custom-container">
            <h1>Recipe List</h1>  
                <div className="list">
                    <ul>
                        {/*.map((item) => {
                            return (<li key={item.key}>{item.quantity}x {item.name}</li>);
                        }) : ""*/}
                    </ul>
                </div>
        </div>
     );
}
 
export default RecipeList;