import recipes from "../../datas/recipes.js";

// Fonction pour récupérer tous les ingrédients
async function getAllIngredients() {
    const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(i => i.ingredient));
    return removeDuplicatesIgnoreCase(ingredients); // Supprime les doublons
}

// Fonction pour récupérer tous les appareils
async function getAllAppliances() {
    const appliances = recipes.map(recipe => recipe.appliance);
    return removeDuplicatesIgnoreCase(appliances); // Supprime les doublons
}

// Fonction pour récupérer tous les ustensiles
async function getAllUstensils() {
    const ustensils = recipes.flatMap(recipe => recipe.ustensils);
    return removeDuplicatesIgnoreCase(ustensils); // Supprime les doublons
}

// Fonction pour récupérer toutes les recettes
async function getAllRecipes() {
    return recipes.map(recipe => {
        return {
            id: recipe.id,
            image: recipe.image,
            name: recipe.name,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            time: recipe.time,
            description: recipe.description,
            appliance: recipe.appliance,
            ustensils: recipe.ustensils
        };
    });
}

// Fonction pour supprimer les doublons en ignorant la casse
function removeDuplicatesIgnoreCase(array) {
    const lowerCaseSet = new Set(array.map(item => item.toLowerCase()));
    return array.filter((item) => {
        if (lowerCaseSet.has(item.toLowerCase())) {
            lowerCaseSet.delete(item.toLowerCase());
            return true;
        }
        return false;
    });
}

export default { getAllRecipes, getAllIngredients, getAllAppliances, getAllUstensils, recipes };
