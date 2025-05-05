import { saveRecipe } from '../services/storageService.js';
import { eventBus } from '../services/eventBus.js';

// Recipe form component
export function initRecipeForm(container) {
  if (!container) return;
  
  // Render the form
  renderForm(container);
  
  // Attach event listeners
  const form = container.querySelector('#recipe-form');
  form.addEventListener('submit', handleFormSubmit);
}

// Render the recipe form
function renderForm(container) {
  container.innerHTML = `
    <div class="recipe-form-container">
      <h2>Add New Recipe</h2>
      <form id="recipe-form">
        <div class="form-group">
          <label for="recipe-title">Recipe Title</label>
          <input 
            type="text" 
            id="recipe-title" 
            name="title" 
            required 
            placeholder="Enter recipe title"
          >
        </div>
        
        <div class="form-group">
          <label for="recipe-category">Category</label>
          <select id="recipe-category" name="category" required>
            <option value="">Select a category</option>
            <option value="snacks">Snacks</option>
            <option value="desert">Dessert</option>
            <option value="main">Main Course</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="recipe-ingredients">Ingredients (one per line)</label>
          <textarea 
            id="recipe-ingredients" 
            name="ingredients" 
            required 
            placeholder="Enter ingredients, one per line"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="recipe-steps">Preparation Steps</label>
          <textarea 
            id="recipe-steps" 
            name="steps" 
            required 
            placeholder="Enter preparation steps"
          ></textarea>
        </div>
        
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  `;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form values
  const title = document.getElementById('recipe-title').value.trim();
  const category = document.getElementById('recipe-category').value;
  const ingredientsText = document.getElementById('recipe-ingredients').value.trim();
  const steps = document.getElementById('recipe-steps').value.trim();
  
  // Parse ingredients from text area (one per line)
  const ingredients = ingredientsText.split('\n')
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  // Create recipe object
  const recipe = {
    title,
    category,
    ingredients,
    steps
  };
  
  // Save recipe and publish event
  const savedRecipe = saveRecipe(recipe);
  eventBus.publish('recipeAdded', savedRecipe);
  
  // Reset form
  event.target.reset();
  
  // Show success message
  showSuccessMessage(container);
}

// Show success message after adding recipe
function showSuccessMessage(container) {
  const formContainer = container.querySelector('.recipe-form-container');
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.textContent = 'Recipe added successfully!';
  
  formContainer.appendChild(successMsg);
  
  // Remove the message after 3 seconds
  setTimeout(() => {
    successMsg.remove();
  }, 3000);
}