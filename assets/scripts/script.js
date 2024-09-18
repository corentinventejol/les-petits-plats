import database from "../scripts/datas/database.js";
import Sorter from '../scripts/components/Sorter.js'; 
import displayCard from "../scripts/components/card.js";

const BASE_URL = 'assets/recettes/'; // Base URL des images

// Fonction pour afficher les cartes de recette
async function displayRecipeCards() {
    const recipes = await database.getAllRecipes(); 
    const container = document.getElementById('card-grid-container'); // Utilise l'ID du conteneur

    // Vide le conteneur avant d'ajouter les nouvelles cartes
    container.innerHTML = '';

    recipes.forEach(recipe => {
        // Crée la carte avec les données de la recette
        const cardElement = displayCard(
            BASE_URL + recipe.image, // Concaténation de la base URL avec le chemin relatif
            recipe.name,  // Nom de la recette
            recipe.ingredients, // Liste des ingrédients 
            recipe.time,  // Temps de préparation
            recipe.description // Description de la recette
        );
        
        // Ajoute la carte au conteneur
        container.appendChild(cardElement);
    });
}

// Fonction d'initialisation
async function init() {
    // Crée des instances de Sorter pour chaque catégorie
    const ingredientsSorter = new Sorter('Ingrédients', await database.getAllingredients());
    const appliancesSorter = new Sorter('Appareils', await database.getAllappliance());
    const ustensilsSorter = new Sorter('Ustensiles', await database.getAllustensils());

    // Récupère le conteneur où placer les sorters
    const sorterContainer = document.querySelector('.sorter');

    // Ajoute les sorters au DOM
    sorterContainer.appendChild(ingredientsSorter.DOMElement);
    sorterContainer.appendChild(appliancesSorter.DOMElement);
    sorterContainer.appendChild(ustensilsSorter.DOMElement);

    // Appelle la fonction pour afficher les cartes de recettes
    displayRecipeCards();
}

// Appelle la fonction d'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', init);
