const STORAGE_KEY = 'recipes';

export function loadRecipes() {
  const storedRecipes = localStorage.getItem(STORAGE_KEY);
  return storedRecipes ? JSON.parse(storedRecipes) : [];
}

export function saveRecipe(recipe) {
  const recipes = loadRecipes();
  const newRecipe = {
    ...recipe,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  recipes.push(newRecipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  return newRecipe;
}

// Delete a recipe
export function deleteRecipe(recipeId) {
  let recipes = loadRecipes();
  recipes = recipes.filter(recipe => recipe.id !== recipeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  return recipes;
}

// Update recipes (for filtering/searching)
export function updateRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}