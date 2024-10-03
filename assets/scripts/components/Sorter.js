export default class Sorter {
    constructor(label, items, id, tagContainer) {
        this.label = label;
        this.items = items;
        this.id = id;
        this.clicked = false;
        this.tagContainer = document.querySelector(tagContainer);
        this.filteredItems = [...items];
        this.removedItems = {};
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
            this.clicked = !this.clicked;
            if (this.clicked) {
                contentDiv.classList.add('sorter--clicked');
            } else {
                contentDiv.classList.remove('sorter--clicked');
            }
        });

        // Conteneur pour l'input et l'icône croix
        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('input-wrapper');
        contentDiv.appendChild(inputWrapper);

        // Ajout du champ de recherche
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.classList.add('sorter-search');
        inputWrapper.appendChild(searchInput);

        // Ajout de l'icône croix à droite (initialement cachée)
        const clearIcon = document.createElement('i');
        clearIcon.classList.add('fa-solid', 'fa-x', 'clear-input');
        clearIcon.classList.add('cross-hidden')
        inputWrapper.appendChild(clearIcon);

        // Événement pour vider le champ de recherche lorsque l'icône est cliquée
        clearIcon.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input')); // Pour mettre à jour la liste après suppression
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
                    const index = this.filteredItems.indexOf(item);
                    this.removedItems[item] = index;
                    this.createTag(item);
                    p.remove();
                    this.filteredItems = this.filteredItems.filter(i => i !== item);
                });
                itemsContainer.appendChild(p);
            });
        };

        displayItems(this.items);

        // Événement de saisie dans le champ de recherche
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.toLowerCase();
            const filteredItems = this.filteredItems.filter(item => item.toLowerCase().includes(query));
            displayItems(filteredItems);

            // Ajouter ou supprimer la classe 'cross-hidden' en fonction du contenu de l'input
            if (searchInput.value.length > 0) {
                clearIcon.classList.remove('cross-hidden'); // Cacher la croix si l'input est vide
            } else {
                clearIcon.classList.add('cross-hidden'); // Afficher la croix si l'input n'est pas vide 
            }
        }.bind(this));

        return sorterItem;
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
            this.updateDropdown();
        });

        tagDiv.appendChild(removeBtn);
        this.tagContainer.appendChild(tagDiv);
    }

    updateDropdown() {
        const contentDiv = document.getElementById(`content-${this.id}`);
        const searchInput = contentDiv.querySelector('.sorter-search');
        const query = searchInput.value.toLowerCase();

        const filteredItems = this.filteredItems.filter(item => item.toLowerCase().includes(query));
        const itemsContainer = contentDiv.querySelector('.items-container');

        itemsContainer.innerHTML = '';
        filteredItems.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            p.classList.add('dropdown-item');
            p.addEventListener('click', () => {
                const index = this.filteredItems.indexOf(item);
                this.removedItems[item] = index;
                this.createTag(item);
                p.remove();
                this.filteredItems = this.filteredItems.filter(i => i !== item);
            });
            itemsContainer.appendChild(p);
        });
    }
}
