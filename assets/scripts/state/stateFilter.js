export default class StateFilter {
    constructor() {
        this.state = {
            ingredients: [],
            appliances: [],
            ustensils: [],
            filteredRecipes: [] // Ajouter pour garder la trace des recettes filtrées
        };
    }

    updateState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
    }

    getState() {
        return this.state;
    }

    // Ajouter une méthode pour définir les recettes filtrées
    setFilteredRecipes(recipes) {
        this.state.filteredRecipes = recipes;
    }

    // Obtenez les recettes filtrées
    getFilteredRecipes() {
        return this.state.filteredRecipes;
    }

    addIngredient(ingredient) {
        this.state.ingredients.push(ingredient);
    }

    removeIngredient(ingredient) {
        this.state.ingredients = this.state.ingredients.filter(i => i !== ingredient);
    }

    addAppliance(appliance) {
        this.state.appliances.push(appliance);
    }

    removeAppliance(appliance) {
        this.state.appliances = this.state.appliances.filter(a => a !== appliance);
    }

    addUstensil(ustensil) {
        this.state.ustensils.push(ustensil);
    }

    removeUstensil(ustensil) {
        this.state.ustensils = this.state.ustensils.filter(u => u !== ustensil);
    }
}
