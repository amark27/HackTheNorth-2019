//document.getElementById('e_out').innerHTML="jsworks";
const e_BASE_LINK = 'https://api.edamam.com/search?';
const e_APP_ID = '4f1ced5e';
const e_APP_KEY = '80e98c7d232cd636d65a70922b58721f';
var inventory = [];
var ingredients = [];
var shoppingList = [];
var itemObject = {
    name:"defaultItemName", // Item name
    amount: 0, // Number of this item
};

var recipeObject = {
    name:"label", // Recipe name
    image:"imgUrl", // Image url
    sourceName: "source", // Name of recipe source
    sourceLink: "sourceLink",
    yield: 0, // Units
    dietLabels: [], //Diet labels: “balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium” (labels are per serving)
    healthLabels: [], //“vegan”, “vegetarian”, “paleo”, “dairy-free”, “gluten-free”, “wheat-free”, “fat-free”, “low-sugar”, “egg-free”, “peanut-free”, “tree-nut-free”, “soy-free”, “fish-free”, “shellfish-free” (labels are per serving)
    ingredientLines: [], //actual words for recipe
    ingredients: [], //ingredients for storage
    instructions: [],
    nutrition: []
};

var nutrientObject = {
    name:"label", // Nutrient name
    quantity:0,
    unit:"unit",
};

//https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
 //https://api.edamam.com/search?q=chicken,apple&app_id=$4f1ced5e&app_key=$80e98c7d232cd636d65a70922b58721f

// Gets shopping list from current inventory and ingredients
// Assumes that ingredients have unique names
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
            let tmpIndex = inventory.findIndex(tmp);
            if (inventory[tmpIndex].amount < ingredients[i].amount){
                // Add difference in amount to shopping list
                const newIngredient = Object.create(itemObject);
                newIngredient.name = ingredients[i].name;
                newIngredient.amount = ingredients[i].amount - inventory[tmpIndex].amount;
                addToShoppingList(shoppingList, newIngredient);
            }
            
        }
    }
}

function addToShoppingList(shoppingList, item){
    // Check if item is already in shopping list, if so incr quantity
    let slength = shoppingList.length;
    for (var i = 0; i < slength; i++){
        if (shoppingList[i].name == item.name){
            shoppingList[i].amount += item.amount;
        }
    }
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
function httpGetAsync(e_Url, e_Callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            e_Callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", e_Url, true); // true for asynchronous 
    xmlHttp.send(null);
}

// Process results from GET request
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
        const newRecipe = Object.create(recipeObject);
        newRecipe.name = hits[i].label;
        newRecipe.image = hits[i].image;
        newRecipe.sourceName = hits[i].source;
        newRecipe.sourceLink = hits[i].url;
        newRecipe.dietLabels = hits[i].dietLabels;
        newRecipe.healthLabels = hits[i].healthLabels;
        newRecipe.ingredientLines = hits[i].ingredientLines;
        //TODO: instructions
        newRecipe.instructions = "See " + hits[i].url;
        newRecipe.ingredients = getIngredientsArray(hits[i].ingredients);
        newRecipe.totalCal = hits[i].calories;
        newRecipe.nutrition = getNutritionArray(hits[i].totalNutrients);
    }


    // 
    console.log("resp: " + JSON.stringify(resp));
}

// Gets an array of itemObjects (ingredients) from an array of ingredients as text
function getIngredientsArray(ingredientTextArray){
    //ingredientTextArray is an array of ingredients as text as quantity + ingredient
    let newArray = [];
    let num_ingredients = ingredientTextArray.length;

    // If theres no ingredients
    if (num_ingredients == 0){
        return newArray;
    }

    // If there is ingredients
    for (var i = 0; i < num_ingredients; i++){
        const newIngredient = Object.create(itemObject);
        newIngredient.name = ingredientTextArray[i].substr(ingredientTextArray.indexOf(' ') + 1);
        newIngredient.amount = strToNumber(ingredientTextArray[i].substr(0, ingredientTextArray.indexOf(' ')));
        newArray.push(newIngredient);
    }
    return newArray;
}

function getNutritionArray(totalNutrients){
    let newArray = [];
    const keys = Object.keys(fruits);

    for (const key of keys) {
        const newNutr = Object.create(nutrientObject);
        newNutr.name = totalNutrients.key.label;
        newNutr.quantity = totalNutrients.key.quantity;
        newNutr. unit = totalNutrients.key.unit;
        newArray.push(newNutr);
    }
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


$(document).ready(function(){
    console.log("hi");
    let lol = generateLink('pineapple');
    console.log("lol: " + lol);

    httpGetAsync(lol, e_Callback);
  });