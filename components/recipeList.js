import { eventBus } from '../services/eventBus.js';
import { deleteRecipe } from '../services/storageService.js';

// Recipe list component
export function initRecipeList(container) {
  if (!container) return;
  
  // Subscribe to events
  eventBus.subscribe('recipesLoaded', recipes => renderRecipeList(container, recipes));
  eventBus.subscribe('recipeAdded', () => eventBus.publish('refreshRecipes'));
  eventBus.subscribe('refreshRecipes', () => eventBus.publish('requestRecipes'));
  eventBus.subscribe('searchResults', recipes => renderRecipeList(container, recipes));
  
  // Request initial recipes
  eventBus.publish('requestRecipes');
}

// Render the recipe list
function renderRecipeList(container, recipes) {
  if (!recipes || recipes.length === 0) {
    renderEmptyState(container);
    return;
  }
  
  const recipeCards = recipes.map(recipe => createRecipeCard(recipe)).join('');
  
  container.innerHTML = `
    <div class="recipes-list">
      <h2>Your Recipes</h2>
      <div class="recipe-cards">
        ${recipeCards}
      </div>
    </div>
  `;
  
  // Add event listeners to recipe cards
  attachRecipeCardListeners(container);
}

// Create HTML for a recipe card
function createRecipeCard(recipe) {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-card-header">
        <h3>${recipe.title}</h3>
        <span class="recipe-card-category category-${recipe.category}">${recipe.category}</span>
      </div>
      <div class="recipe-card-content">
        <div class="recipe-card-section recipe-card-ingredients">
          <h4>Ingredients</h4>
          <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
        <div class="recipe-card-section recipe-card-steps">
          <h4>Preparation</h4>
          <div>${recipe.steps}</div>
        </div>
        <button class="delete-recipe" data-id="${recipe.id}">Delete Recipe</button>
      </div>
    </div>
  `;
}

// Render empty state when no recipes
function renderEmptyState(container) {
  container.innerHTML = `
    <div class="empty-state">
      <h2>No Recipes Found</h2>
      <p>Add your first recipe using the form!</p>
    </div>
  `;
}

// Attach event listeners to recipe cards
function attachRecipeCardListeners(container) {
  // Toggle recipe expansion
  const recipeHeaders = container.querySelectorAll('.recipe-card-header');
  recipeHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('expanded');
    });
  });
  
  // Delete recipe
  const deleteButtons = container.querySelectorAll('.delete-recipe');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const recipeId = button.getAttribute('data-id');
      deleteRecipe(recipeId);
      eventBus.publish('refreshRecipes');
    });
  });
}