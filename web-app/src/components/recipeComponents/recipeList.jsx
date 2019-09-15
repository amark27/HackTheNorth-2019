import React from 'react';
import {generateLink, httpGetRecipes, e_Callback} from '../../assets/edamam_test.js';

const createQuery = (ingredients) => {
    let queryString = "";

    for (var i = 0; i < ingredients.length; i++){
        queryString += ingredients[i] + ",";
    }

    return queryString.substring(0,queryString.length-1);
}

const RecipeList = (props) => {
    let query = createQuery(props.ingredients);
    let link = generateLink(query, []);
    let recipes = httpGetRecipes(link, e_Callback);
    let num = 0;
    console.log(recipes);

    return ( 
        <div className="container custom-container">
            <h1>Recipe List</h1> 
            <br></br> 
            {!!(recipes) ? recipes.map((recipe) => {
                num++;
                return (<React.Fragment>
                        <div className="recipe-section row"> 
                        <div className="col-lg-6">
                            <h2>{`${num.toString()} ${recipe.name}`}</h2>
                            <img src={recipe.image}></img>
                            <p>Ingredients</p>
                            <ul>
                            {recipe.ingredientLines.map((entry) => {
                                return (<li>{entry}</li>);                            
                            })}
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <h2>Instructions</h2>
                            <p>See<a href={recipe.sourceLink} style={{'fontSize': '1.5rem'}}> {recipe.sourceLink}</a></p>
                        </div>
                </div>
                <br></br>
                <hr style={{"color":"black"}}></hr>
                <br></br>
                </React.Fragment> );
            }) : "No recipe was chosen!"}         
        </div>
     );
}
 
export default RecipeList;