export default class Sorter {
    constructor(label, items, id, tagContainer, stateFilter, addElement, deleteElement) {
        this.label = label;
        this.items = items;
        this.id = id;
        this.tagContainer = document.querySelector(tagContainer);
        this.filteredItems = [...items];
        this.removedItems = {};
        this.stateFilter = stateFilter;
        this.addElement = addElement;
        this.deleteElement = deleteElement;
        this.DOMElement = this.createDropdown();
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
            contentDiv.classList.toggle('sorter--clicked');
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
            searchInput.dispatchEvent(new Event('input'));
        });

        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add('items-container');
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
        });

        return sorterItem;
    }

    handleItemClick(item) {
        this.removedItems[item] = this.filteredItems.indexOf(item);
        this.filteredItems = this.filteredItems.filter(i => i !== item);

        this.createTag(item);
        this.addElement(item);
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

            this.filteredItems.splice(this.removedItems[tagText], 0, tagText);
            delete this.removedItems[tagText];

            this.updateDropdown();
            this.deleteElement(tagText);
        });

        tagDiv.appendChild(removeBtn);
        this.tagContainer.appendChild(tagDiv);
    }

    updateDropdown() {
        const itemsContainer = document.querySelector(`#content-${this.id} .items-container`);
        itemsContainer.innerHTML = '';

        this.filteredItems.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            p.classList.add('dropdown-item');
            p.addEventListener('click', () => {
                this.handleItemClick(item, p);
            });
            itemsContainer.appendChild(p);
        });
    }

    // Nouvelle méthode pour mettre à jour les éléments
    updateItems(newItems) {
        this.filteredItems = [...newItems];
        this.updateDropdown();
    }
}





// ****************
// ancien code ci-dessous
// ****************

// import database from "../datas/database.js";
// import { activeCards } from "../script.js";

// export default class Sorter {
//     constructor(label, items, id, tagContainer, stateFilter) {
//         this.label = label;
//         this.items = items;
//         this.id = id;
//         this.recipes = database.recipes;
//         this.clicked = false;
//         this.tagContainer = document.querySelector(tagContainer);
//         this.filteredItems = [...items];
//         this.removedItems = {};
//         this.stateFilter = stateFilter; // Référence à l'état global des filtres
//         this.DOMElement = this.createDropdown();

//         this.addElement = addElement
//         this.deleteElement = deleteElement

//         // Variables pour stocker les éléments disponibles
//         this.availableIngredients = [];
//         this.availableAppliances = [];
//         this.availableUstensils = [];

//         console.log('state :', this.stateFilter)
//     }

//     createDropdown() {
//         const sorterItem = document.createElement('div');
//         sorterItem.classList.add('sorter-item');

//         const labelElement = document.createElement('span');
//         labelElement.id = this.id;
//         labelElement.innerHTML = `${this.label}<i class="fa-solid fa-chevron-down"></i>`;
//         sorterItem.appendChild(labelElement);

//         const contentDiv = document.createElement('div');
//         contentDiv.classList.add('sorter-content');
//         contentDiv.id = `content-${this.id}`;
//         sorterItem.appendChild(contentDiv);

//         labelElement.addEventListener('click', () => {
//             this.clicked = !this.clicked;
//             contentDiv.classList.toggle('sorter--clicked', this.clicked);
//         });

//         const inputWrapper = document.createElement('div');
//         inputWrapper.classList.add('input-wrapper');
//         contentDiv.appendChild(inputWrapper);

//         const searchInput = document.createElement('input');
//         searchInput.type = 'text';
//         searchInput.classList.add('sorter-search');
//         inputWrapper.appendChild(searchInput);

//         const clearIcon = document.createElement('i');
//         clearIcon.classList.add('fa-solid', 'fa-x', 'clear-input', 'cross-hidden');
//         inputWrapper.appendChild(clearIcon);

//         clearIcon.addEventListener('click', () => {
//             searchInput.value = '';
//             searchInput.dispatchEvent(new Event('input')); // Met à jour la liste après suppression
//         });

//         const itemsContainer = document.createElement('div');
//         itemsContainer.classList.add('items-container');
//         itemsContainer.id = this.id;
//         contentDiv.appendChild(itemsContainer);

//         const displayItems = (filteredItems) => {
//             itemsContainer.innerHTML = '';
//             filteredItems.forEach(item => {
//                 const p = document.createElement('p');
//                 p.textContent = item;
//                 p.classList.add('dropdown-item');
//                 p.addEventListener('click', () => {
//                     this.handleItemClick(item, p);
//                 });

//                 itemsContainer.appendChild(p);
//             });
//         };

//         displayItems(this.items);

//         searchInput.addEventListener('input', () => {
//             const query = searchInput.value.toLowerCase();
//             const filteredItems = this.filteredItems.filter(item => item.toLowerCase().includes(query));
//             displayItems(filteredItems);

//             clearIcon.classList.toggle('cross-hidden', searchInput.value.length === 0);
//         });

//         return sorterItem;
//     }

//     handleItemClick(item, element) {
//         // Supprimer l'élément cliqué de la liste des items filtrés
//         const index = this.filteredItems.indexOf(item);
//         this.removedItems[item] = index; // Enregistrer l'index pour le restaurer plus tard
//         element.remove(); // Supprime l'élément du dropdown
//         this.filteredItems = this.filteredItems.filter(i => i !== item);

//         // Crée un tag et met à jour l'état
//         this.createTag(item);

//         // Ajoute l'élément au filtre global
//         this.addElement();

//         // Met à jour les autres filtres et dropdowns
//         this.updateAvailableItems();
//     }

//     createTag(tagText) {
//         const tagDiv = document.createElement('div');
//         tagDiv.classList.add('showTag');

//         const tagP = document.createElement('p');
//         tagP.textContent = tagText;
//         tagDiv.appendChild(tagP);

//         const removeBtn = document.createElement('div');
//         removeBtn.classList.add('remove-btn');

//         const removeIcon = document.createElement('i');
//         removeIcon.classList.add('fa-solid', 'fa-x');
//         removeBtn.appendChild(removeIcon);

//         removeBtn.addEventListener('click', () => {
//             this.tagContainer.removeChild(tagDiv);

//             // Restaurer l'item dans la liste dropdown
//             this.filteredItems.splice(this.removedItems[tagText], 0, tagText);
//             delete this.removedItems[tagText]; // Supprime l'index sauvegardé

//             // Rafraîchir la liste des dropdowns
//             this.updateDropdown();

//             // Retirer l'élément du filtre global
//             this.stateFilter.removeFilter(this.id, tagText);

//             // Mettre à jour les autres filtres après suppression
//             this.updateAvailableItems();
//         });

//         tagDiv.appendChild(removeBtn);
//         this.tagContainer.appendChild(tagDiv);
//     }

//     async updateAvailableItems() {
//         const recipes = await database.getAllRecipes(); // Récupérer les recettes filtrées

//         // Filtrer les recettes en fonction des filtres appliqués dans stateFilter
//         const filteredRecipes = recipes.filter(recipe => {
//             const matchesIngredients = this.stateFilter.ingredients.length === 0 || 
//                 recipe.ingredients.some(ingredient => this.stateFilter.ingredients.includes(ingredient.ingredient));
//             const matchesAppliances = this.stateFilter.appliances.length === 0 || 
//                 this.stateFilter.appliances.includes(recipe.appliance);
//             const matchesUstensils = this.stateFilter.ustensils.length === 0 || 
//                 recipe.ustensils.some(ustensil => this.stateFilter.ustensils.includes(ustensil));

//             return matchesIngredients && matchesAppliances && matchesUstensils;
//         });

//         // Mettre à jour les éléments disponibles
//         this.availableIngredients = Array.from(new Set(filteredRecipes.flatMap(recipe => recipe.ingredients.map(i => i.ingredient))));
//         this.availableAppliances = Array.from(new Set(filteredRecipes.map(recipe => recipe.appliance)));
//         this.availableUstensils = Array.from(new Set(filteredRecipes.flatMap(recipe => recipe.ustensils)));

//         console.log('availableIngredients :',this.availableIngredients)
//         console.log('availableAppliances :',this.availableAppliances)
//         console.log('availableUstensils :',this.availableUstensils)

//         // Rafraîchir **tous** les dropdowns pour refléter les éléments disponibles
//         this.updateAllDropdowns();
//     }

//     updateAllDropdowns() {
//         const updateDropdownForCategory = (categoryId, availableItems) => {
//             const itemsContainer = document.querySelector(`#content-${categoryId} .items-container`);
//             itemsContainer.innerHTML = ''; // Vider les anciens items

//             availableItems.forEach(item => {
//                 const p = document.createElement('p');
//                 p.textContent = item;
//                 p.classList.add('dropdown-item');
//                 p.addEventListener('click', () => {
//                     this.handleItemClick(item, p);
//                 });
//                 itemsContainer.appendChild(p);
//             });
//         };

//         // Mettre à jour chaque dropdown selon sa catégorie
//         updateDropdownForCategory('ingredients', this.availableIngredients);
//         updateDropdownForCategory('appliances', this.availableAppliances);
//         updateDropdownForCategory('ustensils', this.availableUstensils);
//     }

//     updateDropdown() {
//         const itemsContainer = document.querySelector(`#content-${this.id} .items-container`);
//         itemsContainer.innerHTML = ''; // Vider les anciens items

//         this.filteredItems.forEach(item => {
//             const p = document.createElement('p');
//             p.textContent = item;
//             p.classList.add('dropdown-item');
//             p.addEventListener('click', () => {
//                 this.handleItemClick(item, p);
//             });
//             itemsContainer.appendChild(p);
//         });
//     }
// }
