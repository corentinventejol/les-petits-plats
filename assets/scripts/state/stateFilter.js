class StateFilter {
    constructor() {
        this.input = '';  // Valeur de la recherche
        this.ingredients = []; // Liste des ingrédients sélectionnés
        this.appliances = []; // Liste des appareils sélectionnés
        this.ustensils = []; // Liste des ustensiles sélectionnés
    }

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
        console.log('État du state après ajout :', this);
    }

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
        console.log('État actuel après suppression :', this);
    }
}

export default StateFilter;
