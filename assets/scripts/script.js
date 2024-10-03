import database from "../scripts/datas/database.js";
import Sorter from '../scripts/components/Sorter.js';
import displayCard from "../scripts/components/card.js";
import StateFilter from "./state/stateFilter.js";

const BASE_URL = 'assets/recettes/'; // Base URL des images
const stateFilter = new StateFilter(); // Instance de StateFilter

// Fonction pour afficher les cartes de recette
async function displayRecipeCards(searchValue = '') {
    const recipes = await database.getAllRecipes();
    const container = document.getElementById('card-grid-container'); // Utilise l'ID du conteneur
    const recipeNumberElement = document.querySelector('.recipe-number p'); // Sélectionner l'élément qui affiche le nombre de recettes

    // Vide le conteneur avant d'ajouter les nouvelles cartes
    container.innerHTML = '';

    // Filtrer les recettes en fonction de la recherche et des filtres
    const filteredRecipes = recipes.filter(recipe => 
        (searchValue.length < 3 || matchRecipe(recipe, searchValue)) &&
        matchFilters(recipe)
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

// Fonction pour matcher une recette avec les filtres sélectionnés
function matchFilters(recipe) {
    const matchesIngredients = stateFilter.ingredients.length === 0 || 
        stateFilter.ingredients.every(ingredient => 
            recipe.ingredients.some(rIng => rIng.ingredient.toLowerCase().includes(ingredient.toLowerCase()))
        );
    
    const matchesAppliances = stateFilter.appliances.length === 0 || 
        stateFilter.appliances.includes(recipe.appliance.toLowerCase());

    const matchesUstensils = stateFilter.ustensils.length === 0 || 
        stateFilter.ustensils.every(ustensil => 
            recipe.ustensils.some(rUst => rUst.toLowerCase().includes(ustensil.toLowerCase()))
        );

    return matchesIngredients && matchesAppliances && matchesUstensils;
}

// Fonction pour matcher une recette avec la recherche
function matchRecipe(recipe, searchValue) {
    return recipe.name.toLowerCase().includes(searchValue.toLowerCase());
}

// Fonction d'initialisation
async function init() {
    const ingredientsSorter = new Sorter('Ingrédients', await database.getAllIngredients(), 'ingredients', '.tag-container', stateFilter);
    const appliancesSorter = new Sorter('Appareils', await database.getAllAppliances(), 'appliances', '.tag-container', stateFilter);
    const ustensilsSorter = new Sorter('Ustensiles', await database.getAllUstensils(), 'ustensils', '.tag-container', stateFilter);

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
        stateFilter.input = searchValue; // Mettre à jour l'état avec la valeur de recherche
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
