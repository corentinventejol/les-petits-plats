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

        // Ajout des éléments du dropdown
        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('sorter-item');
            itemDiv.textContent = item;
            contentDiv.appendChild(itemDiv);
        });

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

        return sorterItem;
    }
}
