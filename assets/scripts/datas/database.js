import recipes from "../../datas/recipes.js";

// Fonction pour récupérer tous les ingrédients
async function getAllingredients() {
    const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(i => i.ingredient));
    return [...new Set(ingredients)]; // Supprime les doublons
}

// Fonction pour récupérer tous les appareils
async function getAllappliance() {
    const appliances = recipes.map(recipe => recipe.appliance);
    return [...new Set(appliances)]; // Supprime les doublons
}

// Fonction pour récupérer tous les ustensiles
async function getAllustensils() {
    const ustensils = recipes.flatMap(recipe => recipe.ustensils);
    return [...new Set(ustensils)]; // Supprime les doublons
}

// Facultatif : une fonction pour récupérer toutes les recettes si nécessaire
async function getAllRecipes() {
    return recipes;
}

export default { getAllRecipes, getAllingredients, getAllappliance, getAllustensils };
