import database from "../datas/database.js";
import { activeCards } from "../script.js";

export default class Sorter {
    constructor(label, items, id, tagContainer, stateFilter) {
        this.label = label;
        this.items = items;
        this.id = id;
        this.recipes = database.recipes;
        this.clicked = false;
        this.tagContainer = document.querySelector(tagContainer);
        this.filteredItems = [...items];
        this.removedItems = {};
        this.stateFilter = stateFilter; // Référence à l'état global des filtres
        this.DOMElement = this.createDropdown();

        // Variables pour stocker les éléments disponibles
        this.availableIngredients = [];
        this.availableAppliances = [];
        this.availableUstensils = [];
        
        console.log('active cards sorter', activeCards);
    }

    createDropdown() {
        const sorterItem = document.createElement('div');
        sorterItem.classList.add('sorter-item');

        const labelElement = document.createElement('span');
        labelElement.id = this.id;
        labelElement.innerHTML = `${this.label}<i class="fa-solid fa-chevron-down"></i>`;
        sorterItem.appendChild(labelElement);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('sorter-content');
        contentDiv.id = `content-${this.id}`;
        sorterItem.appendChild(contentDiv);

        labelElement.addEventListener('click', () => {
            this.clicked = !this.clicked;
            contentDiv.classList.toggle('sorter--clicked', this.clicked);
        });

        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('input-wrapper');
        contentDiv.appendChild(inputWrapper);

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.classList.add('sorter-search');
        inputWrapper.appendChild(searchInput);

        const clearIcon = document.createElement('i');
        clearIcon.classList.add('fa-solid', 'fa-x', 'clear-input', 'cross-hidden');
        inputWrapper.appendChild(clearIcon);

        clearIcon.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input')); // Met à jour la liste après suppression
        });

        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add('items-container');
        itemsContainer.id = this.id;
        contentDiv.appendChild(itemsContainer);

        const displayItems = (filteredItems) => {
            itemsContainer.innerHTML = '';
            filteredItems.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                p.classList.add('dropdown-item');
                p.addEventListener('click', () => {
                    this.handleItemClick(item, p);
                });

                itemsContainer.appendChild(p);
            });
        };

        displayItems(this.items);

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filteredItems = this.filteredItems.filter(item => item.toLowerCase().includes(query));
            displayItems(filteredItems);

            clearIcon.classList.toggle('cross-hidden', searchInput.value.length === 0);
            this.updateAvailableItems(); // Met à jour les éléments disponibles à chaque entrée
        });

        return sorterItem;
    }

    handleItemClick(item, element) {
        const index = this.filteredItems.indexOf(item);
        this.removedItems[item] = index;
        this.createTag(item);
        element.remove();
        this.filteredItems = this.filteredItems.filter(i => i !== item);

        // Ajoute l'élément au filtre global et au tableau des items sélectionnés
        this.stateFilter.addFilter(this.id, item);

        // Met à jour les éléments disponibles après sélection
        this.updateAvailableItems();
    }

    createTag(tagText) {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('showTag');

        const tagP = document.createElement('p');
        tagP.textContent = tagText;
        tagDiv.appendChild(tagP);

        const removeBtn = document.createElement('div');
        removeBtn.classList.add('remove-btn');

        const removeIcon = document.createElement('i');
        removeIcon.classList.add('fa-solid', 'fa-x');
        removeBtn.appendChild(removeIcon);

        removeBtn.addEventListener('click', () => {
            this.tagContainer.removeChild(tagDiv);
            const originalIndex = this.removedItems[tagText];
            this.filteredItems.splice(originalIndex, 0, tagText);
            delete this.removedItems[tagText];

            // Met à jour le dropdown après la suppression
            this.updateDropdown();
            this.updateAvailableItems(); // Met à jour les éléments disponibles lors de la suppression d'un tag

            // Retirer l'élément du filtre global et du tableau des items sélectionnés
            this.stateFilter.removeFilter(this.id, tagText);
        });

        tagDiv.appendChild(removeBtn);
        this.tagContainer.appendChild(tagDiv);
    }

    async updateAvailableItems() {
        const recipes = await database.getAllRecipes(); // Récupérer les recettes

        // Filtrer les recettes en fonction des éléments actuellement sélectionnés dans stateFilter
        const filteredRecipes = recipes.filter(recipe => {
            const matchesIngredients = this.stateFilter.ingredients.length === 0 || 
                recipe.ingredients.some(ingredient => this.stateFilter.ingredients.includes(ingredient.ingredient));
            const matchesAppliances = this.stateFilter.appliances.length === 0 || 
                this.stateFilter.appliances.includes(recipe.appliance);
            const matchesUstensils = this.stateFilter.ustensils.length === 0 || 
                recipe.ustensils.some(ustensil => this.stateFilter.ustensils.includes(ustensil));

            return matchesIngredients && matchesAppliances && matchesUstensils;
        });

        // Récupérer les ingrédients, appareils et ustensiles des recettes filtrées
        this.availableIngredients = Array.from(new Set(filteredRecipes.flatMap(recipe => recipe.ingredients.map(i => i.ingredient))));
        this.availableAppliances = Array.from(new Set(filteredRecipes.map(recipe => recipe.appliance)));
        this.availableUstensils = Array.from(new Set(filteredRecipes.flatMap(recipe => recipe.ustensils)));

        // Log pour vérifier les items filtrées
        console.log("Available Ingredients:", this.availableIngredients);
        console.log("Available Appliances:", this.availableAppliances);
        console.log("Available Ustensils:", this.availableUstensils);

        // Mettre à jour les listes disponibles dans le dropdown
        this.updateDropdown();
    }

    updateDropdown() {
        // Récupère le conteneur lié à l'ID dynamique "content-{this.id}"
        const itemsContainer = document.querySelector(`#content-${this.id} .items-container`);
        
        // Vide les anciens éléments
        itemsContainer.innerHTML = ''; // Supprime les éléments précédents (tous les <p>)
    
        // Crée des éléments pour chaque catégorie et les ajoute au conteneur principal
        if (this.id === 'ingredients') {
            this.availableIngredients.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                p.classList.add('dropdown-item');
                p.addEventListener('click', () => {
                    this.handleItemClick(item, p);
                });
                itemsContainer.appendChild(p);
            });
        } else if (this.id === 'appliances') {
            this.availableAppliances.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                p.classList.add('dropdown-item');
                p.addEventListener('click', () => {
                    this.handleItemClick(item, p);
                });
                itemsContainer.appendChild(p);
            });
        } else if (this.id === 'ustensils') {
            this.availableUstensils.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                p.classList.add('dropdown-item');
                p.addEventListener('click', () => {
                    this.handleItemClick(item, p);
                });
                itemsContainer.appendChild(p);
            });
        }
    }        

    updateItemsList(ingredients, appliances, ustensils) {
        // Récupère chaque conteneur par son ID (ingredients, appliances, ustensils)
        const ingredientsContainer = document.getElementById('ingredients');
        const appliancesContainer = document.getElementById('appliances');
        const ustensilsContainer = document.getElementById('ustensils');
    
        // Vide l'ancien contenu des conteneurs
        ingredientsContainer.innerHTML = '';
        appliancesContainer.innerHTML = '';
        ustensilsContainer.innerHTML = '';
    
        // Ajoute les ingrédients disponibles dans le conteneur "ingredients"
        ingredients.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            p.classList.add('dropdown-item');
            p.addEventListener('click', () => {
                this.handleItemClick(item, p);
            });
            ingredientsContainer.appendChild(p);
        });
    
        // Ajoute les appareils disponibles dans le conteneur "appliances"
        appliances.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            p.classList.add('dropdown-item');
            p.addEventListener('click', () => {
                this.handleItemClick(item, p);
            });
            appliancesContainer.appendChild(p);
        });
    
        // Ajoute les ustensiles disponibles dans le conteneur "ustensils"
        ustensils.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            p.classList.add('dropdown-item');
            p.addEventListener('click', () => {
                this.handleItemClick(item, p);
            });
            ustensilsContainer.appendChild(p);
        });
    }    
}
