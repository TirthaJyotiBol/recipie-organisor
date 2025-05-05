import { eventBus } from '../services/eventBus.js';
import { loadRecipes } from '../services/storageService.js';

// Search and filter component
export function initSearchBar(container) {
  if (!container) return;
  
  // Render search bar
  renderSearchBar(container);
  
  // Attach event listeners
  const searchInput = container.querySelector('#recipe-search');
  const categoryFilter = container.querySelector('#category-filter');
  
  searchInput.addEventListener('input', handleSearch);
  categoryFilter.addEventListener('change', handleCategoryFilter);
  
  // Subscribe to events
  eventBus.subscribe('requestRecipes', () => {
    const recipes = loadRecipes();
    eventBus.publish('recipesLoaded', recipes);
  });
}

// Render search bar
function renderSearchBar(container) {
  container.innerHTML = `
    <div class="search-bar">
      <div class="search-input">
        <input 
          type="text" 
          id="recipe-search" 
          placeholder="Search recipes by title or ingredient..."
        >
      </div>
      <div class="filter-select">
        <select id="category-filter">
          <option value="">All Categories</option>
          <option value="snacks">Snacks</option>
          <option value="desert">Dessert</option>
          <option value="main">Main Course</option>
        </select>
      </div>
    </div>
  `;
}

// Handle search input
function handleSearch() {
  applyFilters();
}

// Handle category filter
function handleCategoryFilter() {
  applyFilters();
}

// Apply search and filter
function applyFilters() {
  const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
  const categoryFilter = document.getElementById('category-filter').value;
  
  // Get all recipes
  const allRecipes = loadRecipes();
  
  // Filter recipes
  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm) || 
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm)
      );
      
    const matchesCategory = 
      categoryFilter === '' || recipe.category === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });
  
  // Publish filtered results
  eventBus.publish('searchResults', filteredRecipes);
}