import database from "../scripts/datas/database.js";
import showSorter, { createSorter } from "../scripts/components/Sorter.js";
import displayCard from "../scripts/components/card.js";

const BASE_URL = 'assets/recettes/'; // Base URL des images

// Fonction pour afficher les cartes de recette
async function displayRecipeCards() {
    const recipes = await database.getAllRecipes(); // Assure-toi que cette méthode existe et retourne des données
    const container = document.getElementById('card-grid-container'); // Utilise l'ID du conteneur

    // Vide le conteneur avant d'ajouter les nouvelles cartes
    container.innerHTML = '';

    recipes.forEach(recipe => {
        // Crée la carte avec les données de la recette
        const cardElement = displayCard(
            BASE_URL + recipe.image, // Concaténation de la base URL avec le chemin relatif
            recipe.name,  // Nom de la recette
            recipe.ingredients, // Liste des ingrédients (doit être un tableau d'objets avec `name` et `quantity`)
            recipe.time,  // Temps de préparation
            recipe.description // Description de la recette
        );
        
        // Ajoute la carte au conteneur
        container.appendChild(cardElement);
    });
}

// Fonction d'initialisation
async function init() {
    createSorter(); // Crée la structure HTML de la sorter

    // Écouteurs d'événements pour chaque catégorie
    document.getElementById('ingredient').addEventListener('click', async function () {
        const ingredients = await database.getAllingredients();
        showSorter({ id: 'ingredient' }, ingredients);
    });

    document.getElementById('appareils').addEventListener('click', async function () {
        const appliances = await database.getAllappliance();
        showSorter({ id: 'appareils' }, appliances);
    });

    document.getElementById('ustensiles').addEventListener('click', async function () {
        const ustensils = await database.getAllustensils();
        showSorter({ id: 'ustensiles' }, ustensils);
    });

    // Appelle la fonction pour afficher les cartes de recettes
    displayRecipeCards();
}

// Appelle la fonction d'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', init);
