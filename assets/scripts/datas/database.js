import recipes from "../../datas/recipes.js";

// Fonction pour récupérer tous les ingrédients
async function getAllingredients() {
    const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(i => i.ingredient));
    return removeDuplicatesIgnoreCase(ingredients); // Supprime les doublons
}

// Fonction pour récupérer tous les appareils
async function getAllappliance() {
    const appliances = recipes.map(recipe => recipe.appliance);
    return removeDuplicatesIgnoreCase(appliances); // Supprime les doublons
}

// Fonction pour récupérer tous les ustensiles
async function getAllustensils() {
    const ustensils = recipes.flatMap(recipe => recipe.ustensils);
    return removeDuplicatesIgnoreCase(ustensils); // Supprime les doublons
}

// Facultatif : une fonction pour récupérer toutes les recettes si nécessaire
async function getAllRecipes() {
    return recipes;
}

function removeDuplicatesIgnoreCase(array) {
    // Utilisation d'un Set pour supprimer les doublons sans tenir compte de la casse
    const lowerCaseSet = new Set(array.map(item => item.toLowerCase()));

    // Filtrer les éléments en utilisant le Set pour éviter les doublons
    return array.filter((item, index) => {
        // On vérifie et enlève chaque élément du Set après utilisation pour ne pas répéter
        if (lowerCaseSet.has(item.toLowerCase())) {
            lowerCaseSet.delete(item.toLowerCase());
            return true;
        }
        return false;
    });
}

export default { getAllRecipes, getAllingredients, getAllappliance, getAllustensils };
