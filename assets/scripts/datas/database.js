import recipes from "../../datas/recipes.js";

// Fonction pour récupérer tous les ingrédients
async function getAllIngredients() {
    const ingredients = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            ingredients.push(recipes[i].ingredients[j].ingredient);
        }
    }
    return removeDuplicatesIgnoreCase(ingredients); // Supprime les doublons
}

// Fonction pour récupérer tous les appareils
async function getAllAppliances() {
    const appliances = [];
    for (let i = 0; i < recipes.length; i++) {
        appliances.push(recipes[i].appliance);
    }
    return removeDuplicatesIgnoreCase(appliances); // Supprime les doublons
}

// Fonction pour récupérer tous les ustensiles
async function getAllUstensils() {
    const ustensils = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            ustensils.push(recipes[i].ustensils[j]);
        }
    }
    return removeDuplicatesIgnoreCase(ustensils); // Supprime les doublons
}

// Fonction pour récupérer toutes les recettes
async function getAllRecipes() {
    const allRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        allRecipes.push({
            id: recipe.id,
            image: recipe.image,
            name: recipe.name,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            time: recipe.time,
            description: recipe.description,
            appliance: recipe.appliance,
            ustensils: recipe.ustensils
        });
    }
    return allRecipes;
}

// Fonction pour supprimer les doublons en ignorant la casse
function removeDuplicatesIgnoreCase(array) {
    const lowerCaseSet = new Set();
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const item = array[i].toLowerCase();
        if (!lowerCaseSet.has(item)) {
            lowerCaseSet.add(item);
            result.push(array[i]);
        }
    }
    return result;
}

export default { getAllRecipes, getAllIngredients, getAllAppliances, getAllUstensils, recipes };
