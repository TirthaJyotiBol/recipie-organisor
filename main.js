import { initRecipeForm } from './components/recipeForm.js';
import { initRecipeList } from './components/recipeList.js';
import { initSearchBar } from './components/searchBar.js';
import { loadRecipes } from './services/storageService.js';
import { eventBus } from './services/eventBus.js';

// Initialize the application
function initApp() {
  // Initialize components
  initRecipeForm(document.getElementById('recipe-form-container'));
  initRecipeList(document.getElementById('recipes-container'));
  initSearchBar(document.getElementById('search-container'));
  
  // Load initial data
  const recipes = loadRecipes();
  
  // Publish initial recipes loaded event
  eventBus.publish('recipesLoaded', recipes);
  
  console.log('Recipe Organizer initialized successfully');
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);