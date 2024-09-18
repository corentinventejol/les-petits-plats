export default class Sorter {
    constructor(label, items, id) {
        this.label = label;
        this.items = items;
        this.id = id;
        this.clicked = false;
        this.DOMElement = this.createDropdown();
    }

    createDropdown() {
        const sorterItem = document.createElement('div');
        sorterItem.classList.add('sorter-item');

        // Création du label
        const labelElement = document.createElement('span');
        labelElement.id = this.id;
        labelElement.innerHTML = `${this.label}<i class="fa-solid fa-chevron-down"></i>`;
        sorterItem.appendChild(labelElement);

        // Conteneur pour les éléments du dropdown
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('sorter-content');
        contentDiv.id = `content-${this.id}`;
        sorterItem.appendChild(contentDiv);

        // Ajout de l'événement de clic pour afficher ou cacher le contenu
        labelElement.addEventListener('click', () => {
            this.clicked = !this.clicked; // Inverse l'état de clic

            // Ajoute ou retire la classe 'sorter--clicked' en fonction de l'état
            if (this.clicked) {
                contentDiv.classList.add('sorter--clicked');
            } else {
                contentDiv.classList.remove('sorter--clicked');
            }
        });

        // Ajoute un champ de recherche
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.classList.add('sorter-search');
        contentDiv.appendChild(searchInput);

        // Conteneur pour les éléments filtrés
        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add('items-container');
        contentDiv.appendChild(itemsContainer);

        // Fonction pour afficher les éléments filtrés
        const displayItems = (filteredItems) => {
            itemsContainer.innerHTML = ''; // Vide les éléments précédents
            filteredItems.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                itemsContainer.appendChild(p);
            });
        };

        // Affiche tous les éléments au départ
        displayItems(this.items);

        // Filtre les éléments en fonction de la saisie
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.toLowerCase();
            const filteredItems = this.items.filter(item => item.toLowerCase().includes(query));
            displayItems(filteredItems);
        }.bind(this)); // Liaison du contexte pour accéder à `this.items`

        return sorterItem;
    }
}
