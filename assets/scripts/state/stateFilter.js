class StateFilter {
    constructor(triggerState) {
        this.input = '';  // Valeur de la recherche
        this.ingredients = []; // Liste des ingrédients sélectionnés
        this.appliances = []; // Liste des appareils sélectionnés
        this.ustensils = []; // Liste des ustensiles sélectionnés
        this.listeners = []; // Liste des fonctions à appeler lorsque le state change
        this.triggerState = triggerState; // Stocke la fonction triggerState
    }

    // Ajoute un listener pour réagir aux changements
    addListener(callback) {
        this.listeners.push(callback);
    }

    // Notifie tous les listeners d'un changement de state
    notifyListeners() {
        this.listeners.forEach(callback => callback());
        this.triggerState(); // Appelle triggerState après avoir notifié les listeners
    }

    // Méthode pour mettre à jour la recherche
    updateSearchInput(value) {
        this.input = value;
        this.notifyListeners(); // Appelle les fonctions liées
    }

    // Ajoute un ingrédient
    addIngredient(value) {
        if (!this.ingredients.includes(value)) {
            this.ingredients.push(value);
            console.log(`${value} ajouté aux filtres ingrédients.`);
            this.notifyListeners(); // Notifie les changements
        }
    }

    // Ajoute un appareil
    addAppliance(value) {
        if (!this.appliances.includes(value)) {
            this.appliances.push(value);
            console.log(`${value} ajouté aux filtres appareils.`);
            this.notifyListeners(); // Notifie les changements
        }
    }

    // Ajoute un ustensile
    addUstensil(value) {
        if (!this.ustensils.includes(value)) {
            this.ustensils.push(value);
            console.log(`${value} ajouté aux filtres ustensiles.`);
            this.notifyListeners(); // Notifie les changements
        }
    }

    // Supprime un ingrédient
    deleteIngredient(value) {
        this.ingredients = this.ingredients.filter(ingredient => ingredient !== value);
        console.log(`${value} retiré des filtres ingrédients.`);
        this.notifyListeners(); // Notifie les changements
    }

    // Supprime un appareil
    deleteAppliance(value) {
        this.appliances = this.appliances.filter(appliance => appliance !== value);
        console.log(`${value} retiré des filtres appareils.`);
        this.notifyListeners(); // Notifie les changements
    }

    // Supprime un ustensile
    deleteUstensil(value) {
        this.ustensils = this.ustensils.filter(ustensil => ustensil !== value);
        console.log(`${value} retiré des filtres ustensiles.`);
        this.notifyListeners(); // Notifie les changements
    }
}

export default StateFilter;
