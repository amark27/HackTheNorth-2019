document.getElementById('e_out').innerHTML="jsworks";

const e_BASE_LINK = 'https://api.edamam.com/search?';
const e_APP_ID = '4f1ced5e';
const e_APP_KEY = '80e98c7d232cd636d65a70922b58721f';
var inventory = [];
var ingredients = [];
var diet = [];
var health = [];
var shoppingList = [];
var itemObject = {
    name:"defaultItemName", // Item name
    amount: 0, // Number of this item
    unit: "unit" // Unit name
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
            newIngredient.unit = ingredients[i].unit;
            addToShoppingList(shoppingList, newIngredient);
        } else {
            // Includes ingredient
            let tmpIndex = inventory.findIndex(tmp);
            if (inventory[tmpIndex].amount < ingredients[i].amount){
                // Add difference in amount to shopping list
                const newIngredient = Object.create(itemObject);
                newIngredient.name = ingredients[i].name;
                newIngredient.amount = ingredients[i].amount - inventory[tmpIndex].amount;
                newIngredient.unit = ingredients[i].unit;
                addToShoppingList(shoppingList, newIngredient);
            }
            
        }
    }
}

function addToShoppingList(shoppingList, item){
    // Check if item is already in shopping list, if so incr quantity
    //TODO:
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

var HttpClient = function() {
    this.get = function(e_Url, e_Callback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            e_Callback(anHttpRequest.responseText);
        };

        anHttpRequest.open( "GET", e_Url, true );            
        anHttpRequest.send( null );
    };
};

function makeEdamamRequest(ingredients, ){
    var client = new HttpClient();
    client.get(getEdamamLink, function(response) {
        return response;
    });
}


function e_Callback(response){
    // TODO
}
