# Recipe Organizer

A simple, responsive web application for managing your recipes built with vanilla JavaScript and CSS. Store, organize, and search through your favorite recipes with ease.

## Features

- **Add Recipes**
  - Title
  - Ingredients (one per line)
  - Preparation steps
  - Category selection (Snacks, Dessert, Main Course)

- **View Recipes**
  - Responsive recipe card layout
  - Click to expand recipe details
  - Delete unwanted recipes

- **Search & Filter**
  - Search by recipe title or ingredients
  - Filter by category
  - Real-time search results

- **Persistent Storage**
  - Recipes stored in browser's localStorage
  - Data persists across page refreshes

## Live Demo

Visit the live application: [Recipe Organizer](https://meek-nougat-fe3905.netlify.app)

## Project Structure

```
recipe-organizer/
├── components/
│   ├── recipeForm.js     # Recipe creation form component
│   ├── recipeList.js     # Recipe display and management
│   └── searchBar.js      # Search and filter functionality
├── services/
│   ├── eventBus.js       # Event management system
│   └── storageService.js # Local storage operations
├── index.html
├── main.js
└── style.css
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Start adding your recipes!

## Usage

### Adding a Recipe
1. Fill in the recipe title
2. Select a category
3. Add ingredients (one per line)
4. Write preparation steps
5. Click "Add Recipe"

### Finding Recipes
- Use the search bar to find recipes by title or ingredients
- Use the category dropdown to filter by type
- Click on a recipe card to view full details

## Technical Details

- Built with vanilla JavaScript
- Uses ES6 modules
- Responsive design with CSS Grid and Flexbox
- Event-driven architecture using a custom event bus
- Local storage for data persistence

## Browser Support

Works in all modern browsers that support:
- ES6 Modules
- localStorage
- CSS Grid/Flexbox

## License

MIT License - feel free to use and modify for your own projects!
