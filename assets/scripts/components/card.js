export default function displayCard(image, name, ingredients, time, description) {
    // Création de l'élément principal
    const card = document.createElement('article');
    card.classList.add('card');
    
    // Création de la section image
    const divImg = document.createElement('div');
    divImg.classList.add('card-image');
    const img = document.createElement('img');
    img.src = image;
    img.alt = name;
    const tag = document.createElement('div');
    tag.classList.add('card-tag');
    tag.textContent = `${time} min`;
    
    divImg.appendChild(img);
    divImg.appendChild(tag);
    
    // Création de la section métadonnées
    const divMetas = document.createElement('div');
    divMetas.classList.add('card-metas');
    const divMetasData = document.createElement('div');
    divMetasData.classList.add('card-metas-data');
    
    // Titre de la recette
    const title = document.createElement('div');
    const spanTitle = document.createElement('span');
    spanTitle.classList.add('card-title');
    spanTitle.textContent = name;
    title.appendChild(spanTitle);
    
    // Description de la recette
    const recipeFlex = document.createElement('div');
    recipeFlex.classList.add('card-recipe-flex');
    const recipeTitle = document.createElement('span');
    recipeTitle.classList.add('card-recipe-title');
    recipeTitle.textContent = 'RECETTE';
    const recipeDescription = document.createElement('span');
    recipeDescription.classList.add('card-recipe');
    recipeDescription.textContent = description;
    
    recipeFlex.appendChild(recipeTitle);
    recipeFlex.appendChild(recipeDescription);
    
    // Ingrédients
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('card-ingredients-containeur');
    const ingredientsTitle = document.createElement('span');
    ingredientsTitle.classList.add('card-ingredients-title');
    ingredientsTitle.textContent = 'INGREDIENTS';
    const ingredientsGrid = document.createElement('div');
    ingredientsGrid.classList.add('card-ingredients-grid');
    
    ingredients.forEach(ingredient => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('ingredients');
        
        const ingredientName = document.createElement('span');
        ingredientName.classList.add('ingredient');
        ingredientName.textContent = ingredient.ingredient;

        const quantityUnitDiv = document.createElement('div');
        quantityUnitDiv.classList.add('quantity-unit-container');
        
        const ingredientQuantity = document.createElement('span');
        ingredientQuantity.classList.add('quantity');
        ingredientQuantity.textContent = ingredient.quantity ? ingredient.quantity : '';

        const ingredientUnit = document.createElement('span');
        ingredientUnit.classList.add('unit');
        ingredientUnit.textContent = ingredient.unit ? ingredient.unit : '';

        quantityUnitDiv.appendChild(ingredientQuantity);
        quantityUnitDiv.appendChild(ingredientUnit);

        ingredientDiv.appendChild(ingredientName);
        ingredientDiv.appendChild(quantityUnitDiv);

        ingredientsGrid.appendChild(ingredientDiv);
    });
    
    ingredientsContainer.appendChild(ingredientsTitle);
    ingredientsContainer.appendChild(ingredientsGrid);
    
    divMetasData.appendChild(title);
    divMetasData.appendChild(recipeFlex);
    divMetasData.appendChild(ingredientsContainer);
    
    divMetas.appendChild(divMetasData);
    
    card.appendChild(divImg);
    card.appendChild(divMetas);
    
    return card;
}
