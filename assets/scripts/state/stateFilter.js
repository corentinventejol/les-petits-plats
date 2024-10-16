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
        let added = false; // Variable pour suivre si l'élément a été ajouté

        switch(type) {
            case 'ingredients':
                if (!this.ingredients.includes(value)) {
                    this.ingredients.push(value);
                    added = true;
                }
                break;
            case 'appliances':
                if (!this.appliances.includes(value)) {
                    this.appliances.push(value);
                    added = true;
                }
                break;
            case 'ustensils':
                if (!this.ustensils.includes(value)) {
                    this.ustensils.push(value);
                    added = true;
                }
                break;
            default:
                console.error('Type de filtre non reconnu');
        }

        if (added) {
            console.log(`${value} ajouté aux filtres ${type}.`);
        } else {
            console.log(`${value} est déjà dans les filtres ${type}.`);
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
}

export default StateFilter;
