// Fonction pour afficher les éléments dans une div en colonnes

export default function showSorter(category, items) {
    const contentId = `content-${category.id}`;
    const container = document.getElementById(contentId);

    // Vérifie si le contenu est déjà ouvert
    if (container.style.display === 'block') {
        container.style.display = 'none'; // Ferme le contenu si déjà ouvert
        currentlyOpen = null;
    } else {
        // Ferme le contenu actuellement ouvert, le cas échéant
        if (currentlyOpen) {
            currentlyOpen.style.display = 'none';
        }
        container.style.display = 'block'; // Ouvre le contenu
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
