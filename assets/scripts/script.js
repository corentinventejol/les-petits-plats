import database from "../scripts/datas/database.js";
import Sorter from '../scripts/components/Sorter.js'; 
import displayCard from "../scripts/components/card.js";

const BASE_URL = 'assets/recettes/'; // Base URL des images

// Fonction pour afficher les cartes de recette
async function displayRecipeCards(searchValue = '') {
    const recipes = await database.getAllRecipes(); 
    const container = document.getElementById('card-grid-container'); // Utilise l'ID du conteneur
    const recipeNumberElement = document.querySelector('.recipe-number p'); // Sélectionner l'élément qui affiche le nombre de recettes

    // Vide le conteneur avant d'ajouter les nouvelles cartes
    container.innerHTML = '';

    // Filtrer les recettes en fonction de la recherche
    const filteredRecipes = recipes.filter(recipe => 
        searchValue.length < 3 || matchRecipe(recipe, searchValue)
    );

    // Mettre à jour le nombre de recettes affichées
    recipeNumberElement.textContent = `${filteredRecipes.length} recette(s)`; // Actualise le nombre

    // Afficher les recettes filtrées
    filteredRecipes.forEach(recipe => {
        const cardElement = displayCard(
            BASE_URL + recipe.image,
            recipe.name,
            recipe.ingredients,
            recipe.time,
            recipe.description
        );
        container.appendChild(cardElement);
    });

    // Afficher le message si aucune recette ne correspond
    if (filteredRecipes.length === 0) {
        const message = document.createElement('div');
        message.textContent = `Aucune recette ne contient ‘${searchValue}’. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        container.appendChild(message);
    }
}

// Fonction pour matcher une recette avec la recherche
function matchRecipe(recipe, searchValue) {
    const lowerSearch = searchValue.toLowerCase();

    const matchesName = recipe.name.toLowerCase().includes(lowerSearch);
    const matchesDescription = recipe.description.toLowerCase().includes(lowerSearch);
    const matchesIngredients = recipe.ingredients.some(ingredient => 
        ingredient.ingredient.toLowerCase().includes(lowerSearch)
    );

    return matchesName || matchesDescription || matchesIngredients;
}

// Fonction d'initialisation
async function init() {
    const ingredientsSorter = new Sorter('Ingrédients', await database.getAllingredients(), 'ingredients', '.tag-container');
    const appliancesSorter = new Sorter('Appareils', await database.getAllappliance(), 'appliances', '.tag-container');
    const ustensilsSorter = new Sorter('Ustensiles', await database.getAllustensils(), 'ustensils', '.tag-container');

    const sorterContainer = document.querySelector('.sorter');

    sorterContainer.appendChild(ingredientsSorter.DOMElement);
    sorterContainer.appendChild(appliancesSorter.DOMElement);
    sorterContainer.appendChild(ustensilsSorter.DOMElement);

    displayRecipeCards();

    const searchInput = document.querySelector('.header-search-input input[type="text"]');
    const crossIcon = document.querySelector('.header-search-input .fas.fa-times');

    // Vider la valeur de recherche au chargement de la page
    searchInput.value = '';

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.trim();
        displayRecipeCards(searchValue);

        // Afficher la croix si la valeur n'est pas vide
        if (searchValue.length > 0) {
            crossIcon.classList.remove('cross-hidden'); // Cacher la croix si l'input est vide
        } else {
            crossIcon.classList.add('cross-hidden'); // Afficher la croix si l'input n'est pas vide
        }
    });
}

// Appelle la fonction d'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', init);
