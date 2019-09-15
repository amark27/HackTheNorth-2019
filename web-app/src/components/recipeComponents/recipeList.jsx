import React, {Component} from 'react';
import {generateLink, httpGetRecipes, e_Callback} from '../../assets/edamam_test.js';
import $ from "jquery";

const createQuery = (ingredients) => {
    let queryString = "";

    for (var i = 0; i < ingredients.length; i++){
        queryString += ingredients[i] + ",";
    }

    return queryString.substring(0,queryString.length-1);
} 

class RecipeList extends Component {
    constructor(props){
        super(props);
    }
    
    storeRecipe = (id, recipes, setRec) => {
        $('.recipe-section').map(()=>{
            $(this).removeClass('active');
        })
        $('#'+id+"-section").addClass('active');

        setRec(recipes[parseInt(id)-1]);
        console.log(recipes[parseInt(id)-1]);
    }

    render(){
        let query = createQuery(this.props.ingredients);
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
                            <div id={num + "-section"} className="recipe-section row"> 
                            <div className="col-lg-6">
                                <h2>{`${num.toString()} ${recipe.name}`}</h2>
                                <img src={recipe.image}></img>
                                <h3>Ingredients</h3>
                                <ul>
                                {recipe.ingredientLines.map((entry) => {
                                    return (<li>{entry}</li>);                            
                                })}
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <h3>Instructions</h3>
                                <p>See<a href={recipe.sourceLink} style={{'fontSize': '1.5rem'}}> {recipe.sourceLink}</a></p>
                                <button className="btn btn-primary" type="button" id={num} onClick={(e)=>{this.storeRecipe(e.target.id, recipes, this.props.addRecipe)}}>
                                    Choose this Recipe
                                </button>
                            </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    </React.Fragment> );
                }) : "No recipe was chosen!"}         
            </div>
        );
        }
}
 
export default RecipeList;