import database from "./datas/database.js";
import Sorter from '../scripts/components/Sorter.js';
import displayCard from "../scripts/components/card.js";
import StateFilter from "./state/stateFilter.js";

const BASE_URL = 'assets/recettes/';
const stateFilter = new StateFilter(handleStateChange); // Passe handleStateChange comme référence directe

export const activeCards = []; // Stocke les cartes actives

// Instances de Sorter pour chaque filtre
let ingredientFilter, applianceFilter, ustensilsFilter;

// Fonction pour afficher les cartes de recette
async function displayRecipeCards() {
    const recipes = await database.getAllRecipes();
    const container = document.getElementById('card-grid-container'); 
    const recipeNumberElement = document.querySelector('.recipe-number p');

    container.innerHTML = '';

    // Filtrer les recettes en fonction de la recherche et des filtres
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if ((stateFilter.input.length < 3 || matchRecipe(recipe, stateFilter.input)) && matchFilters(recipe)) {
            filteredRecipes.push(recipe);
        }
    }

    recipeNumberElement.textContent = `${filteredRecipes.length} recette(s)`;
    activeCards.length = 0; // Réinitialiser activeCards

    // Afficher les recettes filtrées
    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const cardElement = displayCard(
            BASE_URL + recipe.image,
            recipe.name,
            recipe.ingredients,
            recipe.time,
            recipe.description
        );

        cardElement.classList.add('active');
        container.appendChild(cardElement);

        // Ajouter les informations de la recette au tableau activeCards
        activeCards.push({
            ingredients: recipe.ingredients.map(ing => ing.ingredient),
            appliance: recipe.appliance,
            ustensils: recipe.ustensils,
        });
    }

    // Afficher le message si aucune recette ne correspond
    if (filteredRecipes.length === 0) {
        const message = document.createElement('div');
        message.textContent = `Aucune recette ne contient ‘${stateFilter.input}’. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
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
        stateFilter.appliances.includes(recipe.appliance);

    const matchesUstensils = stateFilter.ustensils.length === 0 || 
        stateFilter.ustensils.every(ustensil => 
            recipe.ustensils.some(rUst => rUst.toLowerCase().includes(ustensil.toLowerCase()))
        );

    return matchesIngredients && matchesAppliances && matchesUstensils;
}

// Fonction pour matcher une recette avec la recherche
function matchRecipe(recipe, searchValue) {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    const matchesTitle = recipe.name.toLowerCase().includes(lowerCaseSearchValue);
    const matchesDescription = recipe.description.toLowerCase().includes(lowerCaseSearchValue);
    const matchesIngredients = recipe.ingredients.some(ingredient => 
        ingredient.ingredient.toLowerCase().includes(lowerCaseSearchValue)
    );

    return matchesTitle || matchesDescription || matchesIngredients;
}

// Fonction pour mettre à jour les dropdowns en fonction des cartes actives
function triggerState() {

    // Extraire les ingrédients, appareils, et ustensiles uniques des cartes actives
    const activeIngredients = [];
    const activeAppliances = [];
    const activeUstensils = [];

    for (let i = 0; i < activeCards.length; i++) {
        const card = activeCards[i];
        for (let j = 0; j < card.ingredients.length; j++) {
            if (!activeIngredients.includes(card.ingredients[j])) {
                activeIngredients.push(card.ingredients[j]);
            }
        }
        if (!activeAppliances.includes(card.appliance)) {
            activeAppliances.push(card.appliance);
        }
        for (let k = 0; k < card.ustensils.length; k++) {
            if (!activeUstensils.includes(card.ustensils[k])) {
                activeUstensils.push(card.ustensils[k]);
            }
        }
    }

    // Vérifier que les instances de filtre sont bien définies
    if (ingredientFilter && applianceFilter && ustensilsFilter) {
        ingredientFilter.updateItems(activeIngredients);
        applianceFilter.updateItems(activeAppliances);
        ustensilsFilter.updateItems(activeUstensils);
    }
}

// Gère les changements d'état pour actualiser les cartes et les dropdowns dans le bon ordre
async function handleStateChange() {
    await displayRecipeCards();   // Assure que les cartes sont mises à jour
    triggerState();               // Ensuite, met à jour les dropdowns
}

// Fonction d'initialisation
async function init() {
    const ingredients = await database.getAllIngredients();
    const appliances = await database.getAllAppliances();
    const ustensils = await database.getAllUstensils();

    ingredientFilter = new Sorter(
        'Ingrédients',
        ingredients,
        'ingredients',
        '.tag-container',
        stateFilter,
        (ingredient) => stateFilter.addIngredient(ingredient),
        (ingredient) => stateFilter.deleteIngredient(ingredient)
    );

    applianceFilter = new Sorter(
        'Appareils',
        appliances,
        'appliances',
        '.tag-container',
        stateFilter,
        (appliance) => stateFilter.addAppliance(appliance),
        (appliance) => stateFilter.deleteAppliance(appliance)
    );

    ustensilsFilter = new Sorter(
        'Ustensiles',
        ustensils,
        'ustensils',
        '.tag-container',
        stateFilter,
        (ustensils) => stateFilter.addUstensil(ustensils),
        (ustensils) => stateFilter.deleteUstensil(ustensils)
    );

    document.querySelector('.sorter').appendChild(ingredientFilter.DOMElement);
    document.querySelector('.sorter').appendChild(applianceFilter.DOMElement);
    document.querySelector('.sorter').appendChild(ustensilsFilter.DOMElement);

    // Ajoute handleStateChange en tant qu'écouteur pour les changements d'état
    stateFilter.addListener(handleStateChange);

    // Appelle l'affichage initial des recettes
    await displayRecipeCards();

    const searchInput = document.querySelector('.header-search-input input[type="text"]');
    const crossIcon = document.querySelector('.header-search-input .fas.fa-times');

    searchInput.value = '';

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.trim();
        stateFilter.updateSearchInput(searchValue);

        if (searchValue.length > 0) {
            crossIcon.classList.remove('cross-hidden');
        } else {
            crossIcon.classList.add('cross-hidden');
        }
    });

    crossIcon.addEventListener('click', () => {
        searchInput.value = '';
        stateFilter.updateSearchInput('');
        crossIcon.classList.add('cross-hidden');
    });
}

// Appelle la fonction d'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', init);