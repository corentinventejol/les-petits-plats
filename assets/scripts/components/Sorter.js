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
            for (let i = 0; i < filteredItems.length; i++) {
                const item = filteredItems[i];
                const p = document.createElement('p');
                p.textContent = item;
                p.classList.add('dropdown-item');
                p.addEventListener('click', () => {
                    this.handleItemClick(item, p);
                });

                itemsContainer.appendChild(p);
            }
        };

        displayItems(this.items);

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filteredItems = [];
            for (let i = 0; i < this.filteredItems.length; i++) {
                if (this.filteredItems[i].toLowerCase().includes(query)) {
                    filteredItems.push(this.filteredItems[i]);
                }
            }
            displayItems(filteredItems);

            clearIcon.classList.toggle('cross-hidden', searchInput.value.length === 0);
        });

        return sorterItem;
    }

    handleItemClick(item) {
        this.removedItems[item] = this.filteredItems.indexOf(item);
        const newFilteredItems = [];
        for (let i = 0; i < this.filteredItems.length; i++) {
            if (this.filteredItems[i] !== item) {
                newFilteredItems.push(this.filteredItems[i]);
            }
        }
        this.filteredItems = newFilteredItems;

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

        for (let i = 0; i < this.filteredItems.length; i++) {
            const item = this.filteredItems[i];
            const p = document.createElement('p');
            p.textContent = item;
            p.classList.add('dropdown-item');
            p.addEventListener('click', () => {
                this.handleItemClick(item, p);
            });
            itemsContainer.appendChild(p);
        }
    }

    // Nouvelle méthode pour mettre à jour les éléments
    updateItems(newItems) {
        this.filteredItems = [...newItems];
        this.updateDropdown();
    }
}