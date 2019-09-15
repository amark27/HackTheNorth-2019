const e_BASE_LINK = 'https://api.edamam.com/search?';
const e_APP_ID = '4f1ced5e';
const e_APP_KEY = '80e98c7d232cd636d65a70922b58721f';
const i_BASE_LINK = 'https://api.edamam.com/api/food-database/parser?';
const i_APP_ID = '1eadff57';
const i_APP_KEY = '7c203950b01fe74e6f8e253fb8c258f3';
var inventory = [];
var ingredients = [];
var shoppingList = [];
var recipes = [];
var tmpIngredientNutrients = []; // temp global variable to store array of nutrientobjects when finding the nutrients of an ingredient
var itemObject = {
    name:"defaultItemName", // Item name
    amount: 0, // Number of this item
};

var recipeObject = {
    name:"label", // Recipe name
    image:"imgUrl", // Image url
    sourceName: "source", // Name of recipe source
    sourceLink: "sourceLink",
    dietLabels: [], //Diet labels: “balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium” (labels are per serving)
    healthLabels: [], //“vegan”, “vegetarian”, “paleo”, “dairy-free”, “gluten-free”, “wheat-free”, “fat-free”, “low-sugar”, “egg-free”, “peanut-free”, “tree-nut-free”, “soy-free”, “fish-free”, “shellfish-free” (labels are per serving)
    ingredientLines: [], //actual ingredients in string for recipe
    instructions: [],
    ingredients: [], //ingredients for storage
    totalCal: 0,
    nutrition: []
};

var nutrientObject = {
    name:"label", // Nutrient name
    quantity:0,
    unit:"unit",
};

var nutrNameLookUp = {
    CA: "Calcium",
	CHOCDF: "Carbs", 
    CHOLE: "Cholesterol",
    ENERC_KCAL: "Energy",
	FAMS: "Monounsaturated",
	FAPU: "Polyunsaturated",
	FASAT: "Saturated",
	FAT: "Fat",
	FATRN: "Trans",
	FE: "Iron",
	FIBTG: "Fiber",
	FOLDFE: "Folate (Equivalent)",
	K: "Potassium",
	MG: "Magnesium",
	NA: "Sodium",
	NIA: "Niacin (B3)",
	P: "Phosphorus",
	PROCNT: "Protein",
	RIBF: "Riboflavin (B2)",
	SUGAR: "Sugars",
	THIA: "Thiamin (B1)",
	TOCPHA: "Vitamin E",
	VITA_RAE: "Vitamin A",
	VITB12: "Vitamin B12",
	VITB6A: "Vitamin B6",
	VITC: "Vitamin C",
	VITD: "Vitamin D",
	VITK1: "Vitamin K",
	ZN: "Zinc"
}

var nutrUnitLookUp = {
    CA: "mg",
	CHOCDF: "g", 
    CHOLE: "mg",
    ENERC_KCAL: "kcal",
	FAMS: "g",
	FAPU: "g",
	FASAT: "g",
	FAT: "g",
	FATRN: "g",
	FE: "mg",
	FIBTG: "g",
	FOLDFE: "aeg",
	K: "mg",
	MG: "mg",
	NA: "mg",
	NIA: "mg",
	P: "mg",
	PROCNT: "g",
	RIBF: "mg",
	SUGAR: "g",
	THIA: "mg",
	TOCPHA: "mg",
	VITA_RAE: "aeg",
	VITB12: "aeg",
	VITB6A: "mg",
	VITC: "mg",
	VITD: "aeg",
	VITK1: "aeg",
	ZN: "mg"
}

//https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=1eadff57&app_key=7c203950b01fe74e6f8e253fb8c258f3
//https://api.edamam.com/search?q=chicken,apple&app_id=$4f1ced5e&app_key=$80e98c7d232cd636d65a70922b58721f

// Gets nutrition array from ingredient name
function getIngredientNutrition(name){
    let link = i_BASE_LINK + "ingr=" + name + "&app_id=" + i_APP_ID + "&app_key=" + i_APP_KEY;
    httpGetAsync(link, i_Callback);
}


// Gets shopping list from current inventory and ingredients
// Assumes that ingredients have unique names
function getShoppingList(inventory, ingredients){
    let num_ingredients = ingredients.length;
    let num_inv = inventory.length;

    //add to shopping list
    for (var i = 0; i < num_ingredients; i++){
        // Run through all ingredients (parse through ingredient text for inventory items)
        let inInv = isIngrInInv(ingredients[i], inventory);
        if (!inInv){
            // not in inventory, so add exact amount to shopping list
            const newIngredient = Object.create(itemObject);
            newIngredient.name = ingredients[i].name;
            newIngredient.amount = ingredients[i].amount;
            addToShoppingList(shoppingList, newIngredient);
        }
    }

}

function isIngrInInv (ingredient, inventory){
    //ingredient is an itemObject, inventory is an array of itemObjects
    //returns bool value and adds to shopping list

    let num_inv = inventory.length;

    for (var j = 0; j < num_inv; j++){
        let tmp_ingr_arr = ingredient.name.split(" ");
        for (var k = 0; k < tmp_ingr_arr.length; k++){
            if (tmp_ingr_arr[k] == inventory[j].name){
                // Ingredient is in inventory
                if (inventory[j].amount < ingredient.amount){
                    const newIngredient = Object.create(itemObject);
                    newIngredient.name = inventory[j].name;
                    newIngredient.amount = ingredient.amount - inventory[j].amount;
                    addToShoppingList(shoppingList, newIngredient);
                }
                return true;
            }

        }

    }
    return false;
}
/*
function getShoppingList(inventory, ingredients){
    let num_ingredients = ingredients.length;

    // add to shopping list
    for (var i = 0; i < num_ingredients; i++){
        // Check if ingredient name is in inventory
        let tmp = inventory.filter(data => (data.name == ingredients[i].name));
        if (tmp.length == 0){
            // Inventory does not include ingredient
            const newIngredient = Object.create(itemObject);
            newIngredient.name = ingredients[i].name;
            newIngredient.amount = ingredients[i].amount;
            addToShoppingList(shoppingList, newIngredient);
        } else {
            // Includes ingredient
            console.log("tmp : " + tmp);
            console.log("tmp : " + JSON.stringify(tmp));
            let num_inventory = inventory.length;
            for (var j = 0; j < num_inventory; j++){
                if ((inventory[j].name == ingredients[i].name) && (inventory[j].amount < ingredients[i].amount)){
                    const newIngredient = Object.create(itemObject);
                    newIngredient.name = ingredients[i].name;
                    newIngredient.amount = ingredients[i].amount - inventory[tmpIndex].amount;
                    addToShoppingList(shoppingList, newIngredient);
                }

            }            
        }
    }
    return shoppingList;
}
*/
function addToShoppingList(shoppingList, item){
    // Check if item is already in shopping list, if so incr quantity
    let slength = shoppingList.length;
    for (var i = 0; i < slength; i++){
        if (shoppingList[i].name == item.name){
            shoppingList[i].amount += item.amount;
            return;
        }
    }
    const tmp = Object.create(itemObject);
    tmp.name = item.name;
    tmp.amount = item.amount;
    shoppingList.push(tmp);
}

function generateLink(query, ...extra){
    // Generate link from query, diet, health, etc.
    // Let extra be an array of a pair of parameter and values
    let link = e_BASE_LINK + 'q=' + query + '&app_id=' + e_APP_ID + '&app_key=' + e_APP_KEY;
    let xlength = extra.length;

    if (xlength != 0){
        // has diet/health
        for (var i  = 0; i < xlength; i++){
            link = link + '&' + extra[i].parameter + extra[i].value;
        }
    }

    return link;
}

// Make GET request
function httpGetAsync(e_Url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", e_Url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpGetRecipes(e_Url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", e_Url, false ); // false for synchronous request
    xmlHttp.send( null );
    callback(xmlHttp.responseText);
    return recipes;
}

// Process results from GET request for recipe
function e_Callback(response){
    let resp = JSON.parse(response);
    let hits = resp.hits;
    let num_reps = hits.length
    if (num_reps == 0){
        // No recipes
        return -1;
    }

    // iterate through recipes and add it to Recipes[]
    for (var i = 0; i < num_reps; i++){
        //console.log("hits i rep: " + JSON.stringify(hits[i].recipe));
        const newRecipe = Object.create(recipeObject);
        newRecipe.name = hits[i].recipe.label;
        newRecipe.image = hits[i].recipe.image;
        newRecipe.sourceName = hits[i].recipe.source;
        newRecipe.sourceLink = hits[i].recipe.url;
        newRecipe.dietLabels = hits[i].recipe.dietLabels;
        newRecipe.healthLabels = hits[i].recipe.healthLabels;
        newRecipe.ingredientLines = hits[i].recipe.ingredientLines;
        //TODO: instructions
        newRecipe.instructions = "See " + hits[i].recipe.url;
        newRecipe.ingredients = getIngredientsArray(hits[i].recipe.ingredients);
        newRecipe.totalCal = hits[i].recipe.calories;
        newRecipe.nutrition = getNutritionArray(hits[i].recipe.totalNutrients);

        recipes.push(newRecipe);
    }
    console.log("recipes " + recipes);

    
}

// Process results from GET request for ingredient
function i_Callback(response){
    let resp = JSON.parse(response);
    console.log("ingr response: " + JSON.stringify(resp));
    let nutr = resp.parsed[0].food.nutrients;
    console.log("1: " + JSON.stringify(resp.parsed[0].food.nutrients));

    // Clear ingredient nutrients
    tmpIngredientNutrients = [];

    const keys = Object.keys(nutr);
    for (const key of keys) {
        const newNutr = Object.create(nutrientObject);
        console.log("key, " + key);
        newNutr.name = nutrNameLookUp[key];
        newNutr.quantity = resp.parsed[0].food.nutrients[key];
        newNutr.unit = nutrUnitLookUp[key];
        tmpIngredientNutrients.push(newNutr);
    }
    console.log("dem nutrients: " + JSON.stringify(tmpIngredientNutrients));

}

// Gets an array of itemObjects (ingredients) from an array of ingredients as text
function getIngredientsArray(ingredientTextArray){
    //ingredientTextArray is an array of ingredients as text as quantity + ingredient
    //console.log("in get ingr");
    //console.log("ingr txt array: " + JSON.stringify(ingredientTextArray));
    let newArray = [];
    let num_ingredients = ingredientTextArray.length;

    // If theres no ingredients
    if (num_ingredients == 0){
        return newArray;
    }

    // If there is ingredients
    for (var i = 0; i < num_ingredients; i++){
        const newIngredient = Object.create(itemObject);
        //console.log("ingrar i : " + JSON.stringiingredientTextArray[i].textfy(ingredientTextArray[i]));
        newIngredient.name =ingredientTextArray[i].text.substr(ingredientTextArray[i].text.indexOf(' ') + 1);
        
		let indexDig = ingredientTextArray[i].text.search(/\d/);
		let sym = ingredientTextArray[i].text.substr(0,ingredientTextArray[i].text.indexOf(' '));
		let hexCode = sym.charCodeAt(0).toString(16);

		//console.log("hexcode is " + hexCode);
		if(checkIfSym(hexCode)){
			newIngredient.amount = convertSymToFloat(hexCode);
		}
		else{
			newIngredient.amount = strToNumber(ingredientTextArray[i].text.substr(indexDig, ingredientTextArray[i].text.indexOf(' ')));
		}
		
		//console.log("Ingredient and amount: " + newIngredient.name + " " + newIngredient.amount);
		
        newArray.push(newIngredient);
    }

    //console.log("ingredients? " + JSON.stringify(newArray));
    return newArray;
}

function getNutritionArray(totalNutrients){
    let newArray = [];
    const keys = Object.keys(totalNutrients);

    for (const key of keys) {
        const newNutr = Object.create(nutrientObject);
        //console.log("total nutr :" + JSON.stringify(totalNutrients));
        newNutr.name = totalNutrients[key].label;
        newNutr.quantity = totalNutrients[key].quantity;
        newNutr. unit = totalNutrients[key].unit;
        newArray.push(newNutr);
    }
    //console.log("nutr arr: " + JSON.stringify(newArray));
    return newArray;
}

// Converts amounts i.e. "3/4" to numbers like 0.75
function strToNumber(str){
    if (str.indexOf('/') != -1){
        // There is a fraction
        str = str.split("/")
        return parseFloat(str[0]) / parseFloat(str[1]);
    }
    return parseFloat(str);
}

async function getRecipes(){
    let promise = Promise.resolve()
    let newReps = await promise;
    return newReps;

function checkIfSym(str){
	if(str == 'bd') //
		return true;
	if(str == '2153') //
		return true;
	if(str == '2154') 
		return true;
	if(str == 'bc') 
		return true;
	if(str == 'be') 
		return true;
	if(str == '2155')
		return true;
	if(str == '2156') 
		return true;
	if(str == '2157') 
		return true;
	if(str == '2158') 
		return true;
	if(str == '‌2159') 
		return true;
	if(str == '215a') 
		return true;
	if(str == '2150') 
		return true;
	if(str == '215b') 
		return true;
	if(str == '215c') 
		return true;
	if(str == '215d') 
		return true;
	if(str == '215e') 
		return true;
	if(str == '2151')
		return true;
	if(str == '2152')
		return true;
	return false;
}
function convertSymToFloat(str){
	if(str == 'bd'){
		return 0.5;
	}
	else if(str == '2153'){
		return 0.33333;
	}
	else if(str == '2154'){
		return 0.66666;
	}
	else if(str == 'bc'){
		return 0.25;
	}
	else if(str == 'be'){
		return 0.75;
	}
	else if(str == '2155'){
		return 0.2;
	}
	else if(str == '2156'){
		return 0.4;
	}
	else if(str == '2157'){
		return 0.6;
	}
	else if(str == '2158'){
		return 0.8;
	}
	else if(str == '2159'){
		return 0.16666;
	}
	else if(str == '215a'){
		return 0.83333;
	}
	else if(str == '2150'){
		return 0.1428571429;
	}
	else if(str == '215b'){
		return 0.125;
	}
	else if(str == '215c'){
		return 0.375;
	}
	else if(str == '215d'){
		return 0.625;
	}
	else if(str == '215e'){
		return 0.875;
	}
	else if(str == '2151'){
		return 0.11111;
	}
	else if(str == '2152'){
		return 0.1;
	}
}

$(document).ready(function(){
    let lol = generateLink('pineapple');
    httpGetRecipes(lol, e_Callback);
    console.log("lol: " + lol);
    console.log("recipes " + recipes);
    //getIngredientNutrition("apple");
  });