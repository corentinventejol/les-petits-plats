export function createSorter() {
    const sorterContainer = document.querySelector('.sorter');
    const categories = [
        { id: 'ingredient', label: 'Ingrédients' },
        { id: 'appareils', label: 'Appareils' },
        { id: 'ustensiles', label: 'Ustensiles' }
    ];

    categories.forEach(category => {
        const sorterItem = document.createElement('div');
        sorterItem.className = 'sorter-item';

        const span = document.createElement('span');
        span.id = category.id;
        span.innerHTML = `${category.label}<i class="fa-solid fa-chevron-down"></i>`;
        sorterItem.appendChild(span);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'sorter-content';
        contentDiv.id = `content-${category.id}`;
        sorterItem.appendChild(contentDiv);

        sorterContainer.appendChild(sorterItem);
    });
}

export default function showSorter(category, items) {
    const contentId = `content-${category.id}`;
    const container = document.getElementById(contentId);

    // Vérifie si le contenu est déjà ouvert
    if (container.classList.contains('sorter--clicked')) {
        container.classList.remove('sorter--clicked'); // Ferme le contenu si déjà ouvert
        currentlyOpen = null;
    } else {
        // Ferme le contenu actuellement ouvert, le cas échéant
        if (currentlyOpen) {
            currentlyOpen.classList.remove('sorter--clicked');
        }
        container.classList.add('sorter--clicked'); // Ouvre le contenu
        currentlyOpen = container;

        // Vide le conteneur avant de le remplir
        container.innerHTML = '';

        // Ajoute un champ de recherche
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'sorter-search';
        container.appendChild(searchInput);

        // Fonction pour afficher les éléments filtrés
        function displayItems(filteredItems) {
            // Efface les éléments précédents
            const existingItemsContainer = container.querySelector('.items-container');
            if (existingItemsContainer) {
                existingItemsContainer.remove();
            }

            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'items-container';
            filteredItems.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                itemsContainer.appendChild(p);
            });
            container.appendChild(itemsContainer);
        }

        // Affiche tous les éléments au départ
        displayItems(items);

        // Ajoute un écouteur pour filtrer les éléments en fonction de la saisie
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.toLowerCase();
            const filteredItems = items.filter(item => item.toLowerCase().includes(query));
            displayItems(filteredItems); // Affiche les éléments filtrés
        });
    }
}

let currentlyOpen = null; // Variable pour suivre la catégorie actuellement ouverte
