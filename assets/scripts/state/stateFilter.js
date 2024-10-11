import getAllRecipes from '../datas/database.js';

class StateFilter {
    constructor() {
        this.input = '';  // Valeur de la recherche
        this.ingredients = []; // Liste des ingrédients sélectionnés
        this.appliances = []; // Liste des appareils sélectionnés
        this.ustensils = []; // Liste des ustensiles sélectionnés
        this.listeners = []; // Liste des fonctions à appeler lorsque le state change
    }

    // Ajoute un listener pour réagir aux changements
    addListener(callback) {
        this.listeners.push(callback);
    }

    // Notifie tous les listeners d'un changement de state
    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }

    // Méthode pour mettre à jour la recherche
    updateSearchInput(value) {
        this.input = value;
        this.notifyListeners(); // Appelle les fonctions liées
    }

    // Ajoute un filtre selon le type
    addFilter(type, value) {
        switch(type) {
            case 'ingredients':
                if (!this.ingredients.includes(value)) {
                    this.ingredients.push(value);
                }
                break;
            case 'appliances':
                if (!this.appliances.includes(value)) {
                    this.appliances.push(value);
                }
                break;
            case 'ustensils':
                if (!this.ustensils.includes(value)) {
                    this.ustensils.push(value);
                }
                break;
            default:
                console.error('Type de filtre non reconnu');
        }
        this.notifyListeners(); // Appelle les fonctions liées
    }

    // Supprime un filtre selon le type
    removeFilter(type, value) {
        switch(type) {
            case 'ingredients':
                this.ingredients = this.ingredients.filter(ingredient => ingredient !== value);
                break;
            case 'appliances':
                this.appliances = this.appliances.filter(appliance => appliance !== value);
                break;
            case 'ustensils':
                this.ustensils = this.ustensils.filter(ustensil => ustensil !== value);
                break;
            default:
                console.error('Type de filtre non reconnu');
        }
        this.notifyListeners(); // Appelle les fonctions liées
    }

    // Méthode pour filtrer les recettes
    async filterRecipes() {
        const allRecipes = await getAllRecipes();
        return allRecipes.filter(recipe => {
            const matchesInput = this.input ? recipe.name.toLowerCase().includes(this.input.toLowerCase()) : true;
            const matchesIngredients = this.ingredients.length ? this.ingredients.every(ingredient => 
                recipe.ingredients.some(item => item.ingredient.toLowerCase() === ingredient.toLowerCase())) : true;
            const matchesAppliances = this.appliances.length ? this.appliances.includes(recipe.appliance.toLowerCase()) : true;
            const matchesUstensils = this.ustensils.length ? this.ustensils.every(ustensil => 
                recipe.ustensils.map(u => u.toLowerCase()).includes(ustensil.toLowerCase())) : true;

            return matchesInput && matchesIngredients && matchesAppliances && matchesUstensils;
        });
    }
}

export default StateFilter;
